import { renderOtpEmailHtml } from "@/helpers/email";
import { OtpMailPreview } from "./components/OtpMailPreview";
import { DashboardNav } from "../components/DashboardNav";

export default async function DashboardOtpMailPreviewPage() {
  const baseUrl = (() => {
    const prioritized = process.env.RESEND_ASSET_BASE_URL || process.env.NEXT_PUBLIC_SITE_URL;
    if (prioritized) return prioritized.replace(/\/$/, "");
    if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL.replace(/\/$/, "")}`;
    return "https://jbrseo.com";
  })();

  const previewHtml = renderOtpEmailHtml({
    code: "1234",
    link: `${baseUrl}/verify?token=demo-token`,
  });

  return (
    <div dir="rtl" className="min-h-screen bg-background text-foreground">
      <DashboardNav />
      <OtpMailPreview previewHtml={previewHtml} />
    </div>
  );
}


