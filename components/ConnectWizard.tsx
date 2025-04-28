"use client";
import React, { useState } from "react";
import Image from "next/image";

const INTEGRATIONS = [
  {
    key: "strava",
    name: "Strava",
    logo: "/strava.svg",
    description: "Sync your activities with Strava.",
  },
  {
    key: "garmin",
    name: "Garmin",
    logo: "/garmin.svg",
    description: "Sync your activities with Garmin.",
  },
  {
    key: "nike",
    name: "Nike Run Club",
    logo: "/nike.svg",
    description: "Sync your activities with Nike Run Club.",
  },
  {
    key: "adidas",
    name: "Adidas Running",
    logo: "/adidas.svg",
    description: "Sync your activities with Adidas Running.",
  },
];

const ACTIVITY_TYPES = ["Run", "Ride", "Walk", "Swim"];

export default function ConnectWizard() {
  const [configuring, setConfiguring] = useState(null as string | null);
  const [connected, setConnected] = useState<{ [key: string]: boolean }>({});
  const [selectedActivities, setSelectedActivities] = useState<string[]>([
    "Run",
  ]);
  const [integrationMethod, setIntegrationMethod] = useState("api");

  const startConfig = (key: string) => {
    setConfiguring(key);
    setSelectedActivities(["Run"]);
    setIntegrationMethod("api");
  };

  const handleActivityChange = (activity: string) => {
    setSelectedActivities((prev) =>
      prev.includes(activity)
        ? prev.filter((a) => a !== activity)
        : [...prev, activity]
    );
  };

  const handleConnect = () => {
    if (configuring) {
      setConnected((prev) => ({ ...prev, [configuring]: true }));
      setConfiguring(null);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 text-center max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Connect Your Apps</h2>
      <p className="text-gray-600 mb-6">
        Start syncing your runs by connecting your favorite fitness platforms.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {INTEGRATIONS.map((integration) => (
          <div
            key={integration.key}
            className="border rounded-lg p-4 flex flex-col items-center shadow-sm relative"
          >
            <Image
              src={integration.logo}
              alt={integration.name + " logo"}
              width={48}
              height={48}
            />
            <h3 className="mt-2 text-lg font-semibold">{integration.name}</h3>
            <p className="text-gray-500 text-sm mt-1 mb-4">
              {integration.description}
            </p>
            {connected[integration.key] ? (
              <span className="text-green-600 font-medium">Connected!</span>
            ) : configuring === integration.key ? (
              <div className="w-full mt-2 text-left">
                <div className="mb-2 font-medium">Activity Types:</div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {ACTIVITY_TYPES.map((type) => (
                    <label
                      key={type}
                      className="flex items-center gap-1 text-sm"
                    >
                      <input
                        type="checkbox"
                        checked={selectedActivities.includes(type)}
                        onChange={() => handleActivityChange(type)}
                        className="accent-orange-500"
                      />
                      {type}
                    </label>
                  ))}
                </div>
                <div className="mb-2 font-medium">Integration Method:</div>
                <div className="flex gap-4 mb-4">
                  <label className="flex items-center gap-1 text-sm">
                    <input
                      type="radio"
                      name="integration-method"
                      value="api"
                      checked={integrationMethod === "api"}
                      onChange={() => setIntegrationMethod("api")}
                      className="accent-orange-500"
                    />
                    API
                  </label>
                  <label className="flex items-center gap-1 text-sm">
                    <input
                      type="radio"
                      name="integration-method"
                      value="webhook"
                      checked={integrationMethod === "webhook"}
                      onChange={() => setIntegrationMethod("webhook")}
                      className="accent-orange-500"
                    />
                    Webhook
                  </label>
                </div>
                <button
                  onClick={handleConnect}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full font-medium transition"
                >
                  Confirm & Connect
                </button>
                <button
                  onClick={() => setConfiguring(null)}
                  className="w-full mt-2 text-gray-500 hover:text-gray-700 text-sm"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => startConfig(integration.key)}
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full font-medium transition"
              >
                Connect
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
