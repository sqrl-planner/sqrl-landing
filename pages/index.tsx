import {
  AnimatePresence,
  ForwardRefComponent,
  HTMLMotionProps,
  motion,
} from "framer-motion"
import type { NextPage } from "next"
import Head from "next/head"
import Image from "next/image"
import { useRouter } from "next/router"
import { useState } from "react"
import Modal from "react-modal"
import InterestModal from "../components/InterestModal"

import Squirrel from "../public/assets/logos/squirrel_2.png"

import styles from "../styles/Home.module.css"

Modal.setAppElement("#__next")

const Home: NextPage = () => {
  const [modalIsOpen, setIsOpen] = useState(false)
  const router = useRouter()

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setIsOpen(false)}
        contentLabel="Interest modal"
        overlayClassName="fixed"
        contentElement={() => (
          <AnimatePresence>
            <InterestModal setIsOpen={setIsOpen} />
          </AnimatePresence>
        )}
        overlayElement={(props, children) => (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsOpen(false)}
            key="modal-overlay"
            {...(props as ForwardRefComponent<
              HTMLDivElement,
              HTMLMotionProps<"div">
            >)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-75 bg-neutral-400 backdrop-blur-sm"
          >
            {children}
          </motion.div>
        )}
      ></Modal>
      <Head>
        <title>Sqrl Planner</title>
        <meta
          name="description"
          content="Sqrl is a course schedule planner for the University of Toronto."
        />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>

      <main className="h-screen w-screen flex justify-center items-center bg-slate-50">
        <div className="flex-col flex items-start p-6 relative gap-4 max-w-4xl">
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{ delay: 1, duration: 0.3 }}
            className="w-24 h-24 rounded-full shadow-2xl mb-4"
          >
            <Image src={Squirrel} layout="intrinsic" alt="Logo" />
          </motion.div>
          <motion.h1
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{ duration: 0.5 }}
            className="md:text-6xl sm:text-5xl text-4xl font-bold"
          >
            Sqrl Planner is{" "}
            <span className="text-black text-opacity-60">(almost)</span> here.
          </motion.h1>
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{ delay: 1, duration: 0.3 }}
          >
            <p className=" text-2xl font-medium text-black text-opacity-70 w-full max-w-prose">
              Sqrl is a modern timetable planner for the University of Toronto.
            </p>
            <div className="flex flex-wrap mt-4 sm:text-xl text-lg">
              <button
                onClick={() => setIsOpen(true)}
                className="bg-blue-100 font-medium text-sky-600 rounded-xl sm:p-4 sm:px-6 p-3 px-4 mt-4 shadow hover:shadow-md transition mr-6"
              >
                Get updates
              </button>
              <a
                href="https://staging.sqrlplanner.com"
                className=" border border-gray-100 text-black text-opacity-70 rounded-xl sm:p-4 sm:px-6 p-3 px-4 mt-4 shadow hover:shadow-md transition"
              >
                Try the alpha release -&gt;
                {/* See the code -&gt; */}
              </a>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}

export default Home
