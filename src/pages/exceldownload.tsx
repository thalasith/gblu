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
  };

  return (
    <>
      <Head>
        <title>The Gowdie - Download to Excel</title>
        <meta name="description" content="gary gowdie, gary, gowdie" />
        <link rel="icon" href="/gowdie.png" />
      </Head>
      <Header />
      <DownloadSection
        setActive={setActive}
        active={active}
        loading={loading}
        downloadData={downloadData}
        searchTerm={searchTerm}
        searchResults={searchResults}
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
