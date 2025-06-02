import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import {
  KeyIcon,
  ArrowsRightLeftIcon,
  ArrowPathRoundedSquareIcon,
} from "@heroicons/react/24/outline";

const steps = [
  {
    title: "Authenticate",
    description: "Authenticate with your devices to the app",
    icon: KeyIcon, // Key icon for authentication
    link: "/connect",
  },
  {
    title: "Setup Sync",
    description: "Setup sync between your devices and the app",
    icon: ArrowsRightLeftIcon, // Bidirectional arrows for sync setup
    link: "/sync",
  },
  {
    title: "Auto Sync",
    description: "Automatically sync your runs from your devices to the app",
    icon: ArrowPathRoundedSquareIcon, // Circular arrow for automatic syncing
    link: "/runs",
  },
];

export default function LandingPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="w-full flex flex-col items-center text-center py-12 sm:py-20 px-4 sm:px-6 bg-gradient-to-b from-white via-indigo-100 to-purple-100 dark:from-slate-900 dark:via-indigo-900/40 dark:to-purple-900/40">
        <div className="max-w-3xl relative">
          <div className="absolute inset-0"></div>
          <div className="relative">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-4 sm:mb-6 font-gabarito">
              Sync Your Runs. <br /> Anywhere. Effortlessly.
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 px-2">
              Connect Strava, Garmin, Nike Run Club, Adidas Running, and more.
              Seamlessly sync your activities across platforms.
            </p>
            <div className="flex justify-center mb-12 sm:mb-20">
              <Link href="/dashboard">
                <button className="flex items-center space-x-2 hero-cta-button">
                  <span>Start Syncing</span>
                  <ArrowRightIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How it works section */}
      <section className="flex flex-col items-center text-center py-12 sm:py-20 px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-12">
          How it works
        </h2>
        <div className="max-w-5xl mx-auto w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {steps.map((step) => (
              <div
                className={`rounded-xl p-4 sm:p-6 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 border border-purple-100 dark:border-purple-800/50 transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:-translate-y-1`}
                key={step.title}
              >
                <div className="flex items-center justify-center mb-3 sm:mb-4 transform transition-transform duration-300 hover:scale-110">
                  <step.icon className="w-10 h-10 sm:w-12 sm:h-12 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="font-bold text-base sm:text-lg md:text-xl text-gray-900 dark:text-gray-100 mb-2 transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 mb-4 transition-colors duration-300">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
