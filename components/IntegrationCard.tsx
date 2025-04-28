import Image from "next/image";
import Link from "next/link";

const integrations = [
  {
    name: "Strava",
    logo: "/strava.svg",
    status: "connected",
    lastSync: "2 hours ago",
  },
  {
    name: "Garmin",
    logo: "/garmin.svg",
    status: "connected",
    lastSync: "1 hour ago",
  },
  {
    name: "Nike Run Club",
    logo: "/nike.svg",
    status: "disconnected",
    lastSync: "Never",
  },
  {
    name: "Adidas Running",
    logo: "/adidas.svg",
    status: "disconnected",
    lastSync: "Never",
  },
];

export default function IntegrationCard() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold">Connected Apps</h3>
        <Link
          href="/connect"
          className="text-sm text-orange-500 hover:text-orange-600 transition-colors"
        >
          Manage Connections
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {integrations.map((integration) => (
          <div
            key={integration.name}
            className="flex items-center gap-4 p-4 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors"
          >
            <div className="relative w-10 h-10">
              <Image
                src={integration.logo}
                alt={`${integration.name} logo`}
                fill
                className="object-contain"
              />
            </div>
            <div>
              <p className="font-medium">{integration.name}</p>
              <p
                className={`text-sm ${
                  integration.status === "connected"
                    ? "text-green-600"
                    : "text-gray-500"
                }`}
              >
                {integration.status === "connected"
                  ? `Last synced ${integration.lastSync}`
                  : "Not connected"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
