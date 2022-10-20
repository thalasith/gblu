// src/pages/api/examples.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../server/db/client";
import pptxgen from "pptxgenjs";

const powerpointdownload = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  // 1. Create a new Presentation
  let pres = new pptxgen();

  // 2. Add a Slide
  let slide = pres.addSlide();

  // 3. Add one or more objects (Tables, Shapes, Images, Text and Media) to the Slide
  let textboxText = "Hello World from PptxGenJS!";
  let textboxOpts = { x: 1, y: 1, color: "363636" };
  slide.addText(textboxText, textboxOpts);

  // 4. Save the Presentation
  const fileName = "FileName.pptx";
  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation"
  );
  res.setHeader("Content-Disposition", "attachment; filename=" + fileName);
  await pres.writeFile();
  res.end();
};

export default powerpointdownload;
