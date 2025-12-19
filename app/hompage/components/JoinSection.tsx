import { CheckCircle2, Sparkles, Shield } from "lucide-react";
import { WhitelistForm } from "./WhitelistForm";
import type { HomePageContent } from "./HomePage";

type JoinSectionProps = {
  content: HomePageContent;
};

export function JoinSection({ content }: JoinSectionProps) {
  return (
    <section id="join" className="relative py-20 md:py-28 hidden md:block" aria-label="قسم الانضمام">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 mx-auto h-64 w-full max-w-lg rounded-full bg-gradient-to-r from-emerald-500/20 via-teal-500/20 to-cyan-500/20 blur-3xl" />

          <div className="relative overflow-hidden rounded-3xl border border-foreground/10 bg-background/60 backdrop-blur-2xl backdrop-saturate-150 shadow-2xl shadow-emerald-500/10">
            <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-emerald-500/60 to-transparent" />

            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-cyan-500/5 pointer-events-none" />

            <div className="p-8 sm:p-10 md:p-12 relative z-10">
              <div className="mb-12 text-center">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-xl shadow-emerald-500/30 ring-4 ring-emerald-500/20">
                  <Sparkles className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-3xl font-black tracking-tight sm:text-4xl bg-gradient-to-l from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-transparent">
                  {content.joinTitle}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-foreground/70 sm:text-lg">
                  {content.joinDescription}
                </p>
                <div className="mt-6 inline-flex items-center gap-2.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 backdrop-blur-sm px-5 py-2.5 text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>مجاني تماماً • بدون بطاقة ائتمان</span>
                </div>
              </div>

              <WhitelistForm />

              <div className="mt-10 flex flex-wrap items-center justify-center gap-5 border-t border-foreground/10 pt-8 text-xs text-foreground/50 sm:gap-6 sm:text-sm">
                <div className="inline-flex items-center gap-2">
                  <Shield className="h-4 w-4 text-emerald-500/70" />
                  <span>{content.privacyText}</span>
                </div>
                <div className="inline-flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-amber-500/70" />
                  <span>{content.badgeText}</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
