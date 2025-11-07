import Image from "next/image";
import { CheckCircle2, Sparkles, Shield, BellRing, ChevronRight } from "lucide-react";
import Script from "next/script";
import { WhitelistForm } from "@/components/WhitelistForm";

export default function Home() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://jbrseo.com";
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}#organization`,
        name: "JBRseo",
        url: siteUrl,
        logo: `${siteUrl}/assets/logo.png`,
        foundingLocation: "Saudi Arabia",
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}#website`,
        url: siteUrl,
        name: "JBRseo",
        inLanguage: "ar",
        description:
          "JBRseo منصة سعودية تمنحك حضورًا رقميًا متكاملًا، من الفكرة إلى الإطلاق، مع تجربة حصرية مخصصة لأوائل المنضمين.",
        publisher: {
          "@id": `${siteUrl}#organization`,
        },
      },
    ],
  } satisfies Record<string, unknown>;

  return (
    <main dir="rtl" className="min-h-screen bg-background text-foreground antialiased relative">
      <Script id="structured-data" type="application/ld+json" strategy="beforeInteractive">
        {JSON.stringify(structuredData)}
      </Script>
      <a href="#content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:start-4 focus:z-50 rounded-md bg-foreground/10 px-3 py-2">تخطي إلى المحتوى</a>

      <header className="sticky top-0 z-50 border-b border-foreground/10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/75">
        <nav aria-label="الرأس" className="container mx-auto px-4 py-4 md:py-6 flex flex-col gap-3 sm:gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 items-center justify-center rounded-xl bg-slate-900 px-2 shadow-lg border border-slate-700">
              <Image
                src="/assets/logo.png"
                alt="شعار المشروع"
                width={32}
                height={32}
                className="max-h-8 w-auto object-contain"
                priority
              />
            </div>
            <span className="text-base font-semibold tracking-tight sm:text-lg">مشروع سعودي — نسخة ما قبل الإطلاق</span>
          </div>
          <a
            href="#join"
            className="rounded-xl bg-foreground/10 hover:bg-foreground/20 border border-foreground/10 px-3 py-2 inline-flex w-full justify-center items-center gap-1 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-foreground/30 sm:text-base md:w-auto"
            aria-label="انتقل إلى نموذج الانضمام"
          >
            انضم مبكرًا واحجز مكانك <ChevronRight className="h-4 w-4" />
          </a>
        </nav>
      </header>

      <section className="container mx-auto px-4 pt-4 pb-10" id="content">
        <div className="mx-auto flex max-w-3xl flex-col gap-12">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-black leading-[1.1] tracking-tight">
              قريبًا…
              <span className="block mt-2 text-foreground/90">حضورك الرقمي لن يكون كما كان من قبل.</span>
            </h1>

            <p className="mt-5 text-sm sm:text-base md:text-lg text-foreground/70 max-w-2xl">
              فريق تقني وإبداعي يعمل بصمت على تجربة مختلفة كليًا. التفاصيل محجوبة الآن — لكن من ينضم مبكرًا سيعرف أولًا، وسيحصل على ميزة لا تتكرر.
            </p>

            <ul className="mt-8 space-y-3 text-foreground/80">
              <li className="flex items-center gap-3 text-sm sm:text-base">
                <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-400" />
                <span>ليست أداة تقليدية… بل نقلة في طريقة الحضور على الإنترنت.</span>
              </li>
              <li className="flex items-center gap-3 text-sm sm:text-base">
                <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-400" />
                <span>أذكى، أقوى، وأبسط — لأصحاب المواقع من كل الأنواع.</span>
              </li>
              <li className="flex items-center gap-3 text-sm sm:text-base">
                <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-400" />
                <span>وصول مبكر + مزايا خاصة للدفعة الأولى.</span>
              </li>
            </ul>
          </div>

          <div id="join">
            <div className="rounded-3xl border border-foreground/10 bg-foreground/[0.05] backdrop-blur-xl shadow-2xl">
              <div className="p-6 md:p-8 space-y-6">
                <div className="relative overflow-hidden rounded-2xl border border-foreground/10 bg-background p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-9 w-9 rounded-xl bg-foreground/10 grid place-items-center border border-foreground/20">
                      <BellRing className="h-5 w-5 text-foreground/70" />
                    </div>
                    <p className="text-2xl md:text-3xl font-bold leading-tight text-foreground/80">شيء كبير يُصنع بهدوء.</p>
                  </div>

                  <p className="mt-3 text-foreground/70">لا نكشف التفاصيل اليوم. لكننا نَعِدُك أن حضورك القادم سيكون مختلفًا.</p>

                  <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
                    <div className="rounded-xl border border-foreground/10 p-4 transition-transform duration-200 hover:-translate-y-0.5">
                      <p className="text-xs text-foreground/60">موثوقية</p>
                      <p className="mt-1 font-semibold">بنية إنتاجية</p>
                    </div>
                    <div className="rounded-xl border border-foreground/10 p-4 transition-transform duration-200 hover:-translate-y-0.5">
                      <p className="text-xs text-foreground/60">خصوصية</p>
                      <p className="mt-1 font-semibold">تفاصيل محجوبة</p>
                    </div>
                    <div className="rounded-xl border border-foreground/10 p-4 transition-transform duration-200 hover:-translate-y-0.5">
                      <p className="text-xs text-foreground/60">أفضلية</p>
                      <p className="mt-1 font-semibold">دعوات محدودة</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-foreground/10 bg-background p-6">
                  <h2 className="text-2xl md:text-3xl font-extrabold">انضم إلى القائمة البيضاء</h2>
                  <p className="mt-2 text-foreground/70">ضع بريدك الإلكتروني لتكون ضمن الدفعة الأولى من التجربة المغلقة.</p>

                  <WhitelistForm />

                  <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-foreground/60">
                    <div className="inline-flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      <span>لن نشارك بريدك. الدعوات تُرسل على دفعات.</span>
                    </div>
                    <div className="inline-flex items-center gap-2 text-foreground/70">
                      <Sparkles className="h-4 w-4" />
                      <span>مشروع سعودي — نسخة ما قبل الإطلاق</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-foreground/10 bg-black/20" aria-label="التذييل">
        <div className="container mx-auto px-4 py-8 text-sm text-foreground/60 flex flex-col md:flex-row gap-3 items-center justify-between">
          <p>© 2025 — فكرة سعودية تُصنع بهدوء. جميع الحقوق محفوظة.</p>
          <div className="flex items-center gap-4">
            <a href="#join" className="hover:text-foreground/90 underline underline-offset-4 focus:outline-none focus:ring-2 focus:ring-foreground/30">القائمة البيضاء</a>
            <span className="select-none">•</span>
            <a href="mailto:info@example.com" className="hover:text-foreground/90 focus:outline-none focus:ring-2 focus:ring-foreground/30">تواصل</a>
          </div>
        </div>
      </footer>
    </main>
  );
}

