import type { NextPage } from "next";
import Head from "next/head";
import Header from "../components/Header";
import DownloadSection from "../components/DownloadSection";
import { useState, ChangeEvent } from "react";
import * as FileSaver from "file-saver";
import { trpc } from "../utils/trpc";

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
    if (!selectedCountries.includes(country)) {
      setSelectedCountries([...selectedCountries, country]);
    }
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
    try {
      setLoading(true);
      const data = await fetch("/api/exceldownload", {
        method: "POST",
        body: JSON.stringify(selectedCountries),
        headers: {
          "Content-Type": "application/json",
          "Response-type": "blob",
        },
      }).then((res) => {
        return res.blob();
      });
      FileSaver.saveAs(data, "data.xlsx");
      setLoading(false);
      setShowingAlert(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Head>
        <title>The Gowdie - Download to Excel</title>
        <meta name="description" content="gary gowdie, gary, gowdie" />
        <link rel="icon" href="/gowdie.png" />
      </Head>
      <Header />
      <div className="relative">
        <div
          className={`absolute z-50 grid w-full justify-items-center pt-6 transition-all delay-500 duration-1000 ease-linear ${
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
          downloadType="Excel"
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
      </div>
    </>
  );
};

export default Download;
