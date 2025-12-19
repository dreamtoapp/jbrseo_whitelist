import type { Metadata, Viewport } from "next";
import { Tajawal } from "next/font/google";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { Navbar } from "@/components/Navbar";
import { DisablePWA } from "@/components/DisablePWA";
import { ThemeProvider } from "@/components/ThemeProvider";
import { auth } from "@/auth";
import "./globals.css";

const NotificationHandler = dynamic(
  () => import("@/components/NotificationHandler").then((mod) => ({ default: mod.NotificationHandler }))
);

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://jbrseo.com";
const defaultTitle = "JBRseo | مشروع سعودي لبناء حضور رقمي مبتكر";
const defaultDescription =
  "JBRseo منصة سعودية تمنحك حضورًا رقميًا متكاملًا، من الفكرة إلى الإطلاق، مع تجربة حصرية مخصصة لأوائل المنضمين.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    template: "%s | JBRseo",
  },
  description: defaultDescription,
  keywords: [
    "JBRseo",
    "منصة رقمية",
    "حضور رقمي",
    "سعودية",
    "تقنية",
    "موقع إلكتروني",
    "تجربة مستخدم",
  ],
  creator: "JBRseo Team",
  publisher: "JBRseo",
  authors: [{ name: "JBRseo Team" }],
  category: "Technology",
  openGraph: {
    type: "website",
    locale: "ar_SA",
    url: siteUrl,
    title: defaultTitle,
    description: defaultDescription,
    siteName: "JBRseo",
    images: [
      {
        url: "/assets/logo.png",
        width: 512,
        height: 512,
        alt: "شعار JBRseo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
    images: ["/assets/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/assets/logo.png",
    shortcut: "/assets/logo.png",
  },
  other: {
    "mobile-web-app-capable": "no",
    "apple-mobile-web-app-capable": "no",
    "apple-mobile-web-app-status-bar-style": "default",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
  display: "optional",
  preload: true,
  fallback: ["system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Arial", "sans-serif"],
  variable: "--font-tajawal",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth().catch(() => null);

  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning className={tajawal.variable}>
      <body className="font-sans">
        <ThemeProvider>
          <Suspense
            fallback={
              <div
                className="h-0.5 w-full bg-foreground/10 animate-pulse"
                aria-hidden="true"
              />
            }
          >
            <NotificationHandler />
            <DisablePWA />
          </Suspense>
          <Navbar session={session} />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

