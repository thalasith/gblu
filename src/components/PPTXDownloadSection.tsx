import pptxgen from "pptxgenjs";

export default function PPTXDownloadSection() {
  const downloadData = async () => {
    let pptx = new pptxgen();

    let slide = pptx.addSlide();
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
      y: "10%",
      w: 1,
      h: 0.66,
      path: "https://countryflagsapi.com/png/CAN",
    });

    slide.slideNumber = { x: "95%", y: "95%", fontSize: 8, fontFace: "Arial" };

    pptx.writeFile({ fileName: "gblu.pptx" });
  };

  return (
    <div className="mx-auto max-w-7xl  sm:px-6 lg:px-8">
      <button onClick={downloadData}>Click Me!</button>
    </div>
  );
}
