"use client";

import { useState, useEffect, useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "@/components/link";
import Image from "next/image";
import { ChevronRight, Menu, Moon, Sun, X, LayoutDashboard, Newspaper, LogOut, User } from "lucide-react";
import { useTheme } from "next-themes";
import { logout } from "@/app/hompage/actions/auth";

type NavbarProps = {
  session: {
    user: {
      id: string;
      role: "ADMIN" | "CLIENT";
      email?: string | null;
      name?: string | null;
    };
  } | null;
};

export function Navbar({ session }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    // Close mobile menu when navigating to a new page
    // This is a legitimate side effect of route changes
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  useLayoutEffect(() => {
    // Track mount state to prevent hydration mismatch with theme
    // This pattern is necessary to avoid SSR/client mismatch when rendering theme-dependent icons
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const isActive = (path: string) => pathname === path || pathname.startsWith(path + "/");
  const isInDashboard = pathname.startsWith("/dashboard");
  const isDark = resolvedTheme === "dark";

  // Hide global navbar on homepage and dashboard - they have their own headers
  if (pathname === "/" || isInDashboard) {
    return null;
  }

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  const handleSignOut = async () => {
    await logout();
  };

  return (
    <header className="sticky top-0 z-50 border-b border-foreground/10 bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/80 shadow-sm">
      <nav aria-label="التنقل الرئيسي" className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between md:h-20">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <Link
              href="/"
              aria-label="الصفحة الرئيسية"
              className="flex items-center gap-3 min-w-0 group"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-900 shadow-lg border border-slate-700 group-hover:border-slate-600 transition-colors">
                <Image
                  src="/assets/logo.png"
                  alt="شعار المشروع"
                  width={32}
                  height={32}
                  className="h-6 w-6 object-contain"
                  priority
                />
              </div>
              <span className="text-sm sm:text-base font-semibold tracking-tight truncate group-hover:text-foreground/90 transition-colors">
                مشروع سعودي — نسخة ما قبل الإطلاق
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-2 lg:gap-3">
            <button
              type="button"
              onClick={toggleTheme}
              className="rounded-xl bg-foreground/5 hover:bg-foreground/10 border border-foreground/10 p-2 inline-flex items-center justify-center transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-foreground/30 text-foreground/80"
              aria-label={
                mounted && isDark ? "تفعيل الوضع الفاتح" : "تفعيل الوضع الداكن"
              }
            >
              {mounted ? (
                isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />
              ) : (
                <span className="h-5 w-5" />
              )}
            </button>
            <Link
              href="/news"
              className={`rounded-xl px-4 py-2 inline-flex items-center gap-2 text-sm font-medium transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-foreground/30 ${isActive("/news")
                ? "bg-foreground/20 text-foreground border border-foreground/20"
                : "bg-foreground/10 hover:bg-foreground/20 border border-foreground/10"
                }`}
            >
              <Newspaper className="h-4 w-4" />
              <span>آخر الأخبار</span>
            </Link>
            {!session ? (
              <>
                <Link
                  href="/#join"
                  className="group rounded-xl bg-foreground/10 hover:bg-foreground/20 border border-foreground/10 px-4 py-2 inline-flex items-center gap-2 text-sm font-medium transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-foreground/30"
                  aria-label="انتقل إلى نموذج الانضمام"
                >
                  <span>انضم مبكرًا واحجز مكانك</span>
                  <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-[-2px]" />
                </Link>
                <Link
                  href="/signin"
                  className="rounded-xl bg-foreground/10 hover:bg-foreground/20 border border-foreground/10 p-2 inline-flex items-center justify-center transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-foreground/30"
                  aria-label="تسجيل الدخول"
                >
                  <User className="h-5 w-5" />
                </Link>
              </>
            ) : (
              <>
                {session.user.role === "ADMIN" && !isInDashboard && (
                  <Link
                    href="/dashboard"
                    className={`rounded-xl px-4 py-2 inline-flex items-center gap-2 text-sm font-medium transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-foreground/30 ${isActive("/dashboard")
                      ? "bg-foreground/20 text-foreground border border-foreground/20"
                      : "bg-foreground/10 hover:bg-foreground/20 border border-foreground/10"
                      }`}
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    <span>لوحة التحكم</span>
                  </Link>
                )}
                <div className="h-6 w-px bg-foreground/20 mx-1" aria-hidden="true" />
                <button
                  onClick={handleSignOut}
                  className="rounded-xl bg-foreground/10 hover:bg-foreground/20 border border-foreground/10 p-2 inline-flex items-center justify-center transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-foreground/30 text-foreground/80 hover:text-foreground"
                  aria-label="تسجيل الخروج"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </>
            )}
          </div>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden rounded-xl p-2 text-foreground hover:bg-foreground/10 transition-colors focus:outline-none focus:ring-2 focus:ring-foreground/30"
            aria-label={isMobileMenuOpen ? "إغلاق القائمة" : "فتح القائمة"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-foreground/10 bg-background/98 backdrop-blur-md">
            <div className="py-4 space-y-2">
              <button
                type="button"
                onClick={toggleTheme}
                className="flex items-center justify-center rounded-xl bg-foreground/10 hover:bg-foreground/20 border border-foreground/10 px-4 py-3 text-sm font-medium transition-colors"
              >
                {mounted ? (
                  isDark ? (
                    <>
                      <Sun className="h-4 w-4 ml-2" />
                      الوضع الفاتح
                    </>
                  ) : (
                    <>
                      <Moon className="h-4 w-4 ml-2" />
                      الوضع الداكن
                    </>
                  )
                ) : (
                  <span className="h-4 w-4" />
                )}
              </button>
              <Link
                href="/news"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${isActive("/news")
                  ? "bg-foreground/20 text-foreground"
                  : "bg-foreground/10 hover:bg-foreground/20"
                  }`}
              >
                <Newspaper className="h-4 w-4" />
                <span>آخر الأخبار</span>
              </Link>
              {!session ? (
                <>
                  <Link
                    href="/#join"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between rounded-xl bg-foreground/10 hover:bg-foreground/20 border border-foreground/10 px-4 py-3 text-sm font-medium transition-colors"
                  >
                    <span>انضم مبكرًا واحجز مكانك</span>
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/signin"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-center rounded-xl bg-foreground/10 hover:bg-foreground/20 border border-foreground/10 p-3 transition-colors"
                    aria-label="تسجيل الدخول"
                  >
                    <User className="h-5 w-5" />
                  </Link>
                </>
              ) : (
                <>
                  {session.user.role === "ADMIN" && !isInDashboard && (
                    <Link
                      href="/dashboard"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${isActive("/dashboard")
                        ? "bg-foreground/20 text-foreground"
                        : "bg-foreground/10 hover:bg-foreground/20"
                        }`}
                    >
                      <LayoutDashboard className="h-4 w-4" />
                      <span>لوحة التحكم</span>
                    </Link>
                  )}
                  <div className="h-px bg-foreground/10 my-2" aria-hidden="true" />
                  <button
                    onClick={handleSignOut}
                    className="flex w-full items-center justify-center rounded-xl bg-foreground/10 hover:bg-foreground/20 border border-foreground/10 p-3 transition-colors text-foreground/80"
                    aria-label="تسجيل الخروج"
                  >
                    <LogOut className="h-5 w-5" />
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
















