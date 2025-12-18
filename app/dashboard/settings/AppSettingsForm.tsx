"use client";

import { useTransition, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import type { AppSettingsData } from "../actions/app-settings";
import { saveAppSettings } from "../actions/app-settings";

const formSchema = z.object({
  gtmId: z.string().optional(),
  hotjarSiteId: z.string().optional(),
  hotjarVersion: z
    .string()
    .optional()
    .refine((val) => !val || Number.isInteger(Number(val.trim())), {
      message: "يجب أن يكون رقم النسخة رقمًا صحيحًا",
    }),
  twitterPixelId: z.string().optional(),
});

type AppSettingsFormValues = z.infer<typeof formSchema>;

type AppSettingsFormProps = {
  initialData: AppSettingsData | null;
};

export function AppSettingsForm({ initialData }: AppSettingsFormProps) {
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const form = useForm<AppSettingsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      gtmId: initialData?.gtmId ?? "",
      hotjarSiteId: initialData?.hotjarSiteId ?? "",
      hotjarVersion: initialData?.hotjarVersion ? String(initialData.hotjarVersion) : "",
      twitterPixelId: initialData?.twitterPixelId ?? "",
    },
  });

  function onSubmit(values: AppSettingsFormValues) {
    const payload: AppSettingsData = {
      gtmId: values.gtmId && values.gtmId.trim().length > 0 ? values.gtmId : null,
      hotjarSiteId: values.hotjarSiteId && values.hotjarSiteId.trim().length > 0 ? values.hotjarSiteId : null,
      hotjarVersion:
        values.hotjarVersion && values.hotjarVersion.trim().length > 0
          ? Number(values.hotjarVersion.trim())
          : null,
      twitterPixelId: values.twitterPixelId && values.twitterPixelId.trim().length > 0 ? values.twitterPixelId : null,
    };

    setStatusMessage(null);

    startTransition(async () => {
      const result = await saveAppSettings(payload);
      if (result.success) {
        setStatusMessage("تم حفظ إعدادات التطبيق بنجاح.");
      } else {
        setStatusMessage(result.message);
      }
    });
  }

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <section className="space-y-4 rounded-2xl border border-foreground/10 bg-background p-4 md:p-6">
            <div className="space-y-1">
              <h2 className="text-lg font-semibold">Google Tag Manager (GTM)</h2>
              <p className="text-xs text-foreground/60">
                أدخل معرّف حاوية GTM مثل: <span className="font-mono">GTM-XXXXX</span>. هذا المعرّف عام ويمكن مشاركته.
              </p>
            </div>

            <FormField
              control={form.control}
              name="gtmId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>GTM Container ID</FormLabel>
                  <FormControl>
                    <Input placeholder="GTM-XXXXXXX" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </section>

          <section className="space-y-4 rounded-2xl border border-foreground/10 bg-background p-4 md:p-6">
            <div className="space-y-1">
              <h2 className="text-lg font-semibold">Hotjar</h2>
              <p className="text-xs text-foreground/60">
                استخدم رقم الموقع (Site ID) والنسخة (عادة 6). هذه القيم عامة وتستخدم للتتبع والتحليلات.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-[2fr,1fr]">
              <FormField
                control={form.control}
                name="hotjarSiteId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hotjar Site ID</FormLabel>
                    <FormControl>
                      <Input placeholder="مثال: 1234567" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="hotjarVersion"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hotjar Version</FormLabel>
                    <FormControl>
                      <Input placeholder="مثال: 6" inputMode="numeric" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </section>

          <section className="space-y-4 rounded-2xl border border-foreground/10 bg-background p-4 md:p-6">
            <div className="space-y-1">
              <h2 className="text-lg font-semibold">Twitter / X Pixel</h2>
              <p className="text-xs text-foreground/60">
                أدخل معرّف بيكسل Twitter / X (أو معرّف التحويل) لاستخدامه في تتبع الحملات الإعلانية.
              </p>
            </div>

            <FormField
              control={form.control}
              name="twitterPixelId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Twitter Pixel ID</FormLabel>
                  <FormControl>
                    <Input placeholder="مثال: o0a1b2c3d4e5f6g7h" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
              {isPending ? "جاري الحفظ..." : "حفظ إعدادات التطبيق"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

