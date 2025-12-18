import { notFound } from "next/navigation";

import { prisma } from "@/helpers/prisma";
import { DashboardNav } from "../../../components/DashboardNav";
import { NewsForm } from "../../components/NewsForm";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditNewsPage({ params }: Props) {
  const { id } = await params;

  const post = await prisma.newsPost.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
      slug: true,
      content: true,
      excerpt: true,
      author: true,
      tags: true,
      metaDescription: true,
      metaKeywords: true,
    },
  });

  if (!post) {
    notFound();
  }

  return (
    <div dir="rtl" className="min-h-screen bg-background text-foreground">
      <DashboardNav />
      <main className="container mx-auto px-4 py-10">
        <div className="max-w-4xl mx-auto">
          <NewsForm post={post} />
        </div>
      </main>
    </div>
  );
}








