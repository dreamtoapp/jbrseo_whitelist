"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { whitelistSchema, type WhitelistFormData } from "@/helpers/schemas/whitelist";
import { submitWhitelist, resendWhitelistVerification } from "@/actions/whitelist";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { type z } from "zod";

export function WhitelistForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  type WhitelistFormFields = z.input<typeof whitelistSchema>;

  const form = useForm<WhitelistFormFields, undefined, WhitelistFormData>({
    resolver: zodResolver(whitelistSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      siteType: "",
      siteUrl: "",
    } satisfies WhitelistFormFields,
  });

  async function onSubmit(data: WhitelistFormData) {
    setIsSubmitting(true);
    try {
      const result = await submitWhitelist(data);
      if (result.success) {
        const status = (result as { status?: string }).status;

        if (status === "already_verified") {
          showInfoNotification("حسابك مسجل ومؤكَّد بالفعل. نعمل على تجهيز التحديثات القادمة ونبلغك فور توفرها.");
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

        if (typeof window !== "undefined" && (window as any).gtag && result.location) {
          (window as any).gtag("event", "whitelist_signup", {
            country: result.location.country || "unknown",
            city: result.location.city || "unknown",
          });
        }
      } else {
        const errorCode = (result as { error?: string }).error;

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
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 grid gap-5">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>الاسم (اختياري)</FormLabel>
              <FormControl>
                <Input
                  placeholder="مثال: خالد العلي"
                  autoComplete="name"
                  className="h-11 rounded-xl bg-foreground/[0.05] border border-foreground/15 px-3 transition-colors duration-200 focus:bg-background focus:border-foreground/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                البريد الإلكتروني <span className="text-foreground/60">(إلزامي)</span>
              </FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  inputMode="email"
                  className="h-11 rounded-xl bg-foreground/[0.05] border border-foreground/15 px-3 transition-colors duration-200 focus:bg-background focus:border-foreground/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>رقم الجوال (اختياري)</FormLabel>
              <FormControl>
                <Input
                  type="tel"
                  placeholder="05xxxxxxxx"
                  autoComplete="tel"
                  inputMode="tel"
                  className="h-11 rounded-xl bg-foreground/[0.05] border border-foreground/15 px-3 transition-colors duration-200 focus:bg-background focus:border-foreground/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="siteType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>نوع الموقع أو النشاط (اختياري)</FormLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value ?? ""}
              >
                <FormControl>
                  <SelectTrigger className="h-11 rounded-xl bg-foreground/[0.05] border border-foreground/15 transition-colors duration-200 focus:bg-background focus:border-foreground/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20">
                    <SelectValue placeholder="— اختر —" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                <SelectItem value="store">متجر إلكتروني</SelectItem>
                  <SelectItem value="company">شركة / مؤسسة</SelectItem>
                  <SelectItem value="blog">مدونة / محتوى</SelectItem>
                  <SelectItem value="personal">شخصي / بورتفوليو</SelectItem>
                  <SelectItem value="other">أخرى</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="siteUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>رابط الموقع (اختياري)</FormLabel>
              <FormControl>
                <Input
                  type="url"
                  placeholder="https://example.com"
                  autoComplete="url"
                  inputMode="url"
                  className="h-11 rounded-xl bg-foreground/[0.05] border border-foreground/15 px-3 transition-colors duration-200 focus:bg-background focus:border-foreground/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={isSubmitting}
          className="h-11 rounded-xl px-6 bg-foreground/20 text-foreground font-semibold shadow-lg transition-transform duration-200 hover:-translate-y-0.5 hover:bg-foreground/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "جاري الإرسال..." : "أضفني إلى القائمة البيضاء"}
        </Button>
      </form>
    </Form>
  );
}

