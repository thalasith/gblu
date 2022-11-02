import { useState, ChangeEvent } from "react";
import * as FileSaver from "file-saver";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { trpc } from "../utils/trpc";

export default function DownloadSection() {
  const { data: countries } = trpc.useQuery(["countries.getCountryList"]);

  const [active, setActive] = useState(false);
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
    setSelectedCountries([...selectedCountries, country]);
  };

  const selectAllCountries = () => {
    setSearchTerm("");
    setSearchResults(countries);
    setActive(false);
    setSelectedCountries(countries!);
  };
  console.log(selectedCountries);
  const downloadData = async () => {
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
  };

  return (
    <div className="mx-auto max-w-7xl  sm:px-6 lg:px-8">
      <div className="mx-4 flex border-b-2  pb-2 pt-4 text-2xl lg:text-4xl">
        GBLU Download to Excel
      </div>
      <a className="px-4 pt-4 text-2xl" onFocus={() => setActive(true)}>
        <label className="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
          Search
        </label>
        <div className="relative">
          <input
            type="search"
            id="default-search"
            value={searchTerm}
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 pl-10  text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            placeholder="Search a country"
            onChange={(e) => handleCountryChange(e)}
          />
          <ul
            className={`absolute w-full bg-white ${
              active ? "block" : "hidden"
            }`}
          >
            {searchResults &&
              searchResults!.map((item) => (
                <li
                  key={item}
                  className="my-1 w-full rounded border border-gray-400 bg-white px-4 py-1 text-gray-700"
                >
                  <button onClick={() => selectCountry(item)}>{item}</button>
                </li>
              ))}
          </ul>
        </div>
      </a>
      <button onClick={selectAllCountries}>Select All Countries</button>
      <div className="flex flex-row justify-center pt-4 text-2xl">
        {selectedCountries.length != 0 && (
          <button
            className="rounded bg-gray-600 px-2 text-white hover:bg-gray-900"
            onClick={downloadData}
          >
            Confirm download
          </button>
        )}
      </div>
      <div
        className={`grid ${
          selectedCountries.length != 0 ? "grid-cols-3" : ""
        } justify-center pt-4 text-2xl`}
      >
        {selectedCountries.length === 0 ? (
          <p>You need to select at least one country first!</p>
        ) : (
          selectedCountries.map((country) => (
            <div
              key={country}
              className="mx-1 my-2 flex flex-row justify-between rounded border-2 border-dashed border-gray-900 bg-gray-200 px-2 align-top"
            >
              {country === "Ireland" ? (
                <img
                  alt="alan"
                  src="/alan.png"
                  width="40"
                  height="40"
                  className="my-2"
                />
              ) : (
                ""
              )}
              {country === "United Kingdom" ? (
                <img
                  alt="gary"
                  src="/gowdie.png"
                  width="40"
                  height="40"
                  className="my-2"
                />
              ) : (
                ""
              )}
              <span className="pt-1">{country}</span>

              <button onClick={() => handleCountryDelete(country)}>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
