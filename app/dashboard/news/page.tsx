import { prisma } from "@/helpers/prisma";
import { NewsPageClient } from "./components/NewsPageClient";
import { DashboardNav } from "../components/DashboardNav";

export default async function DashboardNewsPage() {
  const posts = await prisma.newsPost.findMany({
    orderBy: [{ createdAt: "desc" }],
    take: 50,
    select: {
      id: true,
      title: true,
      slug: true,
      excerpt: true,
      author: true,
      tags: true,
      published: true,
      publishedAt: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return (
    <div dir="rtl" className="min-h-screen bg-background text-foreground">
      <DashboardNav />
      <main className="container mx-auto px-4 py-10 space-y-8">
        <NewsPageClient initialPosts={posts} />
      </main>
    </div>
  );
}

