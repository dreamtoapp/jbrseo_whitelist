"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { verifyOtpWithToken, resendOtp } from "@/actions/verify";

export default function VerifyPage() {
  const search = useSearchParams();
  const token = search.get("token") || "";
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [resending, setResending] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!token) {
      setMessage("رابط التحقق غير صالح.");
      return;
    }
    setLoading(true);
    setMessage(null);
    const res = await verifyOtpWithToken(token, code.trim());
    if (res.success) {
      setMessage("تم التحقق من البريد الإلكتروني بنجاح.");
    } else if ((res as any).alreadyVerified) {
      setMessage("هذا البريد الإلكتروني مُتحقق مسبقًا.");
    } else {
      const err = (res as any).error;
      if (err === "otp_expired") setMessage("انتهت صلاحية الرمز. يرجى طلب رمز جديد.");
      else if (err === "otp_invalid") setMessage("الرمز غير صحيح. حاول مرة أخرى.");
      else if (err === "otp_missing") setMessage("لا يوجد رمز حالي. يرجى طلب رمز جديد.");
      else if (err === "not_found") setMessage("رابط التحقق غير صالح أو منتهي.");
      else setMessage("تعذر إتمام التحقق الآن. حاول لاحقًا.");
    }
    setLoading(false);
  }

  async function onResend() {
    if (!token) return;
    setResending(true);
    await resendOtp(token);
    setResending(false);
    setMessage("تم إرسال رمز جديد إلى بريدك.");
  }

  return (
    <div dir="rtl" className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
      <div className="max-w-md w-full rounded-3xl border border-foreground/10 bg-foreground/[0.05] backdrop-blur-xl p-8">
        <h1 className="text-2xl font-bold mb-2">تأكيد البريد الإلكتروني</h1>
        <p className="text-foreground/70 mb-6">أدخل رمز التحقق المرسل إلى بريدك.</p>

        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid gap-2">
            <label htmlFor="code" className="text-sm">رمز التحقق</label>
            <input
              id="code"
              name="code"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={6}
              required
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="h-11 rounded-xl bg-foreground/[0.05] border border-foreground/15 px-3 outline-none focus:ring-2 focus:ring-foreground/40"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full h-11 rounded-xl bg-foreground/20 hover:bg-foreground/30 text-foreground font-semibold shadow-lg focus:outline-none focus:ring-2 focus:ring-foreground/30"
          >
            {loading ? "جاري التحقق..." : "تأكيد"}
          </button>
        </form>

        {message && (
          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-foreground/80">{message}</p>
            <button
              type="button"
              onClick={onResend}
              disabled={resending}
              className="text-sm underline hover:opacity-80 disabled:opacity-50"
            >
              {resending ? "جاري الإرسال..." : "إعادة إرسال الرمز"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}


