import { CheckCircle2, Clock } from "lucide-react";
import Image from "next/image";
import cloudinaryLoader from "@/helpers/cloudinary-loader";
import { WhitelistFormTrigger } from "./WhitelistFormTrigger";
import type { HomePageContent } from "./HomePage";

type HeroSectionProps = {
  content: HomePageContent;
};

export function HeroSection({ content }: HeroSectionProps) {
  const hasHeroImage = Boolean(content.heroImageUrl);

  return (
    <section className="relative pb-16 pt-12 md:pb-24 md:pt-20" id="content" aria-label="القسم الرئيسي">
      <div className="container mx-auto px-4 sm:px-6">
        <article className="mx-auto max-w-4xl text-center">
          {/* Mobile Badge */}
          <div className="mb-6 inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400 sm:hidden" role="status" aria-label="مشروع سعودي - سجّل الآن للحصول على أولوية الوصول">
            <span className="relative flex h-1.5 w-1.5 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </span>
            <span className="font-bold whitespace-nowrap">سجّل الآن</span>
          </div>

          {/* Fluid Typography Heading */}
          <h1 className="font-black leading-tight tracking-tight text-[clamp(1.875rem,5vw,3.75rem)]">
            <span className="block text-foreground">
              {content.heroTitlePrimary}
            </span>
            <span className="mt-2 block bg-linear-to-l from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              {content.heroTitleSecondary}
            </span>
          </h1>

          {/* Description with Fluid Typography */}
          <p className="mx-auto mt-6 max-w-2xl leading-relaxed text-muted-foreground text-[clamp(1rem,2vw,1.25rem)]">
            {content.heroDescription}
          </p>

          {/* Enhanced CTA Section */}
          <div className="mt-8 hidden flex-col items-center justify-center gap-4 sm:flex sm:flex-row sm:gap-6">
            <WhitelistFormTrigger />
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>30 ثانية فقط</span>
            </div>
          </div>

          {/* Simplified Hero Image */}
          {hasHeroImage && (
            <div className="relative mt-12 overflow-hidden rounded-2xl border border-border shadow-2xl shadow-foreground/5 md:rounded-3xl">
              <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-background/80 to-transparent" />
              <Image
                loader={cloudinaryLoader}
                src={content.heroImageUrl as string}
                alt={content.heroImageAlt || "صورة توضيحية"}
                width={1280}
                height={720}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1280px"
                className="w-full object-cover transition-transform duration-500 hover:scale-[1.02]"
                priority
                fetchPriority="high"
              />
            </div>
          )}

          {/* Clean Feature Cards */}
          <ul className="mt-12 grid gap-4 text-start sm:grid-cols-2 lg:grid-cols-3" role="list">
            {content.bullets.slice(0, 3).map((bullet, index) =>
              bullet ? (
                <li
                  key={index}
                  className="group rounded-xl border border-border bg-card p-5 transition-colors hover:border-emerald-500/50 hover:bg-emerald-500/5"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-emerald-500 to-teal-600 shadow-lg shadow-emerald-500/20" aria-hidden="true">
                      <CheckCircle2 className="h-5 w-5 text-background" />
                    </div>
                    <span className="pt-1 text-sm font-medium leading-relaxed text-foreground/80 sm:text-base">
                      {bullet}
                    </span>
                  </div>
                </li>
              ) : null
            )}
          </ul>
        </article>
      </div>
    </section>
  );
}
