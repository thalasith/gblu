import { useState } from "react";

interface GBLU {
  hr_area: string;
  legislative_update_summary: string;
  law_in_force: string;
  employer_action_required: string;
  new_law: string;
  more_info_1_url: string;
}

export default function GBLUCard({ gbluItem }: { gbluItem: GBLU }) {
  const [showDetails, setShowDetails] = useState(false);
  console.log(gbluItem);
  const onShowDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className="pb-4">
      <div className="flex w-full flex-row  bg-gray-200 px-2 py-4 shadow-md ">
        <div className="w-7/12 border-r border-slate-800 pr-2">
          <h1 className="py-2  text-4xl">
            <span className="font-bold">HR Area:</span> {gbluItem.hr_area}
          </h1>
          <p className="text-2xl">{gbluItem.legislative_update_summary}</p>
          <button onClick={(e) => onShowDetails()} className="">
            {" "}
            Show Details
          </button>
        </div>
        <div className="grid w-5/12 grid-cols-2 grid-rows-2 pl-2">
          <p className="my-auto">Law In Forced:</p>
          <div className="my-auto w-full rounded-xl bg-slate-800 py-1 px-2 text-center text-white">
            {gbluItem.law_in_force}
          </div>
          <p className="my-auto">Action Required?</p>
          <div className="my-auto w-full rounded-xl bg-slate-800 py-1 px-2 text-center text-white">
            {gbluItem.employer_action_required}
          </div>
        </div>
      </div>
      {/* className="rounded-b-xl border-l border-b border-r border-gray-300 p-2" */}
      <div
        className={`rounded-b-xl border-l border-b border-r border-gray-300 p-2 ${
          showDetails ? "block" : "hidden"
        }`}
      >
        <p>{gbluItem.new_law}</p>
        <div className="flex justify-end">
          <a className="text-right" href={gbluItem.more_info_1_url}>
            Source
          </a>
        </div>
      </div>
    </div>
  );
}
