import { useState, ChangeEvent } from "react";
import { trpc } from "../utils/trpc";
import { XMarkIcon } from "@heroicons/react/24/outline";
import pptxgen from "pptxgenjs";

const tableHeader = {
  align: "left",
  fontFace: "Arial",
  fill: { color: "002C76" },
  color: "FFFFFF",
};

export default function PPTXDownloadSection() {
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

  const downloadData = async () => {
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

    console.log(data);

    const pptx = new pptxgen();
    data.forEach((countryData: any) => {
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
      countryData.data.forEach((slideData: any) => {
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
  };

  return (
    <div className="mx-auto max-w-7xl  sm:px-6 lg:px-8">
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
      <button onClick={downloadData}>Click Me for Powerpoint!</button>
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
              className="mx-1 my-2 flex flex-row justify-between rounded border-2 border-dashed border-gray-900 bg-gray-200 p-2"
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
              <span className="">{country}</span>

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
