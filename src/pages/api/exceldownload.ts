// src/pages/api/examples.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../server/db/client";
import * as ExcelJS from "exceljs";

const download = async (req: NextApiRequest, res: NextApiResponse) => {
  const countryList = req.body;
  const workbook = new ExcelJS.Workbook();
  workbook.creator = "test";
  workbook.lastModifiedBy = "test";
  workbook.created = new Date();

  for (const country of countryList) {
    const alpha_country = country.replace(/[\W_]+/g, "_");

    const worksheet = workbook.addWorksheet(alpha_country, {
      views: [{ showGridLines: false }],
    });

    worksheet.columns = [
      { header: "", key: "id", width: 4 },
      { header: "", key: "benefit", width: 21 },
      {
        header: "",
        key: "effective_date",
        width: 21,
        alignment: { wrapText: true },
      },
      { header: "", key: "new_law", width: 21, alignment: { wrapText: true } },
      {
        header: "",
        key: "description_of_law",
        width: 86,
        alignment: { wrapText: true },
      },
      {
        header: "",
        key: "next_steps",
        width: 40,
        alignment: { wrapText: true },
      },
    ];
    worksheet.getCell("B2").value = "Country";
    worksheet.getCell("B2").font = {
      name: "Arial",
      family: 4,
      size: 16,
      bold: true,
    };
    worksheet.getCell("C2").value = country;
    worksheet.getCell("C2").font = {
      name: "Arial",
      family: 4,
      size: 16,
      bold: true,
      color: { argb: "00A8C8" },
    };
    const tableHeaderStyle = {
      name: "Arial",
      family: 4,
      size: 11,
      bold: true,
      color: { argb: "FFFFFF" },
    };
    worksheet.getCell("B9").font = tableHeaderStyle;
    worksheet.getCell("C9").font = tableHeaderStyle;
    worksheet.getCell("D9").font = tableHeaderStyle;
    worksheet.getCell("E9").font = tableHeaderStyle;
    worksheet.getCell("F9").font = tableHeaderStyle;
    worksheet.getCell("B9").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "00A8C8" },
      bgColor: { argb: "00A8C8" },
    };
    worksheet.getCell("C9").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "00A8C8" },
      bgColor: { argb: "00A8C8" },
    };
    worksheet.getCell("D9").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "00A8C8" },
      bgColor: { argb: "00A8C8" },
    };
    worksheet.getCell("E9").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "00A8C8" },
      bgColor: { argb: "00A8C8" },
    };
    worksheet.getCell("F9").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "00A8C8" },
      bgColor: { argb: "00A8C8" },
    };
    const data = await prisma.gblu.findMany({
      where: {
        country: country,
      },
    });

    const countryInfo = await prisma.countries.findFirst({
      where: { country: country },
    });

    const imageUrl = `https://countryflagsapi.com/png/${countryInfo?.country_code}`;
    const response = await fetch(imageUrl);
    const buffer = await response.arrayBuffer();
    const imageId = workbook.addImage({
      buffer,
      extension: "png",
    });
    worksheet.addImage(imageId, "F2:F7");

    const rowData =
      data.length != 0
        ? data.map((data) => {
            return [
              data.hr_area,
              data.law_in_force,
              data.legislative_update_summary,
              data.new_law,
              data.impact_on_employers,
            ];
          })
        : [
            ["Career", "None", "None", "None", "None"],
            ["Retirement", "None", "None", "None", "None"],
            ["Medical", "None", "None", "None", "None"],
            ["Risk Benefits", "None", "None", "None", "None"],
            ["Leaves", "None", "None", "None", "None"],
            ["Perks and Allowances", "None", "None", "None", "None"],
          ];

    worksheet.addTable({
      name: alpha_country + "_table",
      ref: "B9",
      headerRow: true,
      totalsRow: false,
      columns: [
        { name: "Benefit", totalsRowLabel: "Totals:", filterButton: true },
        {
          name: "Effective Date",
          totalsRowLabel: "Totals:",
          filterButton: true,
        },
        { name: "New Law", totalsRowLabel: "Totals:", filterButton: true },
        {
          name: "Description of Law",
          totalsRowLabel: "Totals:",
          filterButton: true,
        },
        { name: "New Steps", totalsRowFunction: "sum", filterButton: true },
      ],
      rows: rowData,
    });
    let rowIndex = 1;
    for (rowIndex; rowIndex <= worksheet.rowCount; rowIndex++) {
      worksheet.getRow(rowIndex).alignment = {
        vertical: "middle",
        horizontal: "center",
        wrapText: true,
      };
    }
  }

  const fileName = "FileName.xlsx";
  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );
  res.setHeader("Content-Disposition", "attachment; filename=" + fileName);
  await workbook.xlsx.write(res);
  res.end();
};

export default download;
