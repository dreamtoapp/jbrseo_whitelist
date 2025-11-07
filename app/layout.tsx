import type { Metadata } from "next";
import { Tajawal } from "next/font/google";
import { Suspense } from "react";
import { NotificationHandler } from "@/components/NotificationHandler";
import "sweetalert2/src/sweetalert2.scss";
import "./globals.css";

export const metadata: Metadata = {
  title: "DreamToApp",
  description: "DreamToApp Application",
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

