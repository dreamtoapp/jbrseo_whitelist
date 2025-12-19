"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";

import { auth } from "@/auth";
import { prisma } from "@/helpers/prisma";
import { generateSlug, ensureUniqueSlug } from "@/helpers/seo";

async function requireAdmin() {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") {
    throw new Error("unauthorized");
  }
  return session;
}

const createSchema = z.object({
  title: z.string().trim().min(1).max(180),
  slug: z.string().trim().min(1).max(100).optional(),
  content: z.string().trim().min(1).max(5000),
  excerpt: z.string().trim().max(500).optional(),
  author: z.string().trim().max(100).optional(),
  tags: z.array(z.string().trim().max(50)).optional(),
  metaDescription: z.string().trim().max(160).optional(),
  metaKeywords: z.array(z.string().trim().max(50)).optional(),
});

const updateSchema = createSchema.extend({
  id: z.string(),
});

export async function createNewsPost(input: {
  title: string;
  slug?: string;
  content: string;
  excerpt?: string;
  author?: string;
  tags?: string[];
  metaDescription?: string;
  metaKeywords?: string[];
}) {
  try {
    await requireAdmin();
    const data = createSchema.parse(input);

    const baseSlug = data.slug || generateSlug(data.title);
    const uniqueSlug = await ensureUniqueSlug(baseSlug, prisma);

    await prisma.newsPost.create({
      data: {
        title: data.title,
        slug: uniqueSlug,
        content: data.content,
        excerpt: data.excerpt || null,
        author: data.author || null,
        tags: data.tags || [],
        metaDescription: data.metaDescription || null,
        metaKeywords: data.metaKeywords || [],
        published: false,
        publishedAt: null,
      },
    });

    revalidatePath("/dashboard/news");
    revalidatePath("/news");

    return { success: true } as const;
  } catch (error) {
    console.error("createNewsPost failed", error);
    return { success: false, error: "server" } as const;
  }
}

export async function updateNewsPost(input: {
  id: string;
  title: string;
  slug?: string;
  content: string;
  excerpt?: string;
  author?: string;
  tags?: string[];
  metaDescription?: string;
  metaKeywords?: string[];
}) {
  try {
    await requireAdmin();
    const data = updateSchema.parse(input);

    const existing = await prisma.newsPost.findUnique({
      where: { id: data.id },
      select: { slug: true },
    });

    if (!existing) {
      return { success: false, error: "not_found" } as const;
    }

    const baseSlug = data.slug || generateSlug(data.title);
    const uniqueSlug =
      baseSlug === existing.slug
        ? existing.slug
        : await ensureUniqueSlug(baseSlug, prisma, data.id);

    await prisma.newsPost.update({
      where: { id: data.id },
      data: {
        title: data.title,
        slug: uniqueSlug,
        content: data.content,
        excerpt: data.excerpt || null,
        author: data.author || null,
        tags: data.tags || [],
        metaDescription: data.metaDescription || null,
        metaKeywords: data.metaKeywords || [],
      },
    });

    revalidatePath("/dashboard/news");
    revalidatePath("/news");
    revalidatePath(`/news/${encodeURIComponent(uniqueSlug)}`);

    return { success: true } as const;
  } catch (error) {
    console.error("updateNewsPost failed", error);
    return { success: false, error: "server" } as const;
  }
}

export async function togglePublish(postId: string) {
  try {
    await requireAdmin();

    const post = await prisma.newsPost.findUnique({
      where: { id: postId },
      select: { published: true, slug: true },
    });
    if (!post) return { success: false, error: "not_found" } as const;

    const nextPublished = !post.published;

    await prisma.newsPost.update({
      where: { id: postId },
      data: {
        published: nextPublished,
        publishedAt: nextPublished ? new Date() : null,
      },
    });

    revalidatePath("/dashboard/news");
    revalidatePath("/news");
    revalidatePath(`/news/${encodeURIComponent(post.slug)}`);

    return { success: true } as const;
  } catch (error) {
    console.error("togglePublish failed", error);
    return { success: false, error: "server" } as const;
  }
}

export async function deleteNewsPost(postId: string) {
  try {
    await requireAdmin();

    const post = await prisma.newsPost.findUnique({
      where: { id: postId },
      select: { slug: true },
    });

    await prisma.newsPost.delete({ where: { id: postId } });

    revalidatePath("/dashboard/news");
    revalidatePath("/news");
    if (post) {
      revalidatePath(`/news/${encodeURIComponent(post.slug)}`);
    }

    return { success: true } as const;
  } catch (error) {
    console.error("deleteNewsPost failed", error);
    return { success: false, error: "server" } as const;
  }
}

