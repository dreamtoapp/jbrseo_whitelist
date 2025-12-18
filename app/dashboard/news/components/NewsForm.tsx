"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { createNewsPost, updateNewsPost } from "../actions/news";
import { generateSlug } from "@/helpers/seo";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  title: z.string().trim().min(1, "العنوان مطلوب").max(180, "الحد الأقصى 180 حرف"),
  slug: z.string().trim().min(1, "الرابط مطلوب").max(100, "الحد الأقصى 100 حرف").optional(),
  content: z.string().trim().min(1, "المحتوى مطلوب").max(5000, "الحد الأقصى 5000 حرف"),
  excerpt: z.string().trim().max(500, "الحد الأقصى 500 حرف").optional(),
  author: z.string().trim().max(100, "الحد الأقصى 100 حرف").optional(),
  tags: z.string().optional(),
  metaDescription: z.string().trim().max(160, "الحد الأقصى 160 حرف").optional(),
  metaKeywords: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

type Props = {
  post?: {
    id: string;
    title: string;
    slug: string;
    content: string;
    excerpt: string | null;
    author: string | null;
    tags: string[];
    metaDescription: string | null;
    metaKeywords: string[];
  };
};

export function NewsForm({ post }: Props) {
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();
  const isEdit = !!post;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: post?.title || "",
      slug: post?.slug || "",
      content: post?.content || "",
      excerpt: post?.excerpt || "",
      author: post?.author || "",
      tags: post?.tags.join(", ") || "",
      metaDescription: post?.metaDescription || "",
      metaKeywords: post?.metaKeywords.join(", ") || "",
    },
  });

  const title = form.watch("title");
  const slug = form.watch("slug");

  useEffect(() => {
    if (!isEdit && title) {
      const generatedSlug = generateSlug(title);
      form.setValue("slug", generatedSlug);
    }
  }, [title, isEdit, form]);

  async function onSubmit(values: FormValues) {
    setSubmitting(true);
    try {
      const tagsArray = values.tags
        ? values.tags.split(",").map((t) => t.trim()).filter(Boolean)
        : [];
      const keywordsArray = values.metaKeywords
        ? values.metaKeywords.split(",").map((k) => k.trim()).filter(Boolean)
        : [];

      if (isEdit && post) {
        await updateNewsPost({
          id: post.id,
          title: values.title,
          slug: values.slug,
          content: values.content,
          excerpt: values.excerpt || undefined,
          author: values.author || undefined,
          tags: tagsArray,
          metaDescription: values.metaDescription || undefined,
          metaKeywords: keywordsArray,
        });
      } else {
        await createNewsPost({
          title: values.title,
          slug: values.slug,
          content: values.content,
          excerpt: values.excerpt || undefined,
          author: values.author || undefined,
          tags: tagsArray,
          metaDescription: values.metaDescription || undefined,
          metaKeywords: keywordsArray,
        });
      }
      router.push("/dashboard/news");
      router.refresh();
    } catch (error) {
      console.error("Form submission failed", error);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-6">
      <nav className="text-sm text-foreground/70">
        <div className="flex items-center gap-2">
          <Link href="/dashboard/news" className="hover:text-foreground transition-colors">
            إدارة الأخبار
          </Link>
          <ArrowRight className="h-3 w-3" />
          <span className="text-foreground">{isEdit ? "تعديل" : "إنشاء جديد"}</span>
        </div>
      </nav>

      <header className="space-y-2">
        <h1 className="text-2xl font-bold">{isEdit ? "تعديل المنشور" : "إنشاء منشور جديد"}</h1>
        <p className="text-sm text-foreground/70">
          {isEdit ? "قم بتعديل بيانات المنشور" : "املأ البيانات لإنشاء منشور جديد"}
        </p>
      </header>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="rounded-2xl border border-foreground/10 bg-foreground/[0.05] p-6 space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>العنوان *</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="أدخل عنوان المنشور" />
                  </FormControl>
                  <FormDescription>
                    {field.value.length}/180 حرف — استهدف عنوانًا واضحًا وقصيرًا قدر الإمكان.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => {
                const displaySlug = field.value || (title ? generateSlug(title) : "");

                return (
                  <FormItem>
                    <FormLabel>الرابط (Slug) *</FormLabel>
                    <FormControl>
                      <div className="px-3 py-2 bg-muted rounded-md text-sm font-mono border border-input">
                        {displaySlug || "سيتم توليده تلقائيًا من العنوان"}
                      </div>
                    </FormControl>
                    <FormDescription>
                      الرابط: <code className="text-xs bg-foreground/10 px-1 py-0.5 rounded">
                        {displaySlug ? `.../news/${displaySlug}` : "..."}
                      </code>
                      <span className="block mt-1 text-xs text-foreground/70">حافظ على رابط قصير وواضح بدون تواريخ أو معلمات تتبع.</span>
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>المحتوى *</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="أدخل محتوى المنشور"
                      className="min-h-[300px]"
                    />
                  </FormControl>
                  <FormDescription>
                    {field.value.length}/5000 حرف — محتوى مركز يضيف قيمة حقيقية بدون حشو.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="excerpt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>الملخص</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="ملخص قصير للمنشور (اختياري)"
                      className="min-h-[100px]"
                    />
                  </FormControl>
                  <FormDescription>
                    {field.value?.length || 0}/500 حرف — ملخص قصير وواضح لجوهر الخبر.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="author"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>الكاتب</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="اسم الكاتب (اختياري)" />
                  </FormControl>
                  <FormDescription>
                    اسم الكاتب كما يظهر للجمهور بشكل متّسق.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>الوسوم</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="وسوم مفصولة بفواصل (اختياري)" />
                  </FormControl>
                  <FormDescription>
                    مثال: أخبار، تقنية، سعودية — وسوم مركّزة لتصنيف الخبر داخليًا.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="metaDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>وصف SEO</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="وصف للمحركات البحث (اختياري)"
                      className="min-h-[100px]"
                    />
                  </FormControl>
                  <FormDescription>
                    {field.value?.length || 0}/160 حرف — وصف جذاب يطابق محتوى الخبر بدون حشو.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="metaKeywords"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>كلمات مفتاحية SEO</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="كلمات مفصولة بفواصل (اختياري)" />
                  </FormControl>
                  <FormDescription>
                    مثال: تحديث_التطبيق، ميزة_جديدة — لاستخدام داخلي وتصنيف نوع الخبر.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex items-center justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              asChild
              disabled={submitting}
            >
              <Link href="/dashboard/news">إلغاء</Link>
            </Button>
            <Button type="submit" disabled={submitting}>
              {submitting ? "جاري الحفظ..." : isEdit ? "حفظ التعديلات" : "إنشاء المنشور"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}








