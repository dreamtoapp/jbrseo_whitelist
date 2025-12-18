import { DashboardNav } from "../components/DashboardNav";
import { getHomePageConfig } from "../actions/homepage-config";
import { HomePageConfigForm } from "./HomePageConfigForm";

export default async function DashboardLandingPage() {
  const initialData = await getHomePageConfig();

  return (
    <div dir="rtl" className="min-h-screen bg-background text-foreground">
      <DashboardNav />
      <main className="container mx-auto px-4 py-8 md:py-10">
        <div className="mx-auto flex max-w-5xl flex-col gap-6">
          <header className="space-y-2 rounded-2xl border border-foreground/10 bg-foreground/5 px-4 py-4 md:px-6 md:py-5">
            <h1 className="text-xl md:text-2xl font-bold tracking-tight">
              تكوين الصفحة الرئيسية
            </h1>
            <p className="text-xs md:text-sm text-foreground/70">
              عدّل محتوى الهيرو، صورة الغلاف، نصوص الانضمام، التذييل، وروابط القنوات الاجتماعية كما سيظهر
              للزوار على jbrseo.com.
            </p>
          </header>

          <HomePageConfigForm initialData={initialData} />
        </div>
      </main>
    </div>
  );
}
