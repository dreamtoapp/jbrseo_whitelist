import { redirect } from "next/navigation";
import { checkAuth } from "@/helpers/auth";
import { renderOtpEmailHtml } from "@/helpers/email";

export default async function DashboardOtpMailPreviewPage() {
  const isAuthenticated = await checkAuth();

  if (!isAuthenticated) {
    redirect("/dashboard");
  }

  const baseUrl = (() => {
    const prioritized = process.env.RESEND_ASSET_BASE_URL || process.env.NEXT_PUBLIC_SITE_URL;
    if (prioritized) return prioritized.replace(/\/$/, "");
    if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL.replace(/\/$/, "")}`;
    return "https://jbrseo.com";
  })();

  const previewHtml = renderOtpEmailHtml({
    code: "123456",
    link: `${baseUrl}/verify?token=demo-token`,
  });

  return (
    <div dir="rtl" className="min-h-screen bg-background text-foreground">
      <main className="container mx-auto px-4 py-10 space-y-8">
        <header className="max-w-3xl space-y-2">
          <h1 className="text-3xl font-bold">معاينة رسالة التحقق</h1>
          <p className="text-sm text-foreground/70 leading-6">
            تعرض هذه الصفحة الشكل النهائي لرسالة تأكيد البريد الإلكتروني التي يتم إرسالها عبر خدمة Resend.
            لتعديل الشعار، قم بتحديد رابط الصورة في <code className="font-mono text-xs">RESEND_EMAIL_LOGO_URL</code>
            أو وفّر عنوان الموقع في <code className="font-mono text-xs">RESEND_ASSET_BASE_URL</code>/<code className="font-mono text-xs">NEXT_PUBLIC_SITE_URL</code>.
          </p>
        </header>

        <section className="rounded-2xl border border-foreground/10 bg-foreground/[0.04] p-6">
          <div className="rounded-xl border border-foreground/10 overflow-hidden shadow-sm bg-white">
            <iframe
              title="OTP email preview"
              srcDoc={previewHtml}
              className="w-full h-[560px]"
            />
          </div>
        </section>
      </main>
    </div>
  );
}


