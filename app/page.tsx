"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";

export default function LandingPage() {
  return (
    <>
      <section className="flex flex-col items-center text-center py-20 px-6">
        {/* Hero Section */}
        <div className="max-w-3xl">
          <h1 className="text-5xl font-extrabold leading-tight mb-6">
            Sync Your Runs. <br /> Anywhere. Effortlessly.
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Connect Strava, Garmin, Nike Run Club, Adidas Running, and more.
            Seamlessly sync your activities across platforms.
          </p>
          <div className="flex justify-center">
            <Link href="/dashboard">
              <button className="flex items-center space-x-2 bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full text-lg transition">
                <span>Get Started</span>
                <ArrowRightIcon className="w-5 h-5" />
              </button>
            </Link>
          </div>
        </div>

        {/* How it works section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-36 text-center"
        >
          <h2 className="text-4xl font-bold mb-8">How it works</h2>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12 max-w-6xl mx-auto">
          {[
            {
              title: "Connect Your Apps",
              description:
                "Authorize your favorite fitness platforms securely via OAuth or API keys",
              image: "/connect.png",
              color: "from-orange-500 to-orange-600",
            },
            {
              title: "Set Your Preferences",
              description:
                "Choose sync direction, frequency, and data types you care about",
              image: "/preferences.png",
              color: "from-blue-500 to-blue-600",
            },
            {
              title: "Auto-Sync Activities",
              description:
                "Runs are synced automatically — no manual uploads ever again",
              image: "/autosync.png",
              color: "from-green-500 to-green-600",
            },
          ].map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group relative h-full"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-blue-500 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                <div
                  className={`w-24 h-24 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center mx-auto mb-6 transform group-hover:scale-110 transition-transform duration-300`}
                >
                  <Image
                    src={step.image}
                    alt={step.title}
                    width={100}
                    height={100}
                    className="object-contain"
                  />
                </div>
                <div className="text-center flex-grow">
                  <h3 className="text-xl font-semibold mb-3 text-slate-900 group-hover:text-orange-600 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}
