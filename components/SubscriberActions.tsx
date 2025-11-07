"use client";

import { useState } from "react";
import { Pencil, Trash } from "lucide-react";
import { useRouter } from "next/navigation";

import { deleteSubscriber } from "@/actions/subscribers";
import { EditSubscriberDialog } from "@/components/EditSubscriberDialog";
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

type Props = {
  subscriber: {
    id: string;
    name: string | null;
    email: string;
    phone: string | null;
    siteType: string | null;
    siteUrl: string | null;
    verified?: boolean;
  };
};

export function SubscriberActions({ subscriber }: Props) {
  const [showEdit, setShowEdit] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    setDeleting(true);
    try {
      await deleteSubscriber(subscriber.id);
      router.refresh();
    } finally {
      setDeleting(false);
      setConfirmOpen(false);
    }
  }

  return (
    <>
      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label="تعديل"
          title="تعديل"
          onClick={() => setShowEdit(true)}
          className="inline-flex items-center justify-center rounded-lg border border-foreground/15 p-1.5 hover:bg-foreground/10"
        >
          <Pencil className="h-3 w-3" />
        </button>
        <AlertDialog open={confirmOpen} onOpenChange={(open) => !deleting && setConfirmOpen(open)}>
          <AlertDialogTrigger asChild>
            <button
              type="button"
              aria-label="حذف"
              title="حذف"
              disabled={deleting}
              className="inline-flex items-center justify-center rounded-lg border border-red-400 text-red-500 p-1.5 hover:bg-red-500/10 disabled:opacity-50"
            >
              <Trash className="h-3 w-3" />
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent dir="rtl">
            <AlertDialogHeader>
              <AlertDialogTitle>تأكيد حذف المشترك</AlertDialogTitle>
              <AlertDialogDescription>
                سيتم حذف بيانات المشترك {subscriber.name ?? subscriber.email} نهائيًا. لن تستطيع التراجع عن هذه العملية.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={deleting}>إلغاء</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete} disabled={deleting}>
                {deleting ? "جارٍ الحذف..." : "حذف المشترك"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      {showEdit && (
        <EditSubscriberDialog
          subscriber={subscriber}
          onClose={() => {
            setShowEdit(false);
            router.refresh();
          }}
        />
      )}
    </>
  );
}

