export default function Header() {
  return (
    <header className="bg-indigo-600 z-40">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex w-full items-center justify-between border-b border-indigo-500 py-6 lg:border-none">
          <div className="flex items-center">
            <a href="/">
              <span className="text-white">The Gowdie</span>
            </a>
          </div>
          <div className="ml-10 space-x-4">
            <a
              href="/"
              className="inline-block rounded-md border border-transparent bg-indigo-500 py-2 px-4 text-base font-medium text-white hover:bg-opacity-75"
            >
              Country Viewer
            </a>
            <a
              href="#"
              className="inline-block rounded-md border border-transparent bg-white py-2 px-4 text-base font-medium text-indigo-600 hover:bg-indigo-50"
            >
              Download to Excel
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
