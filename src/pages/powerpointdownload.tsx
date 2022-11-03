import type { NextPage } from "next";
import Head from "next/head";
import Header from "../components/Header";
import DownloadSection from "../components/DownloadSection";
import { useState, ChangeEvent } from "react";
import { trpc } from "../utils/trpc";
import pptxgen from "pptxgenjs";

const tableHeader = {
  align: "left",
  fontFace: "Arial",
  fill: { color: "002C76" },
  color: "FFFFFF",
};

type slide = {
  slide: number;
  data: string[][];
};

type countrySlidesType = {
  country: string;
  data: slide[];
  countryCode: string;
};

type rowData = {
  text: string;
  options: {
    align: string;
    fontFace: string;
    fill: { color: string };
    color: string;
  };
}[];

const Download: NextPage = () => {
  const { data: countries } = trpc.useQuery(["countries.getCountryList"]);

  const [active, setActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState(countries);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [showingAlert, setShowingAlert] = useState(false);

  const handleCountryChange = (e: ChangeEvent<HTMLElement>) => {
    const { value } = e.target as HTMLInputElement;
    setSearchTerm(value);
    setSearchResults(
      countries!.filter((country) => {
        return country.toLowerCase().includes(value.toLowerCase());
      })
    );
  };

  const handleCountryDelete = (country: string) => {
    setSelectedCountries(selectedCountries.filter((c) => c !== country));
  };

  const selectCountry = (country: string) => {
    setSearchTerm("");
    setSearchResults(countries);
    setActive(false);
    setSelectedCountries([...selectedCountries, country]);
  };

  const selectAllCountries = () => {
    setSearchTerm("");
    setSearchResults(countries);
    setActive(false);
    setSelectedCountries(countries!);
  };

  const unselectAllCountries = () => {
    setSearchTerm("");
    setSearchResults(countries);
    setActive(false);
    setSelectedCountries([]);
  };

  const downloadData = async () => {
    setLoading(true);
    try {
      const data = await fetch("/api/powerpointdownload", {
        method: "POST",
        body: JSON.stringify(selectedCountries),
        headers: {
          "Content-Type": "application/json",
          "Response-type": "blob",
        },
      }).then((res) => {
        return res.json();
      });

      const pptx = new pptxgen();

      data.forEach((countryData: countrySlidesType) => {
        const title = [
          {
            text: "GBLU Updates",
            options: { fontSize: 28, color: "002C76", breakLine: true },
          },
          {
            text: countryData.country,
            options: { fontSize: 24, color: "808080", breakLine: true },
          },
        ];
        countryData.data.forEach((slideData: slide) => {
          const slide = pptx.addSlide();
          slide.addText(title, {
            x: 0.25,
            y: 0.4,
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
            path: `https://countryflagsapi.com/png/${countryData.countryCode}`,
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
            colW: [1, 1, 1.25, 4.5, 1.5],
          });
        });
      });

      pptx.writeFile({ fileName: "gblu.pptx" });
      setLoading(false);
      setShowingAlert(true);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>The Gowdie - Download to Powerpoint</title>
        <meta name="description" content="gary gowdie, gary, gowdie" />
        <link rel="icon" href="/gowdie.png" />
      </Head>
      <Header />
      <div
        className={`grid justify-items-center pt-6 transition-all delay-500 duration-1000 ease-linear ${
          showingAlert ? "opacity-100" : "opacity-0"
        }`}
        onTransitionEnd={() => setShowingAlert(false)}
      >
        <div
          className="relative w-1/2 rounded border border-green-400 bg-green-100 px-4 py-3 text-green-700"
          role="alert"
        >
          <strong className="font-bold">Your download is complete! </strong>
          <span className="block sm:inline">
            You should check your downloads folder.
          </span>
        </div>
      </div>

      <DownloadSection
        downloadType="Powerpoint"
        setActive={setActive}
        active={active}
        loading={loading}
        downloadData={downloadData}
        searchTerm={searchTerm}
        searchResults={searchResults ?? []}
        handleCountryChange={handleCountryChange}
        selectCountry={selectCountry}
        selectAllCountries={selectAllCountries}
        unselectAllCountries={unselectAllCountries}
        selectedCountries={selectedCountries}
        handleCountryDelete={handleCountryDelete}
      />
    </>
  );
};

export default Download;
