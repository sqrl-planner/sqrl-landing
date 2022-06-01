import { motion } from "framer-motion"
import { FaEnvelope } from "react-icons/fa"
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
import Head from "next/head"

const isEmail = (email: string) => {
  var re = /\S+@\S+\.\S+/
  return re.test(email)
}

const toastVariants = {
  hidden: {
    opacity: 0,
    y: "50%",
  },
  show: {
    opacity: 1,
    y: 0,
  },
}

const New: NextPage = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [email, setEmail] = useState<string>("")

  const [done, setDone] = useState(false)

  const [token, setToken] = useState<string>("")
  const captchaRef = useRef<HCaptcha>(null)

  useEffect(() => {
    if (!token || !email) return

    fetch("/api/interest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, token }),
    })
      .then((res) => {
        setLoading(false)

        if (res.status !== 200) return setError(true)

        setError(false)
        setDone(true)
      })
      .catch((error) => alert(error))
  }, [token, email])

  const [showToast, setShowToast] = useState<boolean>(false)

  useEffect(() => {
    if (!done) return

    setShowToast(true)

    setTimeout(() => {
      setShowToast(false)
      setDone(false)
    }, 7000)
  }, [done])

  return (
    <React.Fragment>
      <Head>
        <title>Sqrl Planner</title>
        <meta
          name="description"
          content="Sqrl is a course schedule planner for the University of Toronto."
        />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      {process.env.NODE_ENV === "development" && (
        // Development buttons
        <div
          className="fixed p-2 z-10 m-2 flex gap-4"
        >
          <button
            onClick={(e) => {
              e.preventDefault()
              setDone(true)
            }}
          >
            Show done toast
          </button>
          <button
            onClick={(e) => {
              e.preventDefault()
              setLoading((prev) => !prev)
            }}
          >
            Toggle loading
          </button>

        </div>
      )}
      <motion.div
        id="toast-default"
        initial="hidden"
        animate={showToast ? "show" : email === "" ? "hidden" : "exit"}
        variants={toastVariants}
        transition={{
          ease: "easeInOut",
          duration: 0.4,
        }}
        className="fixed m-auto inset-x-0 bottom-6 z-10 flex items-center w-full max-w-sm p-4 text-green-900 bg-green-100 rounded-lg shadow-lg"
        role="alert"
      >
        <div className="self-start text-lg px-1">
          <FaEnvelope />
        </div>
        <div className="px-2 text-md font-normal">
          <p className="font-semibold">Thanks for your interest!</p>
          Check your email for a confirmation.
        </div>
      </motion.div>
      <div className="bg-white">
        <main>
          <div className="pt-8 overflow-hidden sm:pt-12 lg:relative lg:py-48">
            <div className="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl lg:grid lg:grid-cols-2 lg:gap-24">
              <div>
                <div></div>
                <div className="mt-20">
                  <div className="flex flex-wrap gap-2 text-xl font-medium">
                    <motion.span
                      className="text-black text-opacity-70"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      // transition={{ delay: 1.8, duration: 0.3 }}
                      transition={{ duration: 0.5 }}
                    >
                      Sqrl is{" "}
                      <span className="text-black text-opacity-50">
                        (almost)
                      </span>{" "}
                      here.
                    </motion.span>
                    <motion.a
                      href="https://staging.sqrlplanner.com"
                      className="font-medium text-tahiti-700 group flex items-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      // transition={{ delay: 1.8, duration: 0.3 }}
                      transition={{ duration: 0.5 }}
                    >
                      Try the alpha release 
                      <div className="inline-flex flex-col relative justify-center w-3 h-3 ml-1 group-hover:translate-x-2 transition">
                        <span className="group-hover:scale-x-150 transition absolute origin-right w-full scale-x-0 insex-y-0 m-auto right-[1px] h-[2px] bg-tahiti-700"></span>
                        <span className=" origin-right w-full relative top-[1.25px] h-[2px] rotate-45 bg-tahiti-700"></span>
                        <span className=" origin-right w-full relative bottom-[1.25px] h-[2px] -rotate-45 bg-tahiti-700"></span>
                      </div>
                      {/* <span className="group-hover:translate-x-1 inline-block transition">-&gt;</span> */}
                    </motion.a>
                  </div>
                </div>
                <div className="mt-6">
                  <motion.h1
                    className="mt-4 text-5xl font-extrabold text-gray-900 tracking-tight"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    // transition={{ duration: 0.5 }}
                    transition={{ duration: 0.5 }}
                  >
                    The oh-so desperately needed planner.
                  </motion.h1>
                  <motion.p
                    className="mt-4 text-2xl font-medium text-gray-900
                  text-opacity-70 w-full max-w-ptahiti"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    // transition={{ delay: 1, duration: 0.5 }}
                    transition={{ duration: 0.5 }}
                  >
                    {"Because let's face it, Acorn is shit. A modern timetable planner for the University of Toronto."}
                  </motion.p>
                </div>
                <motion.form
                  className="mt-10 sm:max-w-lg sm:w-full flex sm:flex-row flex-col"
                  onSubmit={(e) => {
                    e.preventDefault()
                    if (!captchaRef.current) return

                    captchaRef.current.execute()
                    setLoading(true)
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  // transition={{ delay: 1.8, duration: 0.3 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="w-full sm:max-w-xs shadow">
                    <label htmlFor="email" className="sr-only">
                      Email address
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="block w-full border border-gray-300 rounded-md px-5 py-3 text-base text-gray-900 placeholder gray-500 focus:border-tahiti-600 focus:ring-tahiti-600 sm:rounded-r-none h-12"
                      placeholder="meric.gertler@mail.utoronto.ca"
                      value={email}
                      disabled={loading}
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
                      className="w-40 rounded-md border border-transparent px-5 py-3 bg-tahiti-700-light text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-tahiti-700-light focus:ring-offset-2 flex flex-row items-center justify-center h-12 sm:rounded-l-none not:disabled:hover:bg-tahiti-700 disabled:opacity-80 shadow"
                    >
                      {loading ? (
                        <svg
                          className="animate-spin h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                      ) : (
                        "Get updates"
                      )}
                    </button>
                  </div>
                </motion.form>
                <motion.p
                  className="mt-2 text-sm text-gray-500"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  // transition={{ delay: 1.8, duration: 0.3 }}
                  transition={{ duration: 0.5 }}
                >
                  {"We'll send you an email when Sqrl is ready."}
                </motion.p>
              </div>

              <motion.div
                className="sm:mx-auto sm:max-w-3xl sm:px-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                // transition={{ delay: 1.8, duration: 0.5 }}
                transition={{ duration: 0.5 }}
              >
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
              </motion.div>
            </div>
          </div>
        </main>
      </div>
    </React.Fragment>
  )
}

export default New
