import { getSubscribers, getSubscribersCount, getRecentSubscribers } from "./actions/dashboard";
import { DashboardAnalytics } from "./components/DashboardAnalytics";
import { SubscribersTable } from "./components/SubscribersTable";
import { DashboardNav } from "./components/DashboardNav";

type DashboardProps = {
  searchParams?: {
    error?: string;
  };
};

export default async function DashboardPage({ searchParams }: DashboardProps) {
  const [subscribers, totalCount, recentSubscribers] = await Promise.all([
    getSubscribers(),
    getSubscribersCount(),
    getRecentSubscribers(5),
  ]);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("ar-SA", {
      dateStyle: "short",
      timeStyle: "short",
      hour12: false,
    }).format(date);
  };

  const verifiedCount = subscribers.filter((subscriber) => subscriber.verified).length;
  const pendingCount = totalCount - verifiedCount;
  const uniqueCountries = new Set(
    subscribers.map((subscriber) => subscriber.country).filter((value): value is string => Boolean(value))
  ).size;
  const uniqueCities = new Set(
    subscribers.map((subscriber) => subscriber.city).filter((value): value is string => Boolean(value))
  ).size;
  const uniqueBrands = new Set(
    subscribers.map((subscriber) => subscriber.brandName).filter((value): value is string => Boolean(value))
  ).size;

  const countByValue = (values: Array<string | null | undefined>) => {
    const counts = new Map<string, number>();
    for (const value of values) {
      if (!value) continue;
      counts.set(value, (counts.get(value) ?? 0) + 1);
    }
    return Array.from(counts.entries()).sort((a, b) => b[1] - a[1]);
  };

  const countryCounts = countByValue(subscribers.map((subscriber) => subscriber.country));
  const cityCounts = countByValue(subscribers.map((subscriber) => subscriber.city));
  const brandCounts = countByValue(subscribers.map((subscriber) => subscriber.brandName));
  const todayCount = subscribers.filter((s) => {
    const today = new Date();
    const subDate = new Date(s.createdAt);
    return (
      subDate.getDate() === today.getDate() &&
      subDate.getMonth() === today.getMonth() &&
      subDate.getFullYear() === today.getFullYear()
    );
  }).length;

  return (
    <div dir="rtl" className="min-h-screen bg-background text-foreground">
      <DashboardNav />

      <main className="container mx-auto px-4 py-8">
        <DashboardAnalytics
          totalCount={totalCount}
          verifiedCount={verifiedCount}
          pendingCount={pendingCount}
          todayCount={todayCount}
          uniqueCountries={uniqueCountries}
          uniqueCities={uniqueCities}
          uniqueBrands={uniqueBrands}
          countryCounts={countryCounts}
          cityCounts={cityCounts}
          brandCounts={brandCounts}
        />

        <SubscribersTable subscribers={subscribers} formatDate={formatDate} />
      </main>
    </div>
  );
}

