import { Fragment, useState, MouseEvent } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { trpc } from "../utils/trpc";
import GBLUCard from "./GBLUCard";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("Afghanistan");
  const [selectedFlag, setSelectedFlag] = useState("AFG");
  const { data: countries } = trpc.useQuery(["countries.getCountries"]);
  const gblu = trpc.useQuery([
    "gblu.getGBLUByCountry",
    {
      country: selectedCountry,
    },
  ]);
  console.log(gblu.data);

  const onSelectedCountry = (e: MouseEvent<HTMLElement>) => {
    const country = countries!.find(
      (country) => country.country === (e.target as HTMLInputElement).value
    );
    setSelectedCountry(country!.country);
    setSelectedFlag(country!.country_code);
    gblu.refetch();
  };

  return (
    <>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 md:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-indigo-700">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                      <button
                        type="button"
                        className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="h-0 flex-1 overflow-y-auto pt-5 pb-4">
                    <div className="flex flex-shrink-0 items-center px-4">
                      <Image src="/gowdie.png" alt="Your Company" />
                    </div>
                    <nav className="mt-5 space-y-1 px-2">
                      {countries?.map((item) => (
                        <button
                          onClick={(e) => onSelectedCountry(e)}
                          className="group flex items-center rounded-md px-2 py-2 text-sm font-medium text-white hover:bg-indigo-600 hover:bg-opacity-75"
                        >
                          {item.country}
                        </button>
                      ))}
                    </nav>
                  </div>
                  <div className="flex flex-shrink-0 border-t border-indigo-800 p-4">
                    <a href="#" className="group block flex-shrink-0">
                      <div className="flex items-center">
                        <div>
                          <img
                            className="inline-block h-10 w-10 rounded-full"
                            src="https://media-exp1.licdn.com/dms/image/C5603AQEzZPN82rhaSA/profile-displayphoto-shrink_800_800/0/1517666268447?e=1671667200&v=beta&t=hbFCi2ND6ORe46I_u4UAnMwIEfPao8jN8z27ceVRLyU"
                            alt=""
                          />
                        </div>
                        <div className="ml-3">
                          <p className="text-base font-medium text-white">
                            Gareth Williams
                          </p>
                          <p className="text-sm font-medium text-indigo-200 group-hover:text-white">
                            View profile
                          </p>
                        </div>
                      </div>
                    </a>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
              <div className="w-14 flex-shrink-0" aria-hidden="true">
                {/* Force sidebar to shrink to fit close icon */}
              </div>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex min-h-0 flex-1 flex-col bg-indigo-700">
            <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
              <div className="flex flex-shrink-0 items-center px-4">
                <Image
                  src="/gowdie.png"
                  width="200"
                  height="150"
                  alt="Your Company"
                />
              </div>
              <nav className="mt-5 flex-1 space-y-1 px-2">
                {countries?.map((item) => (
                  <button
                    value={item.country}
                    onClick={(e) => onSelectedCountry(e)}
                    className="group flex items-center rounded-md px-2 py-2 text-sm font-medium text-white hover:bg-indigo-600 hover:bg-opacity-75"
                  >
                    {item.country}
                  </button>
                ))}
              </nav>
            </div>
            <div className="flex flex-shrink-0 border-t border-indigo-800 p-4">
              <a href="#" className="group block w-full flex-shrink-0">
                <div className="flex items-center">
                  <div>
                    <img
                      className="inline-block h-9 w-9 rounded-full"
                      src="https://media-exp1.licdn.com/dms/image/C5603AQEzZPN82rhaSA/profile-displayphoto-shrink_800_800/0/1517666268447?e=1671667200&v=beta&t=hbFCi2ND6ORe46I_u4UAnMwIEfPao8jN8z27ceVRLyU"
                      alt=""
                    />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-white">
                      Gareth Williams
                    </p>
                    <p className="text-xs font-medium text-indigo-200 group-hover:text-white">
                      View profile
                    </p>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
        <div className="flex flex-1 flex-col md:pl-64">
          <div className="sticky top-0 z-10 bg-gray-100 pl-1 pt-1 sm:pl-3 sm:pt-3 md:hidden">
            <button
              type="button"
              className="-ml-0.5 -mt-0.5 inline-flex h-12 w-12 items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <main className="flex-1">
            <div className="py-6">
              <div className="mx-auto flex max-w-6xl justify-between px-4 pb-2 sm:px-6 md:px-8">
                <h1 className="text-2xl font-semibold text-gray-900">
                  {selectedCountry}
                </h1>
                <img
                  src={`https://countryflagsapi.com/png/${selectedFlag}`}
                  width="150"
                />
              </div>

              <div className="mx-auto max-w-6xl px-4 text-gray-700 sm:px-6 md:px-8">
                {/* Replace with your content */}
                {gblu.data?.length === 0 ? (
                  <div className="flex w-full flex-row px-2 py-4 text-4xl">
                    No legislative updates for this country.
                  </div>
                ) : (
                  gblu.data?.map((item) => (
                    <GBLUCard
                      gbluItem={{
                        hr_area: item.hr_area,
                        legislative_update_summary:
                          item.legislative_update_summary,
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
      </div>
    </>
  );
}
