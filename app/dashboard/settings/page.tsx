import { getAppSettings } from "../actions/app-settings";
import { AppSettingsForm } from "./AppSettingsForm";

export default async function AppSettingsPage() {
  const initialData = await getAppSettings();

  return (
    <main className="container mx-auto px-4 py-8 md:py-10">
      <div className="mx-auto flex max-w-5xl flex-col gap-6">
        <header className="space-y-2 rounded-2xl border border-foreground/10 bg-foreground/5 px-4 py-4 md:px-6 md:py-5">
          <h1 className="text-xl md:text-2xl font-bold tracking-tight">
            إعدادات التطبيق
          </h1>
          <p className="text-xs md:text-sm text-foreground/70">
            تحكّم بإعدادات التتبع والتحليلات العامة للتطبيق (GTM، Hotjar، Twitter / X).
          </p>
        </header>

        <AppSettingsForm initialData={initialData} />
      </div>
    </main>
  );
}







