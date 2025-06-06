"use client";

import { useEffect, useState } from "react";
import { api } from "../utils/api";
import type { ConnectResponse, Integration } from "../types/integration";
import Image from "next/image";

export default function DashboardPage() {
  const [integrations, setIntegrations] = useState<Integration[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [connectingIds, setConnectingIds] = useState<Set<string>>(new Set());
  const [connectErrors, setConnectErrors] = useState<Record<string, string>>(
    {}
  );

  useEffect(() => {
    const fetchIntegrations = async () => {
      try {
        const response = await api.get<Integration[]>("/integrations/apps");

        if (response.error) {
          setError(response.error);
          return;
        }

        if (response.data) {
          // Get unique integrations by name
          const uniqueIntegrations = response.data.reduce((acc, curr) => {
            if (!acc.find((item) => item.name === curr.name)) {
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

  const handleConnect = async (integration: Integration) => {
    // Add to connecting state
    setConnectingIds((prev) => new Set([...prev, integration.name]));
    // Clear any previous errors for this integration
    setConnectErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[integration.name];
      return newErrors;
    });

    try {
      const response = await api.get<ConnectResponse>(integration.connect_url);

      if (response.error) {
        throw new Error(`Failed to connect: ${response.error}`);
      }

      if (!response.data) {
        throw new Error("No redirect URL received from the server");
      }

      // Redirect to OAuth provider
      window.location.href = response.data.redirect_url;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to initiate connection";

      // Set error for this specific integration
      setConnectErrors((prev) => ({
        ...prev,
        [integration.name]: errorMessage,
      }));

      console.error("Connection error:", err);
    } finally {
      // Remove from connecting state
      setConnectingIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(integration.name);
        return newSet;
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Connected Integrations */}
      <div className="mt-8">
        <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
          Supported Apps
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
          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {integrations.map((integration) => {
              const isConnecting = connectingIds.has(integration.name);
              const connectionError = connectErrors[integration.name];

              return (
                <div
                  key={integration.name}
                  className="relative aspect-square rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-slate-800 p-4 shadow-sm hover:border-gray-400 dark:hover:border-gray-600 transition-colors duration-200 flex flex-col items-center justify-between"
                >
                  <div className="flex flex-col items-center flex-1 justify-center">
                    <div className="flex-shrink-0 mb-3">
                      <Image
                        src={`/thirdparty/${integration.name}.svg`}
                        alt={integration.name}
                        width={48}
                        height={48}
                        className="w-12 h-12"
                      />
                    </div>
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white text-center">
                      {integration.name.charAt(0).toUpperCase() +
                        integration.name.slice(1)}
                    </h3>
                  </div>
                  <div className="mt-2 text-center">
                    {integration.status === "not_connected" ? (
                      <div className="flex flex-col items-center space-y-1">
                        <button
                          onClick={() => handleConnect(integration)}
                          disabled={isConnecting}
                          className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border border-indigo-200 text-indigo-700 bg-indigo-50 hover:bg-indigo-100 hover:border-indigo-300 dark:border-indigo-800 dark:text-indigo-300 dark:bg-indigo-900/20 dark:hover:bg-indigo-900/30 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isConnecting ? (
                            <>
                              <svg
                                className="animate-spin -ml-1 mr-2 h-3 w-3 text-current"
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
                              Connecting...
                            </>
                          ) : (
                            "Connect"
                          )}
                        </button>
                        {connectionError && (
                          <div
                            className="text-xs text-red-600 dark:text-red-400 mt-1 max-w-full truncate"
                            title={connectionError}
                          >
                            Connection failed
                          </div>
                        )}
                      </div>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                        Connected
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
