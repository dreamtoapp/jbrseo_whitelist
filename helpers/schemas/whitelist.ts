import { z } from "zod";

export const whitelistSchema = z.object({
  name: z.string().trim().min(1, "الاسم مطلوب").max(120, "الاسم طويل جدًا"),
  email: z.string().trim().min(1, "البريد الإلكتروني مطلوب").email("البريد الإلكتروني غير صحيح"),
  mobile: z
    .string()
    .trim()
    .transform((val) => val.replace(/\s+/g, ""))
    .refine(
      (val) => val.length === 0 || /^\+[1-9]\d{1,14}$/.test(val),
      "رقم الجوال يجب أن يكون بصيغة دولية مثل +9665xxxxxxx"
    ),
  brandName: z.string().trim().min(1, "اسم العلامة مطلوب").max(120, "اسم العلامة طويل جدًا"),
});

export type WhitelistFormData = z.infer<typeof whitelistSchema>;

