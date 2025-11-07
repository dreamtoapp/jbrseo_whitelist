import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main dir="rtl" className="min-h-screen bg-background text-foreground antialiased">
      <div className="container mx-auto px-4 py-10">
        <div className="mx-auto flex max-w-3xl flex-col gap-12">
          <section className="space-y-6">
            <Skeleton className="h-10 w-48 rounded-2xl bg-foreground/15" />
            <div className="space-y-4">
              <Skeleton className="h-12 w-3/4" />
              <Skeleton className="h-6 w-2/3" />
              <Skeleton className="h-6 w-1/2" />
            </div>
            <div className="space-y-3">
              <Skeleton className="h-5 w-full max-w-sm" />
              <Skeleton className="h-5 w-full max-w-sm" />
              <Skeleton className="h-5 w-full max-w-sm" />
            </div>
          </section>

          <section className="rounded-3xl border border-foreground/10 bg-foreground/[0.05] backdrop-blur-xl p-6 md:p-8 space-y-6">
            <div className="rounded-2xl border border-foreground/10 bg-background p-6 space-y-4">
              <div className="flex items-center gap-3">
                <Skeleton className="h-9 w-9 rounded-xl" />
                <Skeleton className="h-5 w-32" />
              </div>
              <Skeleton className="h-7 w-2/3" />
              <Skeleton className="h-5 w-3/4" />
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <Skeleton className="h-20" />
                <Skeleton className="h-20" />
                <Skeleton className="h-20" />
              </div>
            </div>

            <div className="rounded-2xl border border-foreground/10 bg-background p-6 space-y-5">
              <Skeleton className="h-7 w-1/2" />
              <Skeleton className="h-5 w-2/3" />
              <div className="space-y-4">
                <Skeleton className="h-12" />
                <Skeleton className="h-12" />
                <Skeleton className="h-12" />
                <Skeleton className="h-12" />
                <Skeleton className="h-12" />
              </div>
              <Skeleton className="h-11 w-full rounded-xl" />
              <div className="flex flex-wrap items-center gap-3">
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-5 w-48" />
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

