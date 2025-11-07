import { redirect } from "next/navigation";
import Link from "next/link";
import { checkAuth } from "@/helpers/auth";
import { getSubscribers, getSubscribersCount, getRecentSubscribers } from "@/actions/dashboard";
import { login, logout } from "@/actions/dashboard-auth";
import { Users, Mail, Globe, LogOut, ArrowRight, User, AtSign, Phone, Layout, Link2, Flag, MapPin, ShieldCheck, ShieldAlert, Settings, Calendar } from "lucide-react";
import { SubscriberActions } from "@/components/SubscriberActions";

type DashboardProps = {
  searchParams?: {
    error?: string;
  };
};

export default async function DashboardPage({ searchParams }: DashboardProps) {
  const isAuthenticated = await checkAuth();

  if (!isAuthenticated) {
    return (
      <div dir="rtl" className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="rounded-3xl border border-foreground/10 bg-foreground/[0.05] backdrop-blur-xl p-8">
            <h1 className="text-2xl font-bold mb-2">لوحة التحكم</h1>
            <p className="text-foreground/70 mb-6">أدخل كلمة المرور للوصول</p>

            <form action={login} className="space-y-4">
              <div className="grid gap-2">
                <label htmlFor="password" className="text-sm">كلمة المرور</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="h-11 rounded-xl bg-foreground/[0.05] border border-foreground/15 px-3 outline-none focus:ring-2 focus:ring-foreground/40"
                  autoFocus
                />
              </div>
              <button
                type="submit"
                className="w-full h-11 rounded-xl bg-foreground/20 hover:bg-foreground/30 text-foreground font-semibold shadow-lg focus:outline-none focus:ring-2 focus:ring-foreground/30"
              >
                تسجيل الدخول
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

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
  const uniqueSiteTypes = new Set(
    subscribers.map((subscriber) => subscriber.siteType).filter((value): value is string => Boolean(value))
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
  const siteTypeCounts = countByValue(subscribers.map((subscriber) => subscriber.siteType));

  return (
    <div dir="rtl" className="min-h-screen bg-background text-foreground">
      <header className="border-b border-foreground/10 bg-foreground/[0.02]">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">لوحة التحكم</h1>
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard/otp-mail"
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-foreground/10 bg-foreground/10 hover:bg-foreground/20 focus:outline-none focus:ring-2 focus:ring-foreground/30"
            >
              معاينة البريد
            </Link>
            <form action={logout}>
              <button
                type="submit"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-foreground/10 hover:bg-foreground/20 border border-foreground/10 focus:outline-none focus:ring-2 focus:ring-foreground/30"
              >
                <LogOut className="h-4 w-4" />
                تسجيل الخروج
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <details className="mb-8 rounded-2xl border border-foreground/10 bg-foreground/[0.03] p-4" open>
          <summary className="flex cursor-pointer items-center justify-between gap-3 text-sm font-semibold text-foreground">
            <span className="flex items-center gap-2">
              <Layout className="h-4 w-4 text-foreground/70" />
              لوحة التحليلات
            </span>
            <span className="text-xs text-foreground/60">إخفاء/إظهار المؤشرات</span>
          </summary>

          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-4">
          <div className="rounded-xl border border-foreground/10 bg-foreground/[0.04] p-4 text-center">
            <Users className="mx-auto mb-2 h-5 w-5 text-foreground/70" />
            <p className="text-2xl font-bold">{totalCount}</p>
            <p className="text-xs text-foreground/60 mt-1">إجمالي المشتركين</p>
          </div>

          <div className="rounded-xl border border-foreground/10 bg-foreground/[0.04] p-4 text-center">
            <ShieldCheck className="mx-auto mb-2 h-5 w-5 text-emerald-500" />
            <p className="text-2xl font-bold">{verifiedCount}</p>
            <p className="text-xs text-foreground/60 mt-1">مُتحقّق</p>
          </div>

          <div className="rounded-xl border border-foreground/10 bg-foreground/[0.04] p-4 text-center">
            <ShieldAlert className="mx-auto mb-2 h-5 w-5 text-amber-500" />
            <p className="text-2xl font-bold">{pendingCount}</p>
            <p className="text-xs text-foreground/60 mt-1">بانتظار التحقق</p>
          </div>

          <div className="rounded-xl border border-foreground/10 bg-foreground/[0.04] p-4 text-center">
            <Mail className="mx-auto mb-2 h-5 w-5 text-foreground/70" />
            <p className="text-2xl font-bold">
              {subscribers.filter((s) => {
                const today = new Date();
                const subDate = new Date(s.createdAt);
                return (
                  subDate.getDate() === today.getDate() &&
                  subDate.getMonth() === today.getMonth() &&
                  subDate.getFullYear() === today.getFullYear()
                );
              }).length}
            </p>
            <p className="text-xs text-foreground/60 mt-1">مشتركين اليوم</p>
          </div>

          <div className="rounded-xl border border-foreground/10 bg-foreground/[0.04] p-4 text-center">
            <Flag className="mx-auto mb-2 h-5 w-5 text-foreground/70" />
            <p className="text-2xl font-bold">{uniqueCountries}</p>
            <p className="text-xs text-foreground/60 mt-1">الدول</p>
            {countryCounts.length > 0 && (
              <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
                {countryCounts.slice(0, 4).map(([country, count]) => (
                  <span
                    key={country}
                    className="inline-flex items-center gap-2 rounded-full bg-foreground/10 px-2.5 py-1 text-[11px] text-foreground"
                  >
                    <span>{country}</span>
                    <span className="rounded-full bg-foreground/15 px-2 py-0.5 text-[10px] font-semibold">{count}</span>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="rounded-xl border border-foreground/10 bg-foreground/[0.04] p-4 text-center">
            <MapPin className="mx-auto mb-2 h-5 w-5 text-foreground/70" />
            <p className="text-2xl font-bold">{uniqueCities}</p>
            <p className="text-xs text-foreground/60 mt-1">المدن</p>
            {cityCounts.length > 0 && (
              <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
                {cityCounts.slice(0, 4).map(([city, count]) => (
                  <span
                    key={city}
                    className="inline-flex items-center gap-2 rounded-full bg-foreground/10 px-2.5 py-1 text-[11px] text-foreground"
                  >
                    <span>{city}</span>
                    <span className="rounded-full bg-foreground/15 px-2 py-0.5 text-[10px] font-semibold">{count}</span>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="rounded-xl border border-foreground/10 bg-foreground/[0.04] p-4 text-center">
            <Layout className="mx-auto mb-2 h-5 w-5 text-foreground/70" />
            <p className="text-2xl font-bold">{uniqueSiteTypes}</p>
            <p className="text-xs text-foreground/60 mt-1">أنواع المواقع</p>
            {siteTypeCounts.length > 0 && (
              <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
                {siteTypeCounts.slice(0, 4).map(([type, count]) => (
                  <span
                    key={type}
                    className="inline-flex items-center gap-2 rounded-full bg-foreground/10 px-2.5 py-1 text-[11px] text-foreground"
                  >
                    <span>{type}</span>
                    <span className="rounded-full bg-foreground/15 px-2 py-0.5 text-[10px] font-semibold">{count}</span>
                  </span>
                ))}
              </div>
            )}
          </div>
          </div>
        </details>

        <div className="rounded-2xl border border-foreground/10 bg-foreground/[0.05] overflow-hidden">
          <div className="p-6 border-b border-foreground/10">
            <h2 className="text-xl font-bold">قائمة المشتركين</h2>
            <p className="text-sm text-foreground/70 mt-1">جميع المشتركين في القائمة البيضاء</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-foreground/[0.02] border-b border-foreground/10">
                <tr>
                  <th className="text-right p-4 text-sm font-semibold">الاسم</th>
                  <th className="text-right p-4 text-sm font-semibold">البريد الإلكتروني</th>
                  <th className="text-right p-4 text-sm font-semibold">الجوال</th>
                  <th className="text-right p-4 text-sm font-semibold">نوع الموقع</th>
                  <th className="text-right p-4 text-sm font-semibold">رابط الموقع</th>
                  <th className="text-right p-4 text-sm font-semibold">البلد</th>
                  <th className="text-right p-4 text-sm font-semibold">المدينة</th>
                  <th className="text-right p-4 text-sm font-semibold">الحالة</th>
                  <th className="text-right p-4 text-sm font-semibold">إجراءات</th>
                  <th className="text-right p-4 text-sm font-semibold">تاريخ التسجيل</th>
                </tr>
              </thead>
              <tbody>
                {subscribers.length === 0 ? (
                  <tr>
                    <td colSpan={10} className="p-8 text-center text-foreground/60">
                      لا يوجد مشتركين حتى الآن
                    </td>
                  </tr>
                ) : (
                  subscribers.map((subscriber) => (
                    <tr key={subscriber.id} className="border-b border-foreground/5 hover:bg-foreground/[0.02]">
                      <td className="p-4"><span className="block truncate max-w-[160px]">{subscriber.name || "—"}</span></td>
                      <td className="p-4">{subscriber.email}</td>
                      <td className="p-4">{subscriber.phone || "—"}</td>
                      <td className="p-4">{subscriber.siteType || "—"}</td>
                      <td className="p-4">
                        {subscriber.siteUrl ? (
                          <a
                            href={subscriber.siteUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:text-blue-300 underline flex items-center gap-1"
                          >
                            <span className="truncate max-w-[200px]">{subscriber.siteUrl}</span>
                            <ArrowRight className="h-3 w-3" />
                          </a>
                        ) : (
                          "—"
                        )}
                      </td>
                      <td className="p-4">{subscriber.country || "—"}</td>
                      <td className="p-4">{subscriber.city || "—"}</td>
                      <td className="p-4 text-sm text-center">
                        {subscriber.verified ? (
                          <ShieldCheck className="mx-auto h-4 w-4 text-emerald-500" aria-hidden="true" />
                        ) : (
                          <ShieldAlert className="mx-auto h-4 w-4 text-amber-500" aria-hidden="true" />
                        )}
                      </td>
                      <td className="p-4 text-sm">
                        <SubscriberActions subscriber={subscriber} />
                      </td>
                      <td className="p-4 text-sm text-foreground/70">{formatDate(subscriber.createdAt)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

