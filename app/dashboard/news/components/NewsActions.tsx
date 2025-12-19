"use client";

import { useState } from "react";
import Link from "@/components/link";
import { Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";

import { deleteNewsPost, togglePublish } from "../actions/news";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

type Props = {
  post: {
    id: string;
    title: string;
    published: boolean;
  };
};

export function NewsActions({ post }: Props) {
  const [deleting, setDeleting] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [toggling, setToggling] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    setDeleting(true);
    try {
      await deleteNewsPost(post.id);
      router.refresh();
    } finally {
      setDeleting(false);
      setConfirmOpen(false);
    }
  }

  async function handleTogglePublish() {
    setToggling(true);
    try {
      await togglePublish(post.id);
      router.refresh();
    } finally {
      setToggling(false);
    }
  }

  return (
    <>
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          asChild
          className="h-8"
        >
          <Link href={`/dashboard/news/${post.id}/edit`}>
            <Pencil className="h-3 w-3 ml-1" />
            تعديل
          </Link>
        </Button>
        <Button
          type="button"
          variant={post.published ? "secondary" : "default"}
          size="sm"
          onClick={handleTogglePublish}
          disabled={toggling}
          className="h-8"
        >
          {post.published ? (
            <>
              <EyeOff className="h-3 w-3 ml-1" />
              إلغاء النشر
            </>
          ) : (
            <>
              <Eye className="h-3 w-3 ml-1" />
              نشر
            </>
          )}
        </Button>
        <AlertDialog open={confirmOpen} onOpenChange={(open) => !deleting && setConfirmOpen(open)}>
          <AlertDialogTrigger asChild>
            <Button
              type="button"
              variant="destructive"
              size="sm"
              disabled={deleting}
              className="h-8"
            >
              <Trash2 className="h-3 w-3 ml-1" />
              حذف
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent dir="rtl">
            <AlertDialogHeader>
              <AlertDialogTitle>تأكيد حذف المنشور</AlertDialogTitle>
              <AlertDialogDescription>
                سيتم حذف المنشور &quot;{post.title}&quot; نهائيًا. لن تستطيع التراجع عن هذه العملية.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={deleting}>إلغاء</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete} disabled={deleting}>
                {deleting ? "جارٍ الحذف..." : "حذف المنشور"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </>
  );
}















