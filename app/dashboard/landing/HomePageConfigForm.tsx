"use client";

import { useRef, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import type { HomePageConfigData } from "../actions/homepage-config";
import { saveHomePageConfig } from "../actions/homepage-config";

const formSchema = z.object({
  heroTitlePrimary: z.string().min(1, "هذا الحقل مطلوب"),
  heroTitleSecondary: z.string().min(1, "هذا الحقل مطلوب"),
  heroDescription: z.string().min(1, "هذا الحقل مطلوب"),
  bulletsText: z.string().min(1, "أضف نقطة واحدة على الأقل"),
  heroImageUrl: z.string().url("الرابط غير صالح").or(z.literal("")).optional(),
  heroImageAlt: z.string().optional(),
  joinTitle: z.string().min(1, "هذا الحقل مطلوب"),
  joinDescription: z.string().min(1, "هذا الحقل مطلوب"),
  privacyText: z.string().min(1, "هذا الحقل مطلوب"),
  badgeText: z.string().min(1, "هذا الحقل مطلوب"),
  footerCopyright: z.string().min(1, "هذا الحقل مطلوب"),
  footerJoinLinkText: z.string().min(1, "هذا الحقل مطلوب"),
  footerContactEmail: z.string().email("البريد غير صالح"),
  footerContactText: z.string().min(1, "هذا الحقل مطلوب"),
  facebookUrl: z.string().url("الرابط غير صالح").or(z.literal("")).optional(),
  instagramUrl: z.string().url("الرابط غير صالح").or(z.literal("")).optional(),
  linkedinUrl: z.string().url("الرابط غير صالح").or(z.literal("")).optional(),
  twitterUrl: z.string().url("الرابط غير صالح").or(z.literal("")).optional(),
  whatsappCommunityUrl: z.string().url("الرابط غير صالح").or(z.literal("")).optional(),
  telegramChannelUrl: z.string().url("الرابط غير صالح").or(z.literal("")).optional(),
});

type HomePageConfigFormValues = z.infer<typeof formSchema>;

type HomePageConfigFormProps = {
  initialData: HomePageConfigData | null;
};

export function HomePageConfigForm({ initialData }: HomePageConfigFormProps) {
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [openSections, setOpenSections] = useState({
    hero: true,
    image: true,
    join: true,
    footer: true,
    social: true,
  });

  const form = useForm<HomePageConfigFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      heroTitlePrimary: initialData?.heroTitlePrimary ?? "قريبًا…",
      heroTitleSecondary: initialData?.heroTitleSecondary ?? "حضورك الرقمي لن يكون كما كان من قبل.",
      heroDescription:
        initialData?.heroDescription ??
        "فريق تقني وإبداعي يعمل بصمت على تجربة مختلفة كليًا. التفاصيل محجوبة الآن — لكن من ينضم مبكرًا سيعرف أولًا، وسيحصل على ميزة لا تتكرر.",
      bulletsText: (initialData?.bullets?.length
        ? initialData.bullets
        : [
          "ليست أداة تقليدية… بل نقلة في طريقة الحضور على الإنترنت.",
          "أذكى، أقوى، وأبسط — لأصحاب المواقع من كل الأنواع.",
          "وصول مبكر + مزايا خاصة للدفعة الأولى.",
        ]
      ).join("\n"),
      heroImageUrl: initialData?.heroImageUrl ?? "",
      heroImageAlt: initialData?.heroImageAlt ?? "",
      joinTitle: initialData?.joinTitle ?? "انضم إلى القائمة البيضاء",
      joinDescription:
        initialData?.joinDescription ?? "ضع بريدك الإلكتروني لتكون ضمن الدفعة الأولى من التجربة المغلقة.",
      privacyText: initialData?.privacyText ?? "لن نشارك بريدك. الدعوات تُرسل على دفعات.",
      badgeText: initialData?.badgeText ?? "مشروع سعودي — نسخة ما قبل الإطلاق",
      footerCopyright:
        initialData?.footerCopyright ?? "© 2025 — فكرة سعودية تُصنع بهدوء. جميع الحقوق محفوظة.",
      footerJoinLinkText: initialData?.footerJoinLinkText ?? "القائمة البيضاء",
      footerContactEmail: initialData?.footerContactEmail ?? "info@example.com",
      footerContactText: initialData?.footerContactText ?? "تواصل",
      facebookUrl: initialData?.facebookUrl ?? "",
      instagramUrl: initialData?.instagramUrl ?? "",
      linkedinUrl: initialData?.linkedinUrl ?? "",
      twitterUrl: initialData?.twitterUrl ?? "",
      whatsappCommunityUrl: initialData?.whatsappCommunityUrl ?? "",
      telegramChannelUrl: initialData?.telegramChannelUrl ?? "",
    },
  });

  async function handleImageUpload(file: File) {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
      setUploadError("إعدادات Cloudinary غير مكتملة. تأكد من ضبط المتغيرات البيئية.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    setIsUploading(true);
    setUploadError(null);

    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("upload_failed");
      }

      const data = (await response.json()) as { secure_url?: string };

      if (!data.secure_url) {
        setUploadError("تعذّر الحصول على رابط الصورة بعد الرفع.");
        return;
      }

      form.setValue("heroImageUrl", data.secure_url, { shouldValidate: true, shouldDirty: true });
      setStatusMessage("تم رفع الصورة وتحديث الرابط تلقائيًا.");
    } catch {
      setUploadError("تعذّر رفع الصورة. حاول مرة أخرى.");
    } finally {
      setIsUploading(false);
    }
  }

  function onSubmit(values: HomePageConfigFormValues) {
    const bullets = values.bulletsText
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0);

    const payload: HomePageConfigData = {
      heroTitlePrimary: values.heroTitlePrimary,
      heroTitleSecondary: values.heroTitleSecondary,
      heroDescription: values.heroDescription,
      bullets,
      heroImageUrl: values.heroImageUrl ? values.heroImageUrl : null,
      heroImageAlt: values.heroImageAlt ?? null,
      joinTitle: values.joinTitle,
      joinDescription: values.joinDescription,
      privacyText: values.privacyText,
      badgeText: values.badgeText,
      footerCopyright: values.footerCopyright,
      footerJoinLinkText: values.footerJoinLinkText,
      footerContactEmail: values.footerContactEmail,
      footerContactText: values.footerContactText,
      facebookUrl: values.facebookUrl || null,
      instagramUrl: values.instagramUrl || null,
      linkedinUrl: values.linkedinUrl || null,
      twitterUrl: values.twitterUrl || null,
      whatsappCommunityUrl: values.whatsappCommunityUrl || null,
      telegramChannelUrl: values.telegramChannelUrl || null,
    };

    setStatusMessage(null);

    startTransition(async () => {
      const result = await saveHomePageConfig(payload);
      if (result.success) {
        setStatusMessage("تم حفظ إعدادات الصفحة الرئيسية بنجاح.");
      } else {
        setStatusMessage(result.message);
      }
    });
  }

  return (
    <div className="rounded-2xl bg-foreground/[0.03] p-6 space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <section className="space-y-4 rounded-xl border border-foreground/10 bg-background p-4 md:p-5">
            <div className="flex items-center justify-between gap-2">
              <div className="space-y-1">
                <h2 className="flex items-center gap-2 text-lg font-semibold">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-foreground/10 text-xs font-bold text-foreground/80">
                    1
                  </span>
                  <span>محتوى الهيرو</span>
                </h2>
                <p className="text-xs text-foreground/60">
                  تحكم في العنوان، والوصف، والنقاط الرئيسية (اكتب كل نقطة في سطر مستقل).
                </p>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-xs"
                onClick={() =>
                  setOpenSections((prev) => ({ ...prev, hero: !prev.hero }))
                }
              >
                {openSections.hero ? "إخفاء" : "عرض"}
              </Button>
            </div>

            {openSections.hero && (
              <div className="space-y-4 pt-4">
                <FormField
                  control={form.control}
                  name="heroTitlePrimary"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>العنوان الرئيسي</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="heroTitleSecondary"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>العنوان الفرعي</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="heroDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>الوصف</FormLabel>
                      <FormControl>
                        <Textarea rows={3} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="bulletsText"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>نقاط الهيرو (كل سطر = نقطة)</FormLabel>
                      <FormControl>
                        <Textarea rows={4} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
          </section>

          <section className="space-y-4 rounded-xl border border-foreground/10 bg-background p-4 md:p-5">
            <div className="flex items-center justify-between gap-2">
              <div className="space-y-1">
                <h2 className="flex items-center gap-2 text-lg font-semibold">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-foreground/10 text-xs font-bold text-foreground/80">
                    2
                  </span>
                  <span>صورة الهيرو (Cloudinary)</span>
                </h2>
                <p className="text-xs text-foreground/60">
                  ارفع صورة للهيدر أو ضع رابطًا مباشرًا من Cloudinary، وستظهر في الصفحة الرئيسية ومعاينات المشاركة.
                </p>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-xs"
                onClick={() =>
                  setOpenSections((prev) => ({ ...prev, image: !prev.image }))
                }
              >
                {openSections.image ? "إخفاء" : "عرض"}
              </Button>
            </div>

            {openSections.image && (
              <div className="space-y-4 pt-4">
                <FormField
                  control={form.control}
                  name="heroImageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>رابط الصورة (اختياري)</FormLabel>
                      <FormControl>
                        <div className="space-y-2">
                          <div className="flex flex-col gap-2 md:flex-row">
                            <Input
                              placeholder="https://res.cloudinary.com/..."
                              {...field}
                            />
                            <div className="flex items-center gap-2 md:w-auto">
                              <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(event) => {
                                  const file = event.target.files?.[0];
                                  if (file) {
                                    void handleImageUpload(file);
                                    event.target.value = "";
                                  }
                                }}
                              />
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => fileInputRef.current?.click()}
                                disabled={isUploading}
                              >
                                {isUploading ? "جاري الرفع..." : "رفع صورة"}
                              </Button>
                            </div>
                          </div>
                          {uploadError && (
                            <p className="text-sm text-destructive">
                              {uploadError}
                            </p>
                          )}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="heroImageAlt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>وصف بديل للصورة (Alt)</FormLabel>
                      <FormControl>
                        <Input placeholder="وصف مختصر للصورة" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
          </section>

          <section className="space-y-4 rounded-xl border border-foreground/10 bg-background p-4 md:p-5">
            <div className="flex items-center justify-between gap-2">
              <div className="space-y-1">
                <h2 className="flex items-center gap-2 text-lg font-semibold">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-foreground/10 text-xs font-bold text-foreground/80">
                    3
                  </span>
                  <span>قسم الانضمام</span>
                </h2>
                <p className="text-xs text-foreground/60">
                  نصوص دعوة الانضمام والخصوصية والشارة أسفل نموذج القائمة البيضاء.
                </p>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-xs"
                onClick={() =>
                  setOpenSections((prev) => ({ ...prev, join: !prev.join }))
                }
              >
                {openSections.join ? "إخفاء" : "عرض"}
              </Button>
            </div>

            {openSections.join && (
              <div className="space-y-4 pt-4">
                <FormField
                  control={form.control}
                  name="joinTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>عنوان القسم</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="joinDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>وصف القسم</FormLabel>
                      <FormControl>
                        <Textarea rows={2} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="privacyText"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>نص الخصوصية</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="badgeText"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>نص الشارة</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
          </section>

          <section className="space-y-4 rounded-xl border border-foreground/10 bg-background p-4 md:p-5">
            <div className="flex items-center justify-between gap-2">
              <div className="space-y-1">
                <h2 className="flex items-center gap-2 text-lg font-semibold">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-foreground/10 text-xs font-bold text-foreground/80">
                    4
                  </span>
                  <span>التذييل</span>
                </h2>
                <p className="text-xs text-foreground/60">
                  خصص نص حقوق النشر وروابط الانضمام والتواصل التي تظهر أسفل الصفحة.
                </p>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-xs"
                onClick={() =>
                  setOpenSections((prev) => ({ ...prev, footer: !prev.footer }))
                }
              >
                {openSections.footer ? "إخفاء" : "عرض"}
              </Button>
            </div>

            {openSections.footer && (
              <div className="space-y-4 pt-4">
                <FormField
                  control={form.control}
                  name="footerCopyright"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>نص حقوق النشر</FormLabel>
                      <FormControl>
                        <Textarea rows={2} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="footerJoinLinkText"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>نص رابط الانضمام</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="footerContactEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>بريد التواصل</FormLabel>
                      <FormControl>
                        <Input type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="footerContactText"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>نص رابط التواصل</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
          </section>

          <section className="space-y-4 rounded-xl border border-foreground/10 bg-background p-4 md:p-5">
            <div className="flex items-center justify-between gap-2">
              <div className="space-y-1">
                <h2 className="flex items-center gap-2 text-lg font-semibold">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-foreground/10 text-xs font-bold text-foreground/80">
                    5
                  </span>
                  <span>روابط قنوات التواصل</span>
                </h2>
                <p className="text-xs text-foreground/60">
                  أضف روابط حسابات السوشال ميديا والقنوات المجتمعية التي تريد إظهارها في التذييل.
                </p>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-xs"
                onClick={() =>
                  setOpenSections((prev) => ({ ...prev, social: !prev.social }))
                }
              >
                {openSections.social ? "إخفاء" : "عرض"}
              </Button>
            </div>

            {openSections.social && (
              <div className="space-y-4 pt-4">
                <FormField
                  control={form.control}
                  name="facebookUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Facebook (اختياري)</FormLabel>
                      <FormControl>
                        <Input placeholder="https://www.facebook.com/..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="instagramUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Instagram (اختياري)</FormLabel>
                      <FormControl>
                        <Input placeholder="https://www.instagram.com/..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="linkedinUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>LinkedIn (اختياري)</FormLabel>
                      <FormControl>
                        <Input placeholder="https://www.linkedin.com/..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="twitterUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Twitter / X (اختياري)</FormLabel>
                      <FormControl>
                        <Input placeholder="https://twitter.com/..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="whatsappCommunityUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>مجتمع WhatsApp (اختياري)</FormLabel>
                      <FormControl>
                        <Input placeholder="https://chat.whatsapp.com/..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="telegramChannelUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>قناة Telegram (اختياري)</FormLabel>
                      <FormControl>
                        <Input placeholder="https://t.me/..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
          </section>

          {statusMessage && (
            <p className="text-sm text-foreground/80">
              {statusMessage}
            </p>
          )}

          <div className="flex items-center justify-end">
            <Button
              type="submit"
              disabled={isPending}
              className="h-10 px-6 rounded-full bg-foreground text-background text-sm font-semibold shadow-md transition-all hover:-translate-y-0.5 hover:bg-foreground/90 disabled:opacity-60"
            >
              {isPending ? "جاري الحفظ..." : "حفظ الإعدادات"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

