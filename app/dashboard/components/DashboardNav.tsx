"use client";



import { usePathname } from "next/navigation";

import Link from "@/components/link";

import { Newspaper, Mail, Settings, Send } from "lucide-react";



const navItems = [

  {

    href: "/dashboard/news",

    label: "إدارة الأخبار",

    icon: Newspaper,

    description: "إنشاء وإدارة المنشورات",

  },

  {

    href: "/dashboard/otp-mail",

    label: "معاينة البريد",

    icon: Mail,

    description: "معاينة قوالب البريد الإلكتروني",

  },

  {

    href: "/dashboard/campaign",

    label: "حملة البريد",

    icon: Send,

    description: "إنشاء وإدارة حملات البريد الإلكتروني",

  },

  {

    href: "/dashboard/landing",

    label: "تكوين الصفحة الرئيسية",

    icon: Settings,

    description: "تكوين وإعدادات الصفحة الرئيسية",

  },

  {

    href: "/dashboard/settings",

    label: "إعدادات التطبيق",

    icon: Settings,

    description: "إعدادات عامة للتطبيق",

  },

];



export function DashboardNav() {

  const pathname = usePathname();



  const isActive = (href: string) => {

    if (href === "/dashboard") {

      return pathname === "/dashboard";

    }

    return pathname.startsWith(href);

  };



  return (

    <nav className="border-b border-foreground/10 bg-background/95 backdrop-blur-sm">

      <div className="container mx-auto px-4">

        <div className="flex h-16 flex-col justify-center gap-3 py-2 md:h-20 md:flex-row md:items-center md:justify-between">

          <div className="min-w-0 space-y-0.5">

            <h1 className="text-lg md:text-2xl font-bold leading-tight truncate">لوحة التحكم</h1>

            <p className="hidden text-xs text-foreground/60 md:block">

              إدارة الأخبار، البريد، الصفحة الرئيسية، وإعدادات التطبيق.

            </p>

          </div>



          <div className="mt-1 -mx-4 overflow-x-auto md:mt-0 md:mx-0">

            <div className="inline-flex min-w-full items-center gap-2 rounded-2xl border border-foreground/10 bg-foreground/5 px-2 py-1 md:gap-3">

              {navItems.map((item) => {

                const Icon = item.icon;

                const active = isActive(item.href);



                return (

                  <Link

                    key={item.href}

                    href={item.href}

                    aria-current={active ? "page" : undefined}

                    className={`

                      group relative flex items-center gap-1.5 md:gap-2 rounded-xl px-3 md:px-4 py-1.5 md:py-2

                      text-xs md:text-sm font-medium

                      transition-all duration-200 ease-in-out

                      ${active

                        ? "bg-foreground text-background shadow-sm border border-transparent"

                        : "text-foreground/70 hover:text-foreground hover:bg-background/60 border border-transparent"

                      }

                      focus:outline-none focus:ring-2 focus:ring-foreground/30 focus:ring-offset-0

                    `}

                    title={item.description}

                  >

                    <Icon

                      className={`h-4 w-4 md:h-5 md:w-5 transition-transform ${active ? "scale-110" : "group-hover:scale-110"

                        }`}

                    />

                    <span className="hidden sm:inline truncate">

                      {item.label}

                    </span>

                    {active && (

                      <span className="absolute inset-x-3 -bottom-1 h-0.5 rounded-full bg-background/70" />

                    )}

                  </Link>

                );

              })}

            </div>

          </div>

        </div>

      </div>

    </nav>

  );

}






















