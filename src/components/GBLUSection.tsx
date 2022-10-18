import { useState, ChangeEvent, MouseEvent } from "react";
import { trpc } from "../utils/trpc";
import GBLUCard from "./GBLUCard";

export default function GBLUSection() {
  const { data: countries } = trpc.useQuery(["countries.getCountryList"]);
  const [active, setActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState(countries);
  const [selectedCountry, setSelectedCountry] = useState("Afghanistan");

  const flag = trpc.useQuery([
    "countries.getCountryCode",
    {
      country: selectedCountry,
    },
  ]);

  const gblu = trpc.useQuery([
    "gblu.getGBLUByCountry",
    {
      country: selectedCountry,
    },
  ]);

  const handleCountryChange = (e: ChangeEvent<HTMLElement>) => {
    const { value } = e.target as HTMLInputElement;
    setSearchTerm(value);
    setSearchResults(
      countries!.filter((country) => {
        return country.toLowerCase().includes(value.toLowerCase());
      })
    );
  };

  const selectCountry = (country: string) => {
    setSelectedCountry(country);
    setSearchResults(countries);
    setSearchTerm("");
    setActive(false);

    gblu.refetch();
  };

  return (
    <div className="mx-auto max-w-7xl  sm:px-6 lg:px-8">
      <div className="mx-4 flex border-b-2  pb-2 pt-4 text-2xl lg:text-4xl">
        GBLU by Country
      </div>
      <div className="px-4 pt-4 text-2xl">
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
      <main className="flex-1">
        <div className="py-6">
          <div className="mx-auto flex max-w-6xl justify-between px-4 pb-4 sm:px-6 md:px-8">
            <h1 className="text-4xl font-semibold text-gray-900 lg:text-8xl">
              {selectedCountry}
            </h1>
            <img
              src={`https://countryflagsapi.com/png/${flag.data}`}
              className="w-24 lg:w-48"
            />
          </div>
          {/* <button onClick={() => downloadData()}> Hi there</button> */}
          <div className="mx-auto max-w-6xl px-4 text-gray-700 sm:px-6 md:px-8">
            {/* Replace with your content */}
            {gblu.data?.length === 0 ? (
              <div className="flex w-full flex-row px-2 py-4 text-4xl">
                No legislative updates for this country.
              </div>
            ) : (
              gblu.data?.map((item) => (
                <GBLUCard
                  key={item.index.toString()}
                  gbluItem={{
                    hr_area: item.hr_area,
                    legislative_update_summary: item.legislative_update_summary,
                    law_in_force: item.law_in_force,
                    employer_action_required: item.employer_action_required,
                    new_law: item.new_law,
                    more_info_1_url: item.more_info_1_url,
                  }}
                />
              ))
            )}
            {/* /End replace */}
          </div>
        </div>
      </main>
    </div>
  );
}
