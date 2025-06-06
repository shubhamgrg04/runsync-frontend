"use client";

import Image from "next/image";
import { ArrowPathIcon } from "@heroicons/react/24/outline";

export default function IntegrationsPage() {
  return (
    <>
      <div className="max-w-7xl mx-auto">
        <div className="md:flex md:items-center md:justify-between">
          <div className="min-w-0 flex-1">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 dark:text-white sm:truncate sm:text-3xl sm:tracking-tight">
              Sync Settings
            </h2>
          </div>
          <div className="mt-4 flex md:ml-4 md:mt-0">
            <button
              type="button"
              className="ml-3 inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <ArrowPathIcon className="h-4 w-4 mr-2" /> Setup New Sync
            </button>
          </div>
        </div>

        {/* Available Integrations */}
        <div className="mt-8">
          <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
            Available Apps
          </h3>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {/* Strava */}
            <div className="relative flex items-center space-x-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-slate-800 px-6 py-5 shadow-sm hover:border-gray-400 dark:hover:border-gray-600">
              <div className="flex-shrink-0">
                <Image
                  src="/strava-logo.svg"
                  alt="Strava"
                  className="h-8 w-8"
                  width={32}
                  height={32}
                />
              </div>
              <div className="min-w-0 flex-1">
                <div className="focus:outline-none">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    Strava
                  </p>
                  <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                    Track your runs and activities
                  </p>
                </div>
              </div>
            </div>

            {/* Fitbit */}
            <div className="relative flex items-center space-x-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-slate-800 px-6 py-5 shadow-sm hover:border-gray-400 dark:hover:border-gray-600">
              <div className="flex-shrink-0">
                <Image
                  src="/fitbit-logo.svg"
                  alt="Fitbit"
                  className="h-8 w-8"
                  width={32}
                  height={32}
                />
              </div>
              <div className="min-w-0 flex-1">
                <div className="focus:outline-none">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    Fitbit
                  </p>
                  <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                    Sync your fitness data
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
