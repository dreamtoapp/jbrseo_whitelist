import { Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NewsActions } from "./NewsActions";

type NewsPostRow = {
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
  posts: NewsPostRow[];
  formatDate: (date: Date) => string;
};

export function NewsTable({ posts, formatDate }: Props) {
  return (
    <div className="rounded-2xl border border-foreground/10 bg-foreground/[0.05] overflow-hidden">
      <div className="p-6 border-b border-foreground/10">
        <h2 className="text-xl font-bold">كل المنشورات</h2>
        <p className="text-sm text-foreground/70 mt-1">جميع منشورات الأخبار</p>
      </div>

      <div className="md:hidden p-4 space-y-4">
        {posts.length === 0 ? (
          <p className="text-center text-foreground/60">لا توجد منشورات حتى الآن</p>
        ) : (
          posts.map((post) => (
            <article
              key={post.id}
              className="space-y-3 rounded-2xl border border-foreground/10 bg-background p-4 shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    {post.published ? (
                      <Eye className="h-4 w-4 text-emerald-500 shrink-0" aria-hidden="true" />
                    ) : (
                      <EyeOff className="h-4 w-4 text-amber-500 shrink-0" aria-hidden="true" />
                    )}
                    <p className="text-sm font-semibold truncate">{post.title}</p>
                  </div>
                  {post.excerpt && (
                    <p className="text-xs text-foreground/70 line-clamp-2">{post.excerpt}</p>
                  )}
                </div>
              </div>

              <dl className="grid grid-cols-2 gap-3 text-xs text-foreground/70">
                {post.author && (
                  <div>
                    <dt className="font-semibold text-foreground">الكاتب</dt>
                    <dd>{post.author}</dd>
                  </div>
                )}
                <div>
                  <dt className="font-semibold text-foreground">الحالة</dt>
                  <dd>{post.published ? "منشور" : "مسودة"}</dd>
                </div>
                {post.tags.length > 0 && (
                  <div className="col-span-2">
                    <dt className="font-semibold text-foreground">الوسوم</dt>
                    <dd className="flex flex-wrap gap-1 mt-1">
                      {post.tags.slice(0, 3).map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md bg-foreground/10 text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                      {post.tags.length > 3 && (
                        <span className="text-xs text-foreground/60">+{post.tags.length - 3}</span>
                      )}
                    </dd>
                  </div>
                )}
              </dl>

              <div className="flex items-center justify-between gap-3">
                <span className="text-xs text-foreground/60">
                  {formatDate(post.publishedAt || post.createdAt)}
                </span>
                <NewsActions post={post} />
              </div>
            </article>
          ))
        )}
      </div>

      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-foreground/[0.02] border-b border-foreground/10">
            <tr>
              <th className="text-right p-4 text-sm font-semibold">الحالة</th>
              <th className="text-right p-4 text-sm font-semibold">العنوان</th>
              <th className="text-right p-4 text-sm font-semibold">الملخص</th>
              <th className="text-right p-4 text-sm font-semibold">الكاتب</th>
              <th className="text-right p-4 text-sm font-semibold">الوسوم</th>
              <th className="text-right p-4 text-sm font-semibold">التاريخ</th>
              <th className="text-right p-4 text-sm font-semibold">إجراءات</th>
            </tr>
          </thead>
          <tbody>
            {posts.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-8 text-center text-foreground/60">
                  لا توجد منشورات حتى الآن
                </td>
              </tr>
            ) : (
              posts.map((post) => (
                <tr
                  key={post.id}
                  className="border-b border-foreground/5 hover:bg-foreground/[0.02]"
                >
                  <td className="p-4 text-sm text-center">
                    {post.published ? (
                      <Eye className="mx-auto h-4 w-4 text-emerald-500" aria-hidden="true" />
                    ) : (
                      <EyeOff className="mx-auto h-4 w-4 text-amber-500" aria-hidden="true" />
                    )}
                  </td>
                  <td className="p-4">
                    <span className="block truncate max-w-[200px] font-medium">{post.title}</span>
                  </td>
                  <td className="p-4">
                    <span className="block truncate max-w-[250px] text-sm text-foreground/70">
                      {post.excerpt || "—"}
                    </span>
                  </td>
                  <td className="p-4 text-sm">{post.author || "—"}</td>
                  <td className="p-4">
                    {post.tags.length > 0 ? (
                      <div className="flex flex-wrap gap-1">
                        {post.tags.slice(0, 2).map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded-md bg-foreground/10 text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                        {post.tags.length > 2 && (
                          <span className="text-xs text-foreground/60">+{post.tags.length - 2}</span>
                        )}
                      </div>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td className="p-4 text-sm text-foreground/70">
                    {formatDate(post.publishedAt || post.createdAt)}
                  </td>
                  <td className="p-4 text-sm">
                    <NewsActions post={post} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}















