import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/solid";

export default function LandingPage() {
  return (
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

      {/* Illustrations */}
      <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl">
        {/* Step 1 */}
        <div className="flex flex-col items-center">
          <Image
            src="/connect.svg"
            alt="Connect Apps"
            width={100}
            height={100}
            className="mb-6"
          />
          <h3 className="text-2xl font-semibold mb-2">Connect Your Apps</h3>
          <p className="text-gray-600">
            Authorize your favorite fitness platforms securely via OAuth or API
            keys.
          </p>
        </div>

        {/* Step 2 */}
        <div className="flex flex-col items-center">
          <Image
            src="/preferences.svg"
            alt="Set Preferences"
            width={100}
            height={100}
            className="mb-6"
          />
          <h3 className="text-2xl font-semibold mb-2">Set Your Preferences</h3>
          <p className="text-gray-600">
            Choose sync direction, frequency, and data types you care about.
          </p>
        </div>

        {/* Step 3 */}
        <div className="flex flex-col items-center">
          <Image
            src="/logo.svg"
            alt="Auto Sync"
            width={100}
            height={100}
            className="mb-6"
          />
          <h3 className="text-2xl font-semibold mb-2">Auto-Sync Activities</h3>
          <p className="text-gray-600">
            Runs are synced automatically — no manual uploads ever again.
          </p>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="mt-32">
        <Link href="/dashboard">
          <button className="flex items-center space-x-2 bg-orange-500 hover:bg-orange-600 text-white px-10 py-4 rounded-full text-lg transition">
            <span>Start Syncing Now</span>
            <ArrowRightIcon className="w-5 h-5" />
          </button>
        </Link>
      </div>
    </section>
  );
}
