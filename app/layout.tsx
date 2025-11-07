import type { Metadata } from "next";
import { Tajawal } from "next/font/google";
import { Suspense } from "react";
import { NotificationHandler } from "@/components/NotificationHandler";
import "sweetalert2/src/sweetalert2.scss";
import "./globals.css";

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
  applicationName: "JBRseo",
  creator: "JBRseo Team",
  publisher: "JBRseo",
  authors: [{ name: "JBRseo Team" }],
  category: "Technology",
  alternates: {
    canonical: "/",
  },
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
  viewport: "width=device-width, initial-scale=1, shrink-to-fit=no",
  icons: {
    icon: "/assets/logo.png",
    shortcut: "/assets/logo.png",
    apple: "/assets/logo.png",
  },
};

const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["200", "300", "400", "500", "700", "800", "900"],
  variable: "--font-tajawal",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${tajawal.variable} font-sans`}>
        <Suspense fallback={null}>
          <NotificationHandler />
        </Suspense>
        {children}
      </body>
    </html>
  );
}

