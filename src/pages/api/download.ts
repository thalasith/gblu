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
  workbook.modified = new Date();

  countryList.forEach(async (country: string) => {
    const worksheet = workbook.addWorksheet(country);
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
    worksheet.getCell("B7").font = tableHeaderStyle;
    worksheet.getCell("C7").font = tableHeaderStyle;
    worksheet.getCell("D7").font = tableHeaderStyle;
    worksheet.getCell("E7").font = tableHeaderStyle;
    worksheet.getCell("F7").font = tableHeaderStyle;
    worksheet.getCell("B7").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "00A8C8" },
      bgColor: { argb: "00A8C8" },
    };
    worksheet.getCell("C7").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "00A8C8" },
      bgColor: { argb: "00A8C8" },
    };
    worksheet.getCell("D7").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "00A8C8" },
      bgColor: { argb: "00A8C8" },
    };
    worksheet.getCell("E7").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "00A8C8" },
      bgColor: { argb: "00A8C8" },
    };
    worksheet.getCell("F7").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "00A8C8" },
      bgColor: { argb: "00A8C8" },
    };

    // const data = await prisma.gblu.findMany({
    //   where: {
    //     country: country,
    //   },
    // });
    // const rowData = data.map((data) => {
    //   return [
    //     data.hr_area,
    //     data.law_in_force,
    //     data.new_law,
    //     data.legislative_update_summary,
    //     data.employer_action_required,
    //   ];
    // });
    // console.log(rowData);
    worksheet.addTable({
      name: country + "_table",
      ref: "B7",
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
      rows: [["Social Security", "None", "None", "None", "None"]],
    });
    let rowIndex = 1;
    for (rowIndex; rowIndex <= worksheet.rowCount; rowIndex++) {
      worksheet.getRow(rowIndex).alignment = {
        vertical: "middle",
        horizontal: "center",
        wrapText: true,
      };
    }
  });

  // worksheet.addTable({
  //   name: "MyTable",
  //   ref: "B7",
  //   headerRow: true,
  //   totalsRow: false,
  //   columns: [
  //     { name: "Benefit", totalsRowLabel: "Totals:", filterButton: true },
  //     { name: "Effective Date", totalsRowLabel: "Totals:", filterButton: true },
  //     { name: "New Law", totalsRowLabel: "Totals:", filterButton: true },
  //     {
  //       name: "Description of Law",
  //       totalsRowLabel: "Totals:",
  //       filterButton: true,
  //     },
  //     { name: "New Steps", totalsRowFunction: "sum", filterButton: true },
  //   ],
  //   rows: [
  //     ["Social Security", "None", "None", "None", "None"],
  //     [
  //       "Retirement",
  //       "Currently Effective",
  //       "Super home buyer Scheme plan scrapped",
  //       "The newly elected Labor government confirmed that it would not proceed with the previous coalition government’s proposed introduction of the Super Home Buyer Scheme that would have allowed eligible first homebuyers to access up to 40% of their superannuation to purchase the property.  ",
  //       "JPMC to dispense with any planning that was underway to comply with proposed Scheme.",
  //     ],
  //   ],
  // });

  // let rowIndex = 1;
  // for (rowIndex; rowIndex <= worksheet.rowCount; rowIndex++) {
  //   worksheet.getRow(rowIndex).alignment = {
  //     vertical: "middle",
  //     horizontal: "center",
  //     wrapText: true,
  //   };
  // }

  var fileName = "FileName.xlsx";
  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );
  res.setHeader("Content-Disposition", "attachment; filename=" + fileName);
  await workbook.xlsx.write(res);
  res.end();
};

export default download;
