import pptxgen from "pptxgenjs";

const tableHeader = {
  align: "left",
  fontFace: "Arial",
  fill: { color: "002C76" },
  color: "FFFFFF",
};

const DATA = [
  [
    "Career — Health",
    "Effective dates vary.",
    "Employers to disclose electronic monitoring, implement workplace protections",
    "Bill 88, the Working for Workers Act 2022, which received Royal Assent on 11 April 2022, amends the Employment Standards Act 2000 and the Occupational Health and Safety Act (OSHA). The measure also introduces the Digital Platform Workers’ Rights Act, 2022, among other changes",
    "Employers should review the changes, as they will affect their HR policies and practices.",
  ],
  [
    "Career",
    "2 June 2022",
    "Guidance on disconnection from work",
    "Employers in Ontario with 25 or more employees must provide a written policy on disconnection from the workplace under Bill 27, Working for Workers Act, 2021. Employers have until 2 June 2022 to implement their disconnection policy. Recent guidance on the new policy from the Ministry of Labour, Training and Skills Development addresses how to calculate workforce thresholds and outlines the scope and contents of the disconnection policy. Employers that meet the employee thresholds on 1 January of any calendar year must issue their policy before 1 March of that calendar year.",
    "Employers should review the changes, as they will affect their HR policies and practices.",
  ],
  [
    "Career — Health",
    "Currently effective ",
    "Employers required to provide paid sick leave",
    "From 1 Jan 2022, provincially regulated employers in British Columbia must provide five days of paid sick leave per year to all eligible employees under Bill 13, which amends the Employment Standards Amendment (ESA) Act (No. 2), 2021. The new leave is in addition to the current entitlement of three days of unpaid sick leave. Full- and part-time employees covered by the ESA who have worked for their employer at least 90 days are eligible. However, the ESA does not cover federally regulated sectors, self-employed workers, and explicitly excluded professions and occupations. Employers must pay an average day’s pay for each day of sick leave, using a pay calculation formula. Employees intending to take paid leave do not have to provide advance notification, but employers can request proof of illness or injury. British Columbia is the third province in Canada to enact paid sick leave and the first to provide this amount of leave. The government estimates that more than one million workers in the province currently do not have access to paid sick leave.",
    "Employers should review the changes as they may affect their HR policies and practices.",
  ],
  [
    "Career",
    "2 Sept 2022",
    "Remote from Work ",
    "Dummy data",
    "Employers should review the changes, as they will affect their HR policies and practices.",
  ],
  [
    "Career",
    "2 Sept 2022",
    "Remote from Work ",
    "Dummy data",
    "Employers should review the changes, as they will affect their HR policies and practices.",
  ],
  [
    "Career",
    "2 Sept 2022",
    "Remote from Work ",
    "Dummy data",
    "Employers should review the changes, as they will affect their HR policies and practices.",
  ],
  [
    "Career",
    "2 Sept 2022",
    "Remote from Work ",
    "Dummy data",
    "Employers should review the changes, as they will affect their HR policies and practices.",
  ],
  [
    "Career",
    "2 Sept 2022",
    "Remote from Work ",
    "Dummy data",
    "Employers should review the changes, as they will affect their HR policies and practices.",
  ],
  [
    "Career",
    "2 Sept 2022",
    "Remote from Work ",
    "Dummy data",
    "Employers should review the changes, as they will affect their HR policies and practices.",
  ],
  [
    "Career",
    "2 Sept 2022",
    "Remote from Work ",
    "Dummy data",
    "Employers should review the changes, as they will affect their HR policies and practices.",
  ],
  [
    "Career",
    "2 Sept 2022",
    "Remote from Work ",
    "Dummy data",
    "Employers should review the changes, as they will affect their HR policies and practices.",
  ],
  [
    "Career",
    "2 Sept 2022",
    "Remote from Work ",
    "Dummy data",
    "Employers should review the changes, as they will affect their HR policies and practices.",
  ],
  [
    "Career",
    "2 Sept 2022",
    "Remote from Work ",
    "Dummy data",
    "Employers should review the changes, as they will affect their HR policies and practices.",
  ],
  [
    "Career",
    "2 Sept 2022",
    "Remote from Work ",
    "Dummy data",
    "Employers should review the changes, as they will affect their HR policies and practices.",
  ],
  [
    "Career",
    "2 Sept 2022",
    "Remote from Work ",
    "Dummy data",
    "Employers should review the changes, as they will affect their HR policies and practices.",
  ],
  [
    "Career",
    "2 Sept 2022",
    "Remote from Work ",
    "Dummy data",
    "Employers should review the changes, as they will affect their HR policies and practices.",
  ],
  [
    "Career",
    "2 Sept 2022",
    "Remote from Work ",
    "Dummy data",
    "Employers should review the changes, as they will affect their HR policies and practices.",
  ],
  [
    "Career",
    "2 Sept 2022",
    "Remote from Work ",
    "Dummy data",
    "Employers should review the changes, as they will affect their HR policies and practices.",
  ],
  [
    "Career",
    "2 Sept 2022",
    "Remote from Work ",
    "Dummy data",
    "Employers should review the changes, as they will affect their HR policies and practices.",
  ],
  [
    "Career",
    "2 Sept 2022",
    "Remote from Work ",
    "Dummy data",
    "Employers should review the changes, as they will affect their HR policies and practices.",
  ],
  [
    "Career",
    "2 Sept 2022",
    "Remote from Work ",
    "Dummy data",
    "Employers should review the changes, as they will affect their HR policies and practices.",
  ],
  [
    "Career",
    "2 Sept 2022",
    "Remote from Work ",
    "Dummy data",
    "Employers should review the changes, as they will affect their HR policies and practices.",
  ],
  [
    "Career",
    "2 Sept 2022",
    "Remote from Work ",
    "Dummy data",
    "Employers should review the changes, as they will affect their HR policies and practices.",
  ],
  [
    "Career",
    "2 Sept 2022",
    "Remote from Work ",
    "Dummy data",
    "Employers should review the changes, as they will affect their HR policies and practices.",
  ],
  [
    "Career",
    "2 Sept 2022",
    "Remote from Work ",
    "Dummy data",
    "Employers should review the changes, as they will affect their HR policies and practices.",
  ],
  [
    "Career",
    "2 Sept 2022",
    "Remote from Work ",
    "Dummy data",
    "Employers should review the changes, as they will affect their HR policies and practices.",
  ],
  [
    "Career",
    "2 Sept 2022",
    "Remote from Work ",
    "Dummy data",
    "Employers should review the changes, as they will affect their HR policies and practices.",
  ],
];

