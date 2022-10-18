import Link from "next/link";
import { Popover } from "@headlessui/react";

export default function Header() {
  return (
    <Popover className="relative bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex items-center justify-between border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link href="/">
              <span className="sr-only">The Gowdie</span>
              <img className="h-8 w-auto sm:h-10" src="/gowdie.png" alt="" />
            </Link>
          </div>

          <div className="lg:text-md flex w-0 flex-1 items-center justify-end text-xs">
            <Link
              href="/"
              className="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-gray-600 py-1 px-2  text-base font-medium text-white shadow-sm hover:bg-gray-800 lg:px-4 lg:py-2"
            >
              Country Viewer
            </Link>
            <Link
              href="/download"
              className="ml-2 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-gray-600 py-1 px-2  text-base font-medium text-white shadow-sm hover:bg-gray-800 lg:px-4 lg:py-2"
            >
              Download to Excel
            </Link>
          </div>
        </div>
      </div>
    </Popover>
  );
}
