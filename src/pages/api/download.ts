// src/pages/api/examples.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../server/db/client";
const ExcelJS = require("exceljs");

const download = async (req: NextApiRequest, res: NextApiResponse) => {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = "test";
  workbook.lastModifiedBy = "test";
  workbook.created = new Date();
  workbook.modified = new Date();
  const worksheet = workbook.addWorksheet("My Sheet");
  worksheet.columns = [
    { header: "Id", key: "id" },
    { header: "Name", key: "name" },
    { header: "Age", key: "age" },
  ];
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
