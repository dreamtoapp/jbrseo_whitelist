import { CheckCircle2, Sparkles, Shield, BellRing, ChevronRight } from "lucide-react";
import { WhitelistForm } from "@/components/WhitelistForm";

export default function Home() {

  return (
    <main dir="rtl" className="min-h-screen bg-background text-foreground antialiased relative">
      <a href="#content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:start-4 focus:z-50 rounded-md bg-foreground/10 px-3 py-2">تخطي إلى المحتوى</a>

      <nav aria-label="الرأس" className="container mx-auto px-4 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-foreground/10 grid place-items-center shadow-lg">
            <Sparkles className="h-5 w-5" />
          </div>
          <span className="text-lg font-semibold tracking-tight">مشروع سعودي — نسخة ما قبل الإطلاق</span>
        </div>
        <a href="#join" className="rounded-xl bg-foreground/10 hover:bg-foreground/20 border border-foreground/10 backdrop-blur px-3 py-2 inline-flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-foreground/30" aria-label="انتقل إلى نموذج الانضمام">
          انضم مبكرًا واحجز مكانك <ChevronRight className="h-4 w-4" />
        </a>
      </nav>

      <section className="container mx-auto px-4 pt-4 pb-10" id="content">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="order-2 lg:order-1">
            <h1 className="text-3xl md:text-5xl font-black leading-[1.1] tracking-tight">
              قريبًا…
              <span className="block mt-2 text-foreground/90">حضورك الرقمي لن يكون كما كان من قبل.</span>
            </h1>

            <p className="mt-5 text-base md:text-lg text-foreground/70 max-w-2xl">
              فريق تقني وإبداعي يعمل بصمت على تجربة مختلفة كليًا. التفاصيل محجوبة الآن — لكن من ينضم مبكرًا سيعرف أولًا، وسيحصل على ميزة لا تتكرر.
            </p>

            <ul className="mt-8 space-y-3 text-foreground/80">
              <li className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                <span>ليست أداة تقليدية… بل نقلة في طريقة الحضور على الإنترنت.</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                <span>أذكى، أقوى، وأبسط — لأصحاب المواقع من كل الأنواع.</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                <span>وصول مبكر + مزايا خاصة للدفعة الأولى.</span>
              </li>
            </ul>
          </div>

          <div className="order-1 lg:order-2">
            <div className="rounded-3xl border border-foreground/10 bg-foreground/[0.05] backdrop-blur-xl shadow-2xl">
              <div className="p-6 md:p-8">
                <div className="relative overflow-hidden rounded-2xl border border-foreground/10 bg-background p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-9 w-9 rounded-xl bg-foreground/10 grid place-items-center border border-foreground/20">
                      <BellRing className="h-5 w-5 text-foreground/70" />
                    </div>
                    <p className="text-sm text-foreground/70">معاينة أولية</p>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-bold leading-tight">شيء كبير يُصنع بهدوء.</h3>
                  <p className="mt-3 text-foreground/70">لا نكشف التفاصيل اليوم. لكننا نَعِدُك أن حضورك القادم سيكون مختلفًا.</p>

                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="rounded-xl border border-foreground/10 p-4">
                      <p className="text-xs text-foreground/60">موثوقية</p>
                      <p className="font-semibold mt-1">بنية إنتاجية</p>
                    </div>
                    <div className="rounded-xl border border-foreground/10 p-4">
                      <p className="text-xs text-foreground/60">خصوصية</p>
                      <p className="font-semibold mt-1">تفاصيل محجوبة</p>
                    </div>
                    <div className="rounded-xl border border-foreground/10 p-4">
                      <p className="text-xs text-foreground/60">أفضلية</p>
                      <p className="font-semibold mt-1">دعوات محدودة</p>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center gap-3 text-sm text-foreground/60">
                    <Shield className="h-4 w-4" />
                    <span>لن نشارك بريدك. الدعوات تُرسل على دفعات.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="join" className="container mx-auto px-4 pb-20">
        <div className="max-w-2xl mx-auto">
          <div className="rounded-3xl border border-foreground/10 bg-foreground/[0.05] backdrop-blur-xl">
            <div className="p-6 md:p-8">
              <h2 className="text-2xl md:text-3xl font-extrabold">انضم إلى القائمة البيضاء</h2>
              <p className="mt-2 text-foreground/70">ضع بريدك الإلكتروني لتكون ضمن الدفعة الأولى من التجربة المغلقة.</p>

              <WhitelistForm />
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

