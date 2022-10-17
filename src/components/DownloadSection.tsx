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

  console.log(selectedCountries);

  const handleCountryDelete = (country: string) => {
    setSelectedCountries(selectedCountries.filter((c) => c !== country));
  };

  const selectCountry = (country: string) => {
    setSearchTerm("");
    setSearchResults(countries);
    setActive(false);
    setSelectedCountries([...selectedCountries, country]);
  };

  const downloadData = async () => {
    const data = await fetch("/api/download", {
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
      <div className="flex justify-center pt-4 text-4xl">Download to Excel</div>
      <div className=" pt-4 text-2xl">
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
            onFocus={() => setActive(true)}
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
      </div>
      <div className="flex flex-row justify-center pt-4 text-2xl">
        {selectedCountries.map((country) => (
          <div
            key={country}
            className="mx-1 rounded border-2 border-dashed border-gray-900 bg-gray-200 px-2"
          >
            {country}
            <button
              className="pl-2"
              onClick={() => handleCountryDelete(country)}
            >
              <XMarkIcon className="h-6 w-6 pt-2" aria-hidden="true" />
            </button>
          </div>
        ))}
      </div>
      <div className="flex flex-row justify-center pt-4 text-2xl">
        <button
          className="rounded bg-gray-600 px-2 text-white hover:bg-gray-900"
          onClick={downloadData}
        >
          Confirm download
        </button>
      </div>
    </div>
  );
}
