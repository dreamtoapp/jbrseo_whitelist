import type { ReactNode } from "react";
import { DashboardNav } from "./components/DashboardNav";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div dir="rtl" className="min-h-screen bg-background text-foreground">
      <DashboardNav />
      {children}
      <footer className="mt-8 border-t border-foreground/10 bg-background/95">
        <div className="container mx-auto px-4 py-4 text-xs text-foreground/60 flex items-center justify-between gap-2 flex-col md:flex-row">
          <span>© 2025 — لوحة تحكم JBRseo.</span>
          <span className="text-[11px]">
            هذه المنطقة مخصصة لإدارة المحتوى والإعدادات الداخلية للمشروع.
          </span>
        </div>
      </footer>
    </div>
  );
}




