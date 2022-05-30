import { NextPage } from "next"

const New: NextPage = () => {
  return (
    <div className="bg-white">
      <main>
        <div className="pt-8 overflow-hidden sm:pt-12 lg:relative lg:py-48">
          <div className="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl lg:grid lg:grid-cols-2 lg:gap-24">
            <div>
              <div></div>
              <div className="mt-20">
                <div className="flex flex-wrap gap-2 text-xl font-medium">
                  <span className="text-black text-opacity-70">
                    Sqrl is{" "}
                    <span className="text-black text-opacity-50">(almost)</span>{" "}
                    here.
                  </span>
                  <a
                    href="https://staging.sqrlplanner.com"
                    className="font-medium text-tahiti-700 group"
                  >
                    Try the alpha release -&gt;
                  </a>
                </div>
              </div>
              <div className="mt-6">
                <h1 className="mt-4 text-5xl  font-extrabold text-gray-900 tracking-tight">
                  The oh-so desparately needed planner
                </h1>
                <p className="mt-6 text-2xl font-medium text-gray-900 text-opacity-70 w-full max-w-ptahiti">
                  Because let's face it, Acorn is shit. A modern timetable
                  planner for the University of Toronto.
                </p>
              </div>
              <form action="#" className="mt-12 sm:max-w-lg sm:w-full sm:flex">
                <div className="min-w-0 flex-1">
                  <label htmlFor="email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="block w-full border border-gray-300 rounded-md px-5 py-3 text-base text-gray-900 placeholder gray-500 shadow-sm focus:border-tahiti-600 focus:ring-tahiti-600"
                    placeholder="meric.gertler@mail.utoronto.ca"
                  />
                </div>
                <div className="mt-4 sm:mt-0 sm:ml-3">
                  <button
                    type="submit"
                    className="block w-full rounded-md border border-transparent px-5 py-3 bg-tahiti-700-light text-base font-medium text-white shadow hover:bg-tahiti-700 focus:outline-none focus:ring-2 focus:ring-tahiti-700-light focus:ring-offset-2 sm:px-10"
                  >
                    <span className="inline-flex items-center">
                      Get updates
                    </span>
                  </button>
                </div>
              </form>
              <p className="mt-2 text-sm text-gray-500">
                We'll send you an email when Sqrl is ready.
              </p>
            </div>

            <div className="sm:mx-auto sm:max-w-3xl sm:px-6">
              <div className="py-12 sm:relative sm:mt-12 sm:py-16 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
                <div className="hidden sm:block">
                  <div className="absolute inset-y-0 left-1/2 w-screen bg-gray-50 rounded-l-3xl lg:left-80 lg:right-0 lg:w-full" />
                  <svg
                    className="absolute top-8 right-1/2 -mr-3 lg:m-0 lg:left-0"
                    width={404}
                    height={392}
                    fill="none"
                    viewBox="0 0 404 392"
                  >
                    <defs>
                      <pattern
                        id="837c3e70-6c3a-44e6-8854-cc48c737b659"
                        x={0}
                        y={0}
                        width={20}
                        height={20}
                        patternUnits="userSpaceOnUse"
                      >
                        <rect
                          x={0}
                          y={0}
                          width={4}
                          height={4}
                          className="text-gray-200"
                          fill="currentColor"
                        />
                      </pattern>
                    </defs>
                    <rect
                      width={404}
                      height={392}
                      fill="url(#837c3e70-6c3a-44e6-8854-cc48c737b659)"
                    />
                  </svg>
                </div>
                <div className="relative pl-4 mr-40 sm:mx-auto sm:max-w-3xl sm:px-0 lg:max-w-none lg:h-full lg:pl-12">
                  <img
                    className="w-full rounded-md shadow-xl ring-1 ring-black ring-opacity-5 lg:h-full lg:w-auto lg:max-w-none"
                    src="/assets/app_preview.jpg"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default New
