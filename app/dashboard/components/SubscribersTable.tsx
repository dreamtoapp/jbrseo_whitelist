import { ShieldAlert, ShieldCheck } from "lucide-react";
import { SubscriberActions } from "./SubscriberActions";

type SubscriberRow = {
  id: string;
  name: string;
  email: string;
  mobile: string | null;
  brandName: string;
  country: string | null;
  city: string | null;
  verified?: boolean;
  createdAt: Date;
};

type Props = {
  subscribers: SubscriberRow[];
  formatDate: (date: Date) => string;
};

export function SubscribersTable({ subscribers, formatDate }: Props) {
  return (
    <div className="rounded-2xl border border-foreground/10 bg-foreground/[0.05] overflow-hidden">
      <div className="p-6 border-b border-foreground/10">
        <h2 className="text-xl font-bold">قائمة المشتركين</h2>
        <p className="text-sm text-foreground/70 mt-1">جميع المشتركين في القائمة البيضاء</p>
      </div>

      <div className="md:hidden p-4 space-y-4">
        {subscribers.length === 0 ? (
          <p className="text-center text-foreground/60">لا يوجد مشتركين حتى الآن</p>
        ) : (
          subscribers.map((subscriber) => (
            <article
              key={subscriber.id}
              className="space-y-3 rounded-2xl border border-foreground/10 bg-background p-4 shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-base font-semibold truncate">
                    {subscriber.name || "—"}
                  </p>
                  <p className="text-sm text-foreground/70 break-all">{subscriber.email}</p>
                </div>
                <span className="shrink-0">
                  {subscriber.verified ? (
                    <ShieldCheck className="h-4 w-4 text-emerald-500" aria-hidden="true" />
                  ) : (
                    <ShieldAlert className="h-4 w-4 text-amber-500" aria-hidden="true" />
                  )}
                </span>
              </div>

              <dl className="grid grid-cols-2 gap-3 text-xs text-foreground/70">
                <div>
                  <dt className="font-semibold text-foreground">الجوال</dt>
                  <dd>{subscriber.mobile || "—"}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-foreground">العلامة</dt>
                  <dd>{subscriber.brandName}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-foreground">الدولة</dt>
                  <dd>{subscriber.country || "—"}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-foreground">المدينة</dt>
                  <dd>{subscriber.city || "—"}</dd>
                </div>
              </dl>

              <div className="flex items-center justify-between gap-3">
                <span className="text-xs text-foreground/60">
                  {formatDate(subscriber.createdAt)}
                </span>
                <SubscriberActions subscriber={subscriber} />
              </div>
            </article>
          ))
        )}
      </div>

      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-foreground/[0.02] border-b border-foreground/10">
            <tr>
              <th className="text-right p-4 text-sm font-semibold">الاسم</th>
              <th className="text-right p-4 text-sm font-semibold">البريد الإلكتروني</th>
              <th className="text-right p-4 text-sm font-semibold">الجوال</th>
              <th className="text-right p-4 text-sm font-semibold">العلامة التجارية</th>
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
                <td colSpan={9} className="p-8 text-center text-foreground/60">
                  لا يوجد مشتركين حتى الآن
                </td>
              </tr>
            ) : (
              subscribers.map((subscriber) => (
                <tr key={subscriber.id} className="border-b border-foreground/5 hover:bg-foreground/[0.02]">
                  <td className="p-4"><span className="block truncate max-w-[160px]">{subscriber.name || "—"}</span></td>
                  <td className="p-4">{subscriber.email}</td>
                  <td className="p-4">{subscriber.mobile || "—"}</td>
                  <td className="p-4"><span className="block truncate max-w-[200px]">{subscriber.brandName}</span></td>
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
  );
}

