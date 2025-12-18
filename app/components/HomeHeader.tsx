"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Zap, ArrowLeft, Users, Moon, Sun, User } from "lucide-react";

export function HomeHeader() {
  const [mounted, setMounted] = useState(false);
  const [liveUsers, setLiveUsers] = useState(12);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    // Random initial value between 8-20
    setLiveUsers(Math.floor(Math.random() * 13) + 8);

    // Update randomly every 5-10 seconds
    const interval = setInterval(() => {
      setLiveUsers(Math.floor(Math.random() * 13) + 8);
    }, Math.random() * 5000 + 5000);

    return () => clearInterval(interval);
  }, []);

  const isDark = resolvedTheme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-foreground/5 bg-background/80 backdrop-blur-2xl backdrop-saturate-150">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <a href="#" className="group flex items-center gap-3 transition-transform duration-300 hover:scale-[1.02]">
          <div className="relative">
            <div className="absolute -inset-1 rounded-xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 opacity-0 blur transition-opacity duration-300 group-hover:opacity-100" />
            <Image
              src="/assets/logo.png"
              alt="JBRseo Logo"
              width={40}
              height={40}
              className="relative h-10 w-10 rounded-xl border border-foreground/10 shadow-sm transition-shadow duration-300 group-hover:shadow-md"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight">JBRseo</span>
            <span className="hidden text-[10px] font-medium text-foreground/50 sm:block">حلول رقمية سعودية</span>
          </div>
        </a>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Live users indicator - desktop only */}
          <div className="hidden items-center gap-2 rounded-full border border-foreground/10 bg-foreground/5 px-3 py-1.5 text-xs font-medium text-foreground/70 lg:flex">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span>{liveUsers} يتصفحون الآن</span>
          </div>

          {/* Social Proof Badge - tablet+ */}
          <div className="hidden items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 md:flex">
            <Users className="h-3.5 w-3.5" />
            <span>+500 عضو</span>
          </div>

          {/* Theme Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            className="rounded-xl border border-foreground/10 bg-foreground/5 p-2.5 text-foreground/70 transition-all hover:bg-foreground/10 hover:text-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20"
            aria-label={mounted && isDark ? "تفعيل الوضع الفاتح" : "تفعيل الوضع الداكن"}
          >
            {mounted ? (
              isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />
            ) : (
              <span className="h-4 w-4" />
            )}
          </button>

          {/* Login Link */}
          <Link
            href="/signin"
            className="rounded-xl border border-foreground/10 bg-foreground/5 p-2.5 text-foreground/70 transition-all hover:bg-foreground/10 hover:text-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20"
            aria-label="تسجيل الدخول"
          >
            <User className="h-4 w-4" />
          </Link>

          {/* CTA Button */}
          <a
            href="#join"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-foreground px-4 py-2.5 text-sm font-bold text-background shadow-lg shadow-foreground/10 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-foreground/20 sm:px-5"
          >
            {/* Shimmer effect */}
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            <Zap className="relative h-4 w-4" />
            <span className="relative hidden sm:inline">انضم مجاناً</span>
            <ArrowLeft className="relative h-4 w-4 transition-transform group-hover:-translate-x-1" />
          </a>
        </div>
      </div>
    </header>
  );
}
