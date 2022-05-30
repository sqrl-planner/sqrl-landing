import { motion } from "framer-motion"
import React, {
  Dispatch,
  Fragment,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react"
import { NextPage } from "next"

import { Oval } from "react-loader-spinner"
import HCaptcha from "@hcaptcha/react-hcaptcha"

const isEmail = (email: string) => {
  var re = /\S+@\S+\.\S+/
  return re.test(email)
}

const New: NextPage = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [email, setEmail] = useState<string>("")

  const [done, setDone] = useState(false)

  const [token, setToken] = useState<string>("")
  const captchaRef = useRef<HCaptcha>(null)

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
                  The oh-so desperately needed planner.
                </h1>
                <p className="mt-6 text-2xl font-medium text-gray-900 text-opacity-70 w-full max-w-ptahiti">
                  Because let's face it, Acorn is shit. A modern timetable
                  planner for the University of Toronto.
                </p>
              </div>
              <form
                className="mt-12 sm:max-w-lg sm:w-full sm:flex"
                onSubmit={(e) => {
                  e.preventDefault()
                  if (!captchaRef.current) return

                  captchaRef.current.execute()
                  setLoading(true)
                }}
              >
                <div className="min-w-0 w-full">
                  <label htmlFor="email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="block w-full border border-gray-300 rounded-md px-5 py-3 text-base text-gray-900 placeholder gray-500 shadow-sm focus:border-tahiti-600 focus:ring-tahiti-600 sm:rounded-r-none"
                    placeholder="meric.gertler@mail.utoronto.ca"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mt-4 sm:mt-0 sm:ml-0 w-1/2">
                  <HCaptcha
                    sitekey="dea9e383-ef63-4c40-b08f-27f38ba957b3"
                    //   onLoad={onLoad}
                    // @ts-ignore
                    onVerify={setToken}
                    onClose={() => {
                      setToken("")
                      setLoading(false)
                    }}
                    size="invisible"
                    ref={captchaRef}
                  />
                  <button
                    type="submit"
                    disabled={loading || !email || !isEmail(email)}
                    className="w-full rounded-md border border-transparent px-5 py-3 bg-tahiti-700-light text-base font-medium text-white shadow focus:outline-none focus:ring-2 focus:ring-tahiti-700-light focus:ring-offset-2 flex flex-row items-center justify-center  h-full sm:rounded-l-none not:disabled:hover:bg-tahiti-700 disabled:opacity-80"
                  >
                    {loading ? (
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : (
                      "Get updates"
                    )}
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
                <div className="relative pl-4 mr-40 sm:mx-auto sm:max-w-3xl sm:px-0 lg:max-w-none lg:h-full lg:pl-12 sm:block hidden">
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
