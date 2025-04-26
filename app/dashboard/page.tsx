import IntegrationCard from "@/components/IntegrationCard";
import ActivityFeed from "@/components/ActivityFeed";

export default function Dashboard() {
  return (
    <div className="space-y-10">
      <h2 className="text-3xl font-bold">Your Dashboard</h2>
      <IntegrationCard />
      <ActivityFeed />
    </div>
  );
}
