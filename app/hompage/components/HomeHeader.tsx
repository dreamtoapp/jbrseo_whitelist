import Image from "next/image";
import Link from "@/components/link";
import dynamic from "next/dynamic";
import { Zap, ArrowLeft, Users, User, Newspaper } from "lucide-react";
import { ThemeToggleWrapper } from "@/components/ThemeToggleWrapper";

const CountdownTimerDrawer = dynamic(
  () => import("./CountdownTimerDrawer").then((mod) => ({ default: mod.CountdownTimerDrawer })),
  {
    loading: () => (
      <div className="h-10 w-10 rounded-xl border border-foreground/10 bg-foreground/5" aria-hidden="true" />
    ),
  }
);

function getTargetDate() {
  const launchDateEnv = process.env.NEXT_PUBLIC_LAUNCH_DATE;
  if (launchDateEnv) {
    const parsedDate = new Date(launchDateEnv);
    if (!isNaN(parsedDate.getTime())) {
      return parsedDate;
    }
  }
  const date = new Date();
  date.setDate(date.getDate() + 7);
  return date;
}

function Badge() {
  return (
    <div className="hidden items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400 sm:flex" role="status" aria-label="مشروع سعودي - سجّل الآن للحصول على أولوية الوصول">
      <span className="relative flex h-1.5 w-1.5 shrink-0">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
      </span>
      <span>
        <span className="font-bold">مشروع سعودي</span>
        <span className="mx-1 opacity-60">—</span>
        <span className="hidden md:inline">سجّل الآن للحصول على أولوية الوصول</span>
      </span>
    </div>
  );
}

function Logo() {
  return (
    <Link
      href="/"
      aria-label="الانتقال إلى الصفحة الرئيسية"
      className="group flex items-center gap-3 transition-transform duration-300 hover:scale-[1.02]"
    >
      <div className="relative">
        <div className="absolute -inset-1 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 opacity-0 blur transition-opacity duration-300 group-hover:opacity-100" />
        <Image
          src="/assets/logo.png"
          alt="JBRseo Logo"
          width={40}
          height={60}
          className="relative h-10 w-10 rounded-xl border border-foreground/10 shadow-sm transition-shadow duration-300 group-hover:shadow-md"
          priority
        />
      </div>

    </Link>
  );
}




function NewsLink() {
  return (
    <Link
      href="/news"
      className="rounded-xl border border-foreground/10 bg-foreground/5 p-2.5 text-foreground/70 transition-all hover:bg-foreground/10 hover:text-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20"
      aria-label="الأخبار"
    >
      <Newspaper className="h-4 w-4" />
    </Link>
  );
}

function LoginLink() {
  return (
    <Link
      href="/signin"
      className="rounded-xl border border-foreground/10 bg-foreground/5 p-2.5 text-foreground/70 transition-all hover:bg-foreground/10 hover:text-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20"
      aria-label="تسجيل الدخول"
    >
      <User className="h-4 w-4" />
    </Link>
  );
}

function PrimaryCtaButton() {
  return (
    <Link
      href="#join"
      className="group relative hidden items-center gap-2 overflow-hidden rounded-full bg-foreground px-4 py-2.5 text-sm font-bold text-background shadow-lg shadow-foreground/10 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-foreground/20 sm:inline-flex sm:px-5"
      aria-label="الانتقال إلى قسم الانضمام للقائمة البيضاء"
    >
      {/* Shimmer effect */}
      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-background/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
      <Zap className="relative h-4 w-4" />
      <span className="relative hidden sm:inline">انضم مجاناً</span>
      <ArrowLeft className="relative h-4 w-4 transition-transform group-hover:-translate-x-1" />
    </Link>
  );
}

function HeaderActions() {
  const targetDate = getTargetDate();

  return (
    <div className="flex items-center gap-2 sm:gap-3">
      <CountdownTimerDrawer targetDate={targetDate} />
      <NewsLink />
      <ThemeToggleWrapper />
      <LoginLink />
      <PrimaryCtaButton />
    </div>
  );
}

export function HomeHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-foreground/5 bg-background/80 backdrop-blur-2xl backdrop-saturate-150" role="banner">
      <nav
        className="container mx-auto flex h-16 items-center justify-between gap-4 px-4 md:h-20"
        aria-label="التنقل الرئيسي"
        role="navigation"
      >
        <Logo />
        <Badge />
        <div className="flex-1" />
        <HeaderActions />
      </nav>
    </header>
  );
}

