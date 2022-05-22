import { motion } from "framer-motion"
import React, {
  Dispatch,
  Fragment,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react"
import { Oval } from "react-loader-spinner"

import HCaptcha from "@hcaptcha/react-hcaptcha"
// import "react-loader-spinner/dist/loader/Oval/"
const isEmail = (email: string) => {
  var re = /\S+@\S+\.\S+/
  return re.test(email)
}

const InterestModal = ({
  setIsOpen,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>
}) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [email, setEmail] = useState<string>("")

  const [done, setDone] = useState(false)

  const [token, setToken] = useState<string>("")
  const captchaRef = useRef<HCaptcha>(null)

  //   const onLoad = () => {
  //     // this reaches out to the hCaptcha JS API and runs the
  //     // execute function on it. you can use other functions as
  //     // documented here:
  //     // https://docs.hcaptcha.com/configuration#jsapi
  //     if (!captchaRef.current) return

  //     captchaRef.current.execute()
  //   }

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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onClick={(e) => e.stopPropagation()}
      key="quiz-modal-content"
      className="fixed w-screen h-screen max-h-screen h-screen-ios min-h-screen-ios overflow-y-auto text-black rounded-none p-8 shadow-xl bg-slate-50 md:rounded-2xl md:w-[700px] md:h-[350px] max-w-[100vw]"
    >
      {!done ? (
        <form
          className="flex h-full flex-col md:justify-between justify-start gap-8 md:gap-0"
          onSubmit={(e) => {
            e.preventDefault()
            if (!captchaRef.current) return

            captchaRef.current.execute()
            setLoading(true)
          }}
        >
          <div className="flex flex-col gap-3">
            <div className="flex w-full justify-between items-start gap-8">
              <h2 className="font-medium sm:text-4xl text-3xl">
                Get updates on Sqrl Planner
              </h2>
              <button
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  setIsOpen(false)
                }}
                type="button"
                className="focus:outline-1 relative -right-2 -top-2 rounded-xl p-5 opacity-70"
              >
                <div className="absolute w-[80%] h-[2px] bg-black rotate-45 origin-center inset-0 m-auto"></div>
                <div className="absolute w-[80%] h-[2px] bg-black -rotate-45 origin-center inset-0 m-auto"></div>
              </button>
            </div>
            <p className="font-medium sm:text-xl text-lg text-black text-opacity-70">
              We&apos;ll send you an email when Sqrl is ready.
            </p>
          </div>
          <div className="flex flex-col items-center w-full">
            <input
              className="shadow-md min-w-[300px] xs:min-w-[330px] w-[80%] rounded-md text-xl sm:text-2xl p-4 bg-white text-center"
              type="email"
              autoFocus
              placeholder="meric.gertler@utoronto.ca"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex w-full justify-between items-center text-red-500 font-medium">
            <p className="text-red">
              {error && "Something went wrong, please try again."}
            </p>
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
              className="bg-blue-100 font-medium text-sky-600 p-3 px-4 rounded-xl shadow w-40 flex justify-center h-12 items-center disabled:opacity-50 disabled:cursor-not-allowed transition"
              disabled={loading || !email || !isEmail(email)}
              type="submit"
            >
              {loading ? (
                <Oval
                  ariaLabel="loading-indicator"
                  height={20}
                  width={20}
                  strokeWidth={6}
                  color="white"
                />
              ) : (
                "Get updates ->"
              )}
            </button>
          </div>
        </form>
      ) : (
        <div className="flex h-full flex-col md:justify-between justify-start gap-8 md:gap-0">
          <div className="flex flex-col gap-3">
            <div className="flex w-full justify-between items-start gap-8">
              {" "}
              <h2 className="font-medium sm:text-4xl text-3xl">
                Thanks for your interest!
              </h2>
              <button
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  setIsOpen(false)
                }}
                type="button"
                className="focus:outline-1 relative -right-2 -top-2 rounded-xl p-5 opacity-70"
              >
                <div className="absolute w-[80%] h-[2px] bg-black rotate-45 origin-center inset-0 m-auto"></div>
                <div className="absolute w-[80%] h-[2px] bg-black -rotate-45 origin-center inset-0 m-auto"></div>
              </button>
            </div>
            <p className="font-medium text-xl text-black text-opacity-70">
              Check{" "}
              <span className="text-green-700">
                {email ? email : "your email"}
              </span>{" "}
              for a confirmation email. You&apos;ll be among the first to know
              when Sqrl is publicly released.
            </p>
          </div>
          <div className="flex w-full justify-between items-center text-red-500 font-medium">
            <p className="text-red">
              {error && "Something went wrong, please try again."}
            </p>
            <a
              href="https://staging.sqrlplanner.com"
              className="bg-blue-100 font-medium text-sky-600 p-3 px-4 rounded-xl shadow flex justify-center h-12 items-center disabled:opacity-80 transition"
              type="submit"
            >
              Try the Alpha release -&gt;
            </a>
          </div>
        </div>
      )}
    </motion.div>
  )
}

export default InterestModal
