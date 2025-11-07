import { z } from "zod";

export const whitelistSchema = z.object({
  name: z.string().optional(),
  email: z
    .string()
    .min(1, "البريد الإلكتروني مطلوب")
    .email("البريد الإلكتروني غير صحيح"),
  phone: z
    .union([z.literal(""), z.string().regex(/^05\d{8}$/, "رقم الجوال يجب أن يكون بصيغة 05xxxxxxxx")])
    .optional()
    .transform((val) => (val ? (val === "" ? undefined : val) : undefined)),
  siteType: z
    .string()
    .optional()
    .refine(
      (val) => !val || val === "" || ["store", "company", "blog", "personal", "other"].includes(val),
      "نوع الموقع غير صحيح"
    ),
  siteUrl: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^https?:\/\/.+/.test(val),
      "رابط الموقع يجب أن يبدأ بـ http:// أو https://"
    ),
});

export type WhitelistFormData = z.infer<typeof whitelistSchema>;

