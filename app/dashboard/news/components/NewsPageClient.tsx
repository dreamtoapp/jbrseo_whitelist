"use client";

import Link from "next/link";
import { Plus } from "lucide-react";

import { NewsTable } from "./NewsTable";
import { Button } from "@/components/ui/button";

type NewsPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  author: string | null;
  tags: string[];
  published: boolean;
  publishedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

type Props = {
  initialPosts: NewsPost[];
};

function formatDate(date: Date): string {
  return date.toLocaleString("ar-SA", { dateStyle: "medium", timeStyle: "short" });
}

export function NewsPageClient({ initialPosts }: Props) {
  return (
    <>
      <header className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold">إدارة الأخبار</h1>
          <p className="text-sm text-foreground/70">
            قم بإنشاء وإدارة منشورات الأخبار للعملاء
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/news/create">
            <Plus className="h-4 w-4 ml-2" />
            إنشاء منشور جديد
          </Link>
        </Button>
      </header>

      <NewsTable posts={initialPosts} formatDate={formatDate} />
    </>
  );
}








