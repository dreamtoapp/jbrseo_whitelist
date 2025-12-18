import { CheckCircle2, Sparkles, Shield, ArrowLeft, Users, Clock, Zap, Star } from "lucide-react";
import Script from "next/script";
import Image from "next/image";
import { WhitelistForm } from "./WhitelistForm";
import { HomeHeader } from "./HomeHeader";

export type HomePageContent = {
  heroTitlePrimary: string;
  heroTitleSecondary: string;
  heroDescription: string;
  bullets: string[];
  heroImageUrl?: string | null;
  heroImageAlt?: string | null;
  joinTitle: string;
  joinDescription: string;
  privacyText: string;
  badgeText: string;
  footerCopyright: string;
  footerJoinLinkText: string;
  footerContactEmail: string;
  footerContactText: string;
  facebookUrl?: string | null;
  instagramUrl?: string | null;
  linkedinUrl?: string | null;
  twitterUrl?: string | null;
  whatsappCommunityUrl?: string | null;
  telegramChannelUrl?: string | null;
};

function SocialIcon({ type }: { type: string }) {
  const iconClass = "h-5 w-5 transition-transform group-hover:scale-110";
  switch (type) {
    case "facebook":
      return (
        <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      );
    case "instagram":
      return (
        <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      );
    case "twitter":
      return (
        <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    case "whatsapp":
      return (
        <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      );
    case "telegram":
      return (
        <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
        </svg>
      );
    default:
      return null;
  }
}

export function HomePage({ content }: { content: HomePageContent }) {
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
        description: content.heroDescription,
        publisher: {
          "@id": `${siteUrl}#organization`,
        },
      },
    ],
  } satisfies Record<string, unknown>;

  const hasHeroImage = Boolean(content.heroImageUrl);
  const hasSocialLinks =
    content.facebookUrl ||
    content.instagramUrl ||
    content.linkedinUrl ||
    content.twitterUrl ||
    content.whatsappCommunityUrl ||
    content.telegramChannelUrl;

  const socialLinks = [
    { url: content.facebookUrl, type: "facebook", label: "Facebook" },
    { url: content.instagramUrl, type: "instagram", label: "Instagram" },
    { url: content.linkedinUrl, type: "linkedin", label: "LinkedIn" },
    { url: content.twitterUrl, type: "twitter", label: "X" },
    { url: content.whatsappCommunityUrl, type: "whatsapp", label: "WhatsApp" },
    { url: content.telegramChannelUrl, type: "telegram", label: "Telegram" },
  ].filter((link) => link.url);

  return (
    <main dir="rtl" className="min-h-screen bg-background text-foreground antialiased relative overflow-hidden">
      <Script id="structured-data" type="application/ld+json" strategy="beforeInteractive">
        {JSON.stringify(structuredData)}
      </Script>

      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:start-4 focus:z-50 rounded-md bg-foreground/10 px-3 py-2"
      >
        تخطي إلى المحتوى
      </a>

      {/* Gradient mesh background */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute top-0 right-0 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-emerald-500/20 via-teal-500/10 to-transparent blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-0 left-0 h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-blue-500/15 via-indigo-500/10 to-transparent blur-3xl animate-pulse-slow animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[800px] w-[800px] rounded-full bg-gradient-to-r from-foreground/[0.02] to-transparent blur-3xl" />
      </div>

      {/* Subtle grid pattern */}
      <div
        className="pointer-events-none fixed inset-0 -z-10 opacity-[0.015]"
        style={{
          backgroundImage: `linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
        }}
      />

      {/* Header */}
      <HomeHeader />

      {/* Hero Section */}
      <section className="relative pt-10 pb-12 md:pt-16 md:pb-20" id="content">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            {/* Urgency Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-sm backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500" />
              </span>
              <span className="font-medium text-amber-700 dark:text-amber-300">
                🔥 {content.badgeText} — الأماكن محدودة!
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl font-black leading-[1.1] tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
              <span className="bg-gradient-to-l from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-transparent">
                {content.heroTitlePrimary}
              </span>
              <span className="mt-2 block bg-gradient-to-l from-emerald-500 via-teal-500 to-cyan-500 bg-clip-text text-transparent">
                {content.heroTitleSecondary}
              </span>
            </h1>

            {/* Description */}
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-foreground/60 sm:text-lg md:text-xl">
              {content.heroDescription}
            </p>

            {/* Hero CTA Buttons */}
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="#join"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-l from-emerald-600 via-teal-600 to-cyan-600 px-8 py-4 text-base font-bold text-white shadow-xl shadow-emerald-500/25 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/30"
              >
                <Zap className="h-5 w-5" />
                <span>احجز مكانك الآن — مجاناً</span>
                <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
              </a>
              <div className="flex items-center gap-2 text-sm text-foreground/50">
                <Clock className="h-4 w-4" />
                <span>التسجيل يستغرق 30 ثانية فقط</span>
              </div>
            </div>

            {/* Social Proof Stats */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-6 border-y border-foreground/10 py-6 sm:gap-10">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/10">
                  <Users className="h-5 w-5 text-emerald-500" />
                </div>
                <div className="text-start">
                  <div className="text-xl font-bold sm:text-2xl">+500</div>
                  <div className="text-xs text-foreground/50">عضو مسجل</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-500/10">
                  <Star className="h-5 w-5 text-amber-500" />
                </div>
                <div className="text-start">
                  <div className="text-xl font-bold sm:text-2xl">4.9/5</div>
                  <div className="text-xs text-foreground/50">تقييم العملاء</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/10">
                  <Zap className="h-5 w-5 text-blue-500" />
                </div>
                <div className="text-start">
                  <div className="text-xl font-bold sm:text-2xl">24h</div>
                  <div className="text-xs text-foreground/50">دعم متواصل</div>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            {hasHeroImage && (
              <div className="relative mt-10 overflow-hidden rounded-2xl border border-foreground/10 shadow-2xl shadow-foreground/5 md:rounded-3xl">
                <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent z-10 pointer-events-none" />
                <Image
                  src={content.heroImageUrl as string}
                  alt={content.heroImageAlt || "صورة توضيحية"}
                  width={1280}
                  height={720}
                  className="w-full object-cover transition-transform duration-700 hover:scale-[1.02]"
                  priority
                />
              </div>
            )}

            {/* Features List */}
            <div className="mt-12 grid gap-4 text-start sm:grid-cols-3">
              {content.bullets.slice(0, 3).map((bullet, index) =>
                bullet ? (
                  <div
                    key={index}
                    className="group relative overflow-hidden rounded-2xl border border-foreground/10 bg-foreground/[0.02] p-5 transition-all duration-300 hover:border-emerald-500/30 hover:bg-emerald-500/5"
                  >
                    <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-emerald-500/10 blur-2xl transition-all duration-300 group-hover:bg-emerald-500/20" />
                    <div className="relative flex items-start gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg shadow-emerald-500/20">
                        <CheckCircle2 className="h-4 w-4 text-white" />
                      </div>
                      <span className="text-sm font-medium leading-relaxed text-foreground/80 sm:text-base">
                        {bullet}
                      </span>
                    </div>
                  </div>
                ) : null
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Join Section */}
      <section id="join" className="relative py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-xl">
            {/* Glow effect behind card */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 mx-auto h-64 w-full max-w-lg rounded-full bg-gradient-to-r from-emerald-500/20 via-teal-500/20 to-cyan-500/20 blur-3xl" />

            {/* Card */}
            <div className="relative overflow-hidden rounded-3xl border border-foreground/10 bg-background/80 shadow-2xl shadow-foreground/5 backdrop-blur-xl">
              {/* Card glow top */}
              <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />

              {/* Limited Spots Banner */}
              <div className="bg-gradient-to-l from-amber-500 via-orange-500 to-red-500 px-4 py-2 text-center text-sm font-semibold text-white">
                ⚡ تبقى 47 مكاناً فقط من أصل 100 — سجّل الآن!
              </div>

              <div className="p-6 sm:p-8 md:p-10">
                {/* Header */}
                <div className="mb-8 text-center">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg shadow-emerald-500/25">
                    <Sparkles className="h-7 w-7 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                    {content.joinTitle}
                  </h2>
                  <p className="mt-2 text-foreground/60">
                    {content.joinDescription}
                  </p>
                  {/* Quick benefit reminder */}
                  <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>مجاني تماماً • بدون بطاقة ائتمان</span>
                  </div>
                </div>

                {/* Form */}
                <WhitelistForm />

                {/* Trust signals */}
                <div className="mt-8 flex flex-wrap items-center justify-center gap-4 border-t border-foreground/10 pt-6 text-xs text-foreground/50 sm:gap-6 sm:text-sm">
                  <div className="inline-flex items-center gap-2">
                    <Shield className="h-4 w-4 text-emerald-500/70" />
                    <span>{content.privacyText}</span>
                  </div>
                  <div className="inline-flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-amber-500/70" />
                    <span>{content.badgeText}</span>
                  </div>
                </div>

                {/* Recent signups social proof */}
                <div className="mt-6 flex items-center justify-center gap-3 text-sm text-foreground/60">
                  <div className="flex -space-x-2 rtl:space-x-reverse">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-gradient-to-br from-emerald-400 to-teal-500 text-xs font-bold text-white">
                      م
                    </div>
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-gradient-to-br from-blue-400 to-indigo-500 text-xs font-bold text-white">
                      ع
                    </div>
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-gradient-to-br from-amber-400 to-orange-500 text-xs font-bold text-white">
                      خ
                    </div>
                  </div>
                  <span>محمد، عبدالله، خالد وآخرون انضموا اليوم</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-foreground/10 bg-foreground/[0.02]" aria-label="التذييل">
        <div className="container mx-auto px-4 py-10 md:py-12">
          <div className="flex flex-col items-center gap-8">
            {/* Logo and Brand */}
            <div className="flex items-center gap-3">
              <Image
                src="/assets/logo.png"
                alt="JBRseo Logo"
                width={36}
                height={36}
                className="h-8 w-8 rounded-lg opacity-80"
              />
              <span className="text-base font-semibold text-foreground/70">JBRseo</span>
            </div>

            {/* Social Links */}
            {hasSocialLinks && (
              <div className="flex flex-wrap items-center justify-center gap-3">
                {socialLinks.map((link) => (
                  <a
                    key={link.type}
                    href={link.url!}
                    className="group flex h-10 w-10 items-center justify-center rounded-full border border-foreground/10 bg-foreground/5 text-foreground/60 transition-all duration-300 hover:border-foreground/20 hover:bg-foreground/10 hover:text-foreground"
                    target="_blank"
                    rel="noreferrer"
                    aria-label={link.label}
                  >
                    <SocialIcon type={link.type} />
                  </a>
                ))}
              </div>
            )}

            {/* Links */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-foreground/50">
              <a
                href="#join"
                className="transition-colors hover:text-foreground/80"
              >
                {content.footerJoinLinkText}
              </a>
              <span className="text-foreground/20">|</span>
              <a
                href={`mailto:${content.footerContactEmail}`}
                className="transition-colors hover:text-foreground/80"
              >
                {content.footerContactText}
              </a>
            </div>

            {/* Copyright */}
            <p className="text-center text-xs text-foreground/40">
              {content.footerCopyright}
            </p>
          </div>
        </div>
      </footer>

      {/* Floating Mobile CTA */}
      <div className="fixed bottom-0 inset-x-0 z-50 border-t border-foreground/10 bg-background/95 p-3 backdrop-blur-xl sm:hidden">
        <a
          href="#join"
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-l from-emerald-600 via-teal-600 to-cyan-600 py-3.5 text-base font-bold text-white shadow-lg shadow-emerald-500/25"
        >
          <Zap className="h-5 w-5" />
          <span>سجّل الآن — مجاناً</span>
        </a>
      </div>

      {/* Add padding at bottom for mobile CTA */}
      <div className="h-20 sm:hidden" />
    </main>
  );
}
