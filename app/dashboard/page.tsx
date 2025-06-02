"use client";

import { useEffect, useState } from "react";
import { api } from "../utils/api";
import type { Integration } from "../types/integration";
import { LinkIcon } from "@heroicons/react/24/outline";

export default function DashboardPage() {
  const [integrations, setIntegrations] = useState<Integration[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchIntegrations = async () => {
      try {
        const response = await api.get<Integration[]>(
          "/integrations/connected"
        );

        if (response.error) {
          setError(response.error);
          return;
        }

        if (response.data) {
          // Get unique integrations by name
          const uniqueIntegrations = response.data.reduce((acc, curr) => {
            if (
              !acc.find(
                (item) => item.integration_name === curr.integration_name
              )
            ) {
              acc.push(curr);
            }
            return acc;
          }, [] as Integration[]);
          setIntegrations(uniqueIntegrations);
        }
      } catch {
        setError("Failed to fetch integrations");
      } finally {
        setIsLoading(false);
      }
    };

    fetchIntegrations();
  }, []);

  return (
    <>
      <div className="max-w-7xl mx-auto">
        <div className="md:flex md:items-center md:justify-between">
          <div className="min-w-0 flex-1">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 dark:text-white sm:truncate sm:text-3xl sm:tracking-tight">
              Dashboard
            </h2>
          </div>
          <div className="mt-4 flex md:ml-4 md:mt-0">
            <button
              type="button"
              className="ml-3 inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Connect New App
            </button>
          </div>
        </div>

        {/* Connected Integrations */}
        <div className="mt-8">
          <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
            Connected Apps
          </h3>
          {isLoading ? (
            <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              Loading integrations...
            </div>
          ) : error ? (
            <div className="mt-4 text-sm text-red-600 dark:text-red-400">
              {error}
            </div>
          ) : integrations.length === 0 ? (
            <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              No integrations connected yet.
            </div>
          ) : (
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {integrations.map((integration) => (
                <div
                  key={integration.id}
                  className="relative flex items-center space-x-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-slate-800 px-6 py-5 shadow-sm hover:border-gray-400 dark:hover:border-gray-600"
                >
                  <div className="flex-shrink-0">
                    <LinkIcon className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="focus:outline-none">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {integration.integration_name.charAt(0).toUpperCase() +
                          integration.integration_name.slice(1)}
                      </p>
                      <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                        Connected on{" "}
                        {new Date(integration.created).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
