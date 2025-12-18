"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { whitelistSchema, type WhitelistFormData } from "@/helpers/schemas/whitelist";
import { submitWhitelist, resendWhitelistVerification } from "../actions/whitelist";
import { notificationConfig, showSuccessNotification, showErrorNotification, showInfoNotification } from "@/helpers/notifications";
import Swal from "sweetalert2";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { type z } from "zod";
import { ArrowLeft, Loader2, Lock, Sparkles } from "lucide-react";

export function WhitelistForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  type WhitelistFormFields = z.input<typeof whitelistSchema>;

  const form = useForm<WhitelistFormFields, undefined, WhitelistFormData>({
    resolver: zodResolver(whitelistSchema),
    defaultValues: {
      name: "",
      email: "",
      mobile: "",
      brandName: "",
    } satisfies WhitelistFormFields,
  });

  async function onSubmit(data: WhitelistFormData) {
    setIsSubmitting(true);
    try {
      const result = await submitWhitelist(data);
      if (result.success) {
        const status = (result as { status?: string }).status;

        if (status === "already_verified") {
          showInfoNotification("حسابك مسجل ومؤكَّد بالفعل. نعمل على تجهيز التحديثات القادمة ونبلغك فور توفرها.");
          return;
        }

        if (status === "pending_verification") {
          const confirmResend = await Swal.fire({
            ...notificationConfig,
            icon: "info",
            title: "بريدك بحاجة لتأكيد",
            text: "بريدك مسجل لدينا لكن لم يتم التحقق بعد. هل ترغب في إعادة إرسال رمز التحقق الآن؟",
            showCancelButton: true,
            confirmButtonText: "أعد إرسال الرمز",
            cancelButtonText: "لاحقًا",
            allowOutsideClick: false,
            allowEscapeKey: false,
          });

          if (confirmResend.isConfirmed) {
            const resendResponse = await resendWhitelistVerification(data.email.trim());
            if (resendResponse.success) {
              showSuccessNotification("تم إرسال رمز تحقق جديد. تفقد بريدك الإلكتروني لإكمال التفعيل، وإذا لم تجده في البريد الوارد فراجع مجلد الرسائل غير المرغوبة أو الترويجية وانقلها إلى البريد الوارد.");
            } else if (resendResponse.error === "already_verified") {
              showInfoNotification("تم التحقق من بريدك بالفعل. سنوافيك بالتحديثات قريبًا.");
            } else if (resendResponse.error === "not_found") {
              showErrorNotification("تعذّر العثور على بريدك. حاول التسجيل مرة أخرى.");
            } else {
              showErrorNotification("تعذّر إعادة إرسال الرمز الآن. حاول لاحقًا.");
            }
          } else {
            showInfoNotification("يمكنك إعادة فتح رابط التحقق السابق في بريدك لإكمال العملية متى أردت.");
          }
          return;
        }

        showSuccessNotification(
          "تم استلام تسجيلك. يرجى فتح الرسالة في بريدك والنقر على رابط التحقق ثم إدخال رمز OTP لإكمال التأكيد. إذا لم تجد الرسالة في البريد الوارد، تحقق من مجلد الرسائل غير المرغوبة أو الترويجية وانقلها إلى البريد الوارد."
        );
        form.reset();

        if (typeof window !== "undefined" && (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag && result.location) {
          (window as unknown as { gtag: (...args: unknown[]) => void }).gtag("event", "whitelist_signup", {
            country: result.location.country || "unknown",
            city: result.location.city || "unknown",
          });
        }
      } else {
        console.error("whitelist submission failed", result);
        showErrorNotification("تعذّر الإرسال مؤقتًا. حاول لاحقًا.");
      }
    } catch (error) {
      console.error("whitelist submission threw", error);
      showErrorNotification("تعذّر الإرسال مؤقتًا. حاول لاحقًا.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        {/* Primary fields - most important first */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-foreground/70">
                البريد الإلكتروني <span className="text-emerald-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  inputMode="email"
                  className="h-12 rounded-xl border-foreground/10 bg-foreground/[0.03] px-4 text-base transition-all duration-200 placeholder:text-foreground/30 hover:border-foreground/20 focus:border-emerald-500/50 focus:bg-background focus:ring-2 focus:ring-emerald-500/20"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-foreground/70">
                  الاسم <span className="text-emerald-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="خالد العلي"
                    autoComplete="name"
                    className="h-12 rounded-xl border-foreground/10 bg-foreground/[0.03] px-4 text-base transition-all duration-200 placeholder:text-foreground/30 hover:border-foreground/20 focus:border-emerald-500/50 focus:bg-background focus:ring-2 focus:ring-emerald-500/20"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="brandName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-foreground/70">
                  العلامة التجارية <span className="text-emerald-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="اسم شركتك أو مشروعك"
                    autoComplete="organization"
                    className="h-12 rounded-xl border-foreground/10 bg-foreground/[0.03] px-4 text-base transition-all duration-200 placeholder:text-foreground/30 hover:border-foreground/20 focus:border-emerald-500/50 focus:bg-background focus:ring-2 focus:ring-emerald-500/20"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="mobile"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-foreground/70">
                رقم الجوال <span className="text-foreground/40">(اختياري — للتواصل السريع)</span>
              </FormLabel>
              <FormControl>
                <Input
                  type="tel"
                  placeholder="+9665xxxxxxxx"
                  autoComplete="tel"
                  inputMode="tel"
                  className="h-12 rounded-xl border-foreground/10 bg-foreground/[0.03] px-4 text-base transition-all duration-200 placeholder:text-foreground/30 hover:border-foreground/20 focus:border-emerald-500/50 focus:bg-background focus:ring-2 focus:ring-emerald-500/20"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        {/* CTA Button */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="group relative mt-2 h-14 w-full overflow-hidden rounded-xl bg-gradient-to-l from-emerald-600 via-teal-600 to-cyan-600 text-lg font-bold text-white shadow-xl shadow-emerald-500/25 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-emerald-500/30 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <span className="absolute inset-0 bg-gradient-to-l from-emerald-500 via-teal-500 to-cyan-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <span className="relative flex items-center justify-center gap-3">
            {isSubmitting ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>جاري التسجيل...</span>
              </>
            ) : (
              <>
                <Sparkles className="h-5 w-5" />
                <span>احجز مكانك الآن — مجاناً</span>
                <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
              </>
            )}
          </span>
        </Button>

        {/* Security micro-copy */}
        <div className="flex items-center justify-center gap-2 text-xs text-foreground/40">
          <Lock className="h-3.5 w-3.5" />
          <span>بياناتك آمنة ومشفرة • لن نشاركها مع أي طرف</span>
        </div>
      </form>
    </Form>
  );
}
