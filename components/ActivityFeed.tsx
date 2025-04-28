import Image from "next/image";
import { ClockIcon, MapPinIcon } from "@heroicons/react/24/outline";

const activities = [
  {
    id: 1,
    title: "Morning Run",
    distance: "5.2 km",
    duration: "28:45",
    pace: "5:32 /km",
    date: "Today, 7:30 AM",
    location: "Central Park",
    app: "Strava",
    appLogo: "/strava.svg",
  },
  {
    id: 2,
    title: "Evening Jog",
    distance: "3.8 km",
    duration: "22:15",
    pace: "5:51 /km",
    date: "Yesterday, 6:45 PM",
    location: "Riverside Trail",
    app: "Garmin",
    appLogo: "/garmin.svg",
  },
  {
    id: 3,
    title: "Long Run",
    distance: "10.5 km",
    duration: "1:02:30",
    pace: "5:57 /km",
    date: "2 days ago, 8:00 AM",
    location: "Lake Loop",
    app: "Strava",
    appLogo: "/strava.svg",
  },
];

export default function ActivityFeed() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-xl font-semibold mb-6">Recent Activities</h3>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-start gap-4 p-4 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors"
          >
            <div className="relative w-8 h-8 mt-1">
              <Image
                src={activity.appLogo}
                alt={`${activity.app} logo`}
                fill
                className="object-contain"
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">{activity.title}</h4>
                <span className="text-sm text-gray-500">{activity.date}</span>
              </div>
              <div className="mt-1 flex items-center gap-4 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <ClockIcon className="w-4 h-4" />
                  {activity.duration}
                </span>
                <span>{activity.distance}</span>
                <span>{activity.pace}</span>
              </div>
              <div className="mt-1 flex items-center gap-1 text-sm text-gray-500">
                <MapPinIcon className="w-4 h-4" />
                {activity.location}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
