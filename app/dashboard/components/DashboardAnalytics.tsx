import { Users, Mail, Layout, Flag, MapPin, ShieldCheck, ShieldAlert } from "lucide-react";

type Props = {
  totalCount: number;
  verifiedCount: number;
  pendingCount: number;
  todayCount: number;
  uniqueCountries: number;
  uniqueCities: number;
  uniqueBrands: number;
  countryCounts: Array<[string, number]>;
  cityCounts: Array<[string, number]>;
  brandCounts: Array<[string, number]>;
};

export function DashboardAnalytics({
  totalCount,
  verifiedCount,
  pendingCount,
  todayCount,
  uniqueCountries,
  uniqueCities,
  uniqueBrands,
  countryCounts,
  cityCounts,
  brandCounts,
}: Props) {
  return (
    <details className="mb-8 rounded-2xl border border-foreground/10 bg-foreground/[0.03] p-4">
      <summary className="flex cursor-pointer items-center justify-between gap-3 text-sm font-semibold text-foreground">
        <span className="flex items-center gap-2">
          <Layout className="h-4 w-4 text-foreground/70" />
          لوحة التحليلات
        </span>
        <span className="text-xs text-foreground/60">إخفاء/إظهار المؤشرات</span>
      </summary>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
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
          <p className="text-2xl font-bold">{todayCount}</p>
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
          <p className="text-2xl font-bold">{uniqueBrands}</p>
          <p className="text-xs text-foreground/60 mt-1">العلامات التجارية</p>
          {brandCounts.length > 0 && (
            <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
              {brandCounts.slice(0, 4).map(([brand, count]) => (
                <span
                  key={brand}
                  className="inline-flex items-center gap-2 rounded-full bg-foreground/10 px-2.5 py-1 text-[11px] text-foreground"
                >
                  <span>{brand}</span>
                  <span className="rounded-full bg-foreground/15 px-2 py-0.5 text-[10px] font-semibold">{count}</span>
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </details>
  );
}

