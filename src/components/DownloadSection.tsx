import { ChangeEvent } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

type Props = {
  downloadType: string;
  setActive: (active: boolean) => void;
  active: boolean;
  loading: boolean;
  downloadData: () => void;
  searchTerm: string;
  searchResults: string[];
  handleCountryChange: (e: ChangeEvent<HTMLElement>) => void;
  selectCountry: (country: string) => void;
  selectAllCountries: () => void;
  unselectAllCountries: () => void;
  selectedCountries: string[];
  handleCountryDelete: (country: string) => void;
};

export default function DownloadSection({
  downloadType,
  setActive,
  active,
  loading,
  downloadData,
  searchTerm,
  searchResults,
  handleCountryChange,
  selectCountry,
  selectAllCountries,
  unselectAllCountries,
  selectedCountries,
  handleCountryDelete,
}: Props) {
  return (
    <div className="mx-auto max-w-7xl  sm:px-6 lg:px-8">
      <div className="mx-4 flex border-b-2  pb-2 pt-4 text-2xl lg:text-4xl">
        GBLU Download to {downloadType}
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
              searchResults!.map((country: string) => (
                <li
                  key={country}
                  className="my-1 w-full rounded border border-gray-400 bg-white px-4 py-1 text-gray-700"
                >
                  <button onClick={() => selectCountry(country)}>
                    {country}
                  </button>
                </li>
              ))}
          </ul>
        </div>
      </a>
      <div className="flex flex-row-reverse">
        <button
          className="m-2 rounded-md bg-gray-600 px-2 text-white hover:bg-slate-800"
          onClick={unselectAllCountries}
        >
          Unselect All Countries
        </button>
        <button
          className="m-2 rounded-md bg-gray-600 px-2 py-1 text-white hover:bg-slate-800"
          onClick={selectAllCountries}
        >
          Select All Countries
        </button>
      </div>

      <div className="flex flex-row justify-center pt-4 text-2xl">
        {selectedCountries.length != 0 && (
          <div className="flex flex-col items-center">
            <button
              className="rounded bg-gray-600 px-2 text-white hover:bg-gray-900"
              onClick={downloadData}
            >
              Confirm download
            </button>
            <div
              className={`flex flex-row items-center pt-2 ${
                loading ? "inblock" : "hidden"
              }`}
            >
              <img src="/loading.svg" alt="next" className="h-12 w-12 pr-2" />
              Working on your request...
            </div>
          </div>
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
          selectedCountries.map((country: string) => (
            <div
              key={country}
              className="mx-1 my-2 flex flex-row justify-between rounded border-2 border-gray-300 bg-gray-200 p-2 shadow-md"
            >
              <span className="">
                {country.length > 21 ? country.slice(0, 21) + "..." : country}
              </span>

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