// Loop through each row of DATA, return an array of arrays of the length of the string
// Divide each string by a specified length depending on the column. This will results in the # of rows for each cell.
// Get the maximum value of the array of arrays. This will be the number of rows for the entire table.
// Divide the number of rows by 27 to get the number of slides needed.
const maximumsCharsInRow = [13, 16, 16, 80, 12];

// Method to get the maximum number of rows for each cell.
const getRowMaximums = (data: string[][]) => {
  const numberOfLines = data.map((row) => {
    let max = 1;
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
const sortRowsIntoSlides = (data: string[][]) => {
  const rowMaximums = getRowMaximums(data);
  const slideStarts: any[] = [];
  let sumOfRows = 0;
  let slideNumber = 1;
  rowMaximums.forEach((row, index) => {
    sumOfRows += row;
    if (sumOfRows > 25) {
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
        slide.data.push(data[index]);
      }
    });
  });

  return slideData;
};

const slideData = sortRowsIntoSlides(DATA);

export default function PPTXDownloadSection() {
  const downloadData = async () => {
    const pptx = new pptxgen();
    slideData.forEach((slideData) => {
      const slide = pptx.addSlide();
      slide.addText("GBLU Updates", {
        x: 0.25,
        y: 0.25,
        w: 5,
        h: "10%",
        fontSize: 28,
        bold: true,
        color: "002C76",
        fontFace: "Times New Roman",
        align: "left",
      });
      slide.addImage({
        x: "80%",
        y: "7.5%",
        w: 1,
        h: 0.66,
        path: "https://countryflagsapi.com/png/CAN",
      });

      const rows: any[] = [];
      rows.push([
        {
          text: "Benefit",
          options: tableHeader,
        },
        { text: "Effective Date", options: tableHeader },
        { text: "New Law", options: tableHeader },
        {
          text: "Description of the Law",
          options: tableHeader,
        },
        {
          text: "Action Required",
          options: tableHeader,
        },
      ]);
      slideData.data.forEach((row: any[]) => {
        rows.push(row);
      });
      slide.addTable(rows, {
        x: 0.25,
        y: "20%",
        align: "left",
        fontFace: "Arial",
        fontSize: 8,
        colW: [1, 1, 1.25, 4.5, 1],
      });
    });

    pptx.writeFile({ fileName: "gblu.pptx" });
  };

  return (
    <div className="mx-auto max-w-7xl  sm:px-6 lg:px-8">
      <button onClick={downloadData}>Click Me!</button>
    </div>
  );
}
