"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { updateSubscriber } from "@/actions/subscribers";

const schema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().email(),
  mobile: z
    .string()
    .trim()
    .transform((val) => val.replace(/\s+/g, ""))
    .refine((val) => val.length === 0 || /^\+[1-9]\d{1,14}$/.test(val)),
  brandName: z.string().trim().min(1).max(120),
  verified: z.boolean(),
});

export type EditSubscriberForm = z.infer<typeof schema>;

type Props = {
  subscriber: {
    id: string;
    name: string;
    email: string;
    mobile: string | null;
    brandName: string;
    verified?: boolean;
  };
  onClose: () => void;
};

export function EditSubscriberDialog({ subscriber, onClose }: Props) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<EditSubscriberForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: subscriber.name,
      email: subscriber.email,
      mobile: subscriber.mobile ?? "",
      brandName: subscriber.brandName,
      verified: !!subscriber.verified,
    },
  });

  async function onSubmit(values: EditSubscriberForm) {
    setSubmitting(true);
    setError(null);
    const res = await updateSubscriber(subscriber.id, values);
    if (!res.success) {
      setError(res.error === "email_taken" ? "هذا البريد مستخدم بالفعل." : "تعذر حفظ التغييرات.");
    } else {
      onClose();
    }
    setSubmitting(false);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-lg rounded-2xl border border-foreground/15 bg-background p-6">
        <h2 className="text-xl font-semibold mb-4">تعديل المشترك</h2>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
          <div>
            <label className="text-sm">الاسم</label>
            <input className="mt-1 h-10 w-full rounded-xl border border-foreground/15 bg-foreground/[0.05] px-3" required {...form.register("name")} />
          </div>
          <div>
            <label className="text-sm">البريد الإلكتروني</label>
            <input type="email" className="mt-1 h-10 w-full rounded-xl border border-foreground/15 bg-foreground/[0.05] px-3" required {...form.register("email")} />
          </div>
          <div>
            <label className="text-sm">الجوال</label>
            <input className="mt-1 h-10 w-full rounded-xl border border-foreground/15 bg-foreground/[0.05] px-3" {...form.register("mobile")} />
          </div>
          <div>
            <label className="text-sm">اسم العلامة التجارية</label>
            <input className="mt-1 h-10 w-full rounded-xl border border-foreground/15 bg-foreground/[0.05] px-3" required {...form.register("brandName")} />
          </div>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" {...form.register("verified")} />
            تفعيل الحالة (مُتحقّق)
          </label>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <div className="mt-2 flex items-center justify-end gap-2">
            <button type="button" onClick={onClose} className="h-10 rounded-xl border border-foreground/15 px-4">إلغاء</button>
            <button type="submit" disabled={submitting} className="h-10 rounded-xl bg-foreground/20 px-4 hover:bg-foreground/30">حفظ</button>
          </div>
        </form>
      </div>
    </div>
  );
}





