// src/pages/api/examples.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../server/db/client";

const maximumsCharsInRow = [13, 16, 16, 80, 12];

// Method to get the maximum number of rows for each cell.
const getRowMaximums = (data: string[][]) => {
  const numberOfLines = data.map((row) => {
    return row.map((cell, index) => {
      const cellLength = cell.length;
      const maxChars = maximumsCharsInRow[index] || 1;
      const linesOfChar = Math.ceil(cellLength / maxChars);

      return linesOfChar;
    });
  });
  const rowMaximums = numberOfLines.map((row) => {
    return row.reduce((a, b) => Math.max(a, b));
  });
  return rowMaximums;
};

const onlyUnique = (value: string, index: number, self: any) => {
  return self.indexOf(value) === index;
};

// Return array of which row to start on for each slide
const sortRowsIntoSlides = (data: any[]) => {
  const countrySlides: any[] = [];
  data.forEach((country) => {
    const rowMaximums = getRowMaximums(country.data);

    const slideStarts: any[] = [];
    let sumOfRows = 0;
    let slideNumber = 1;
    rowMaximums.forEach((row, index) => {
      sumOfRows += row;
      if (sumOfRows > 20) {
        slideNumber++;
        slideStarts.push(slideNumber);
        sumOfRows = 0;
      } else {
        slideStarts.push(slideNumber);
      }
    });
    const unique = slideStarts.filter(onlyUnique);
    const slideData: any[] = [];
    unique.forEach((slide) => {
      slideData.push({ slide: slide, data: [] });
    });

    slideStarts.forEach((row, index) => {
      slideData.forEach((slide) => {
        if (slide.slide === row) {
          slide.data.push(country.data[index]);
        }
      });
    });
    countrySlides.push({
      country: country.country,
      data: slideData,
      countryCode: country.countryCode,
    });
  });

  return countrySlides;
};

const powerpointDownload = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const query = [];
  const countryResults: any[] = [];
  for (const country of req.body) {
    const countryCode = await prisma.countries.findFirst({
      where: { country: country },
    });
    query.push({ country: country });
    countryResults.push({
      country: country,
      data: [],
      countryCode: countryCode?.country_code,
    });
  }
  const results = await prisma.gblu.findMany({
    where: {
      OR: query,
    },
    select: {
      country: true,
      hr_area: true,
      law_in_force: true,
      legislative_update_summary: true,
      new_law: true,
      impact_on_employers: true,
    },
  });
  results.map((result) => {
    countryResults.forEach((country) => {
      if (country.country === result.country) {
        country.data.push([
          result.hr_area,
          result.law_in_force,
          result.legislative_update_summary.replaceAll("\t", " "),
          result.new_law,
          result.impact_on_employers,
        ]);
      }
    });
  });

  const slides = sortRowsIntoSlides(countryResults);

  res.send(slides);
};

export default powerpointDownload;
