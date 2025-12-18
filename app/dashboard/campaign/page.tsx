import { DashboardNav } from "../components/DashboardNav";

export default function DashboardCampaignPage() {
  return (
    <div dir="rtl" className="min-h-screen bg-background text-foreground">
      <DashboardNav />
      <main className="container mx-auto px-4 py-10">
        <div className="max-w-4xl mx-auto space-y-6">
          <header className="space-y-2">
            <h1 className="text-2xl font-bold">حملة البريد</h1>
            <p className="text-sm text-foreground/70">
              إنشاء وإدارة حملات البريد الإلكتروني للمشتركين
            </p>
          </header>

          <div className="rounded-2xl border border-foreground/10 bg-foreground/[0.03] p-6">
            <p className="text-sm text-foreground/70 text-center">
              قريبًا: إدارة حملات البريد الإلكتروني
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}








