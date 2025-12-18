import { Suspense } from "react";
import { VerifyContent } from "./components/VerifyContent";

export default function VerifyPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background text-foreground flex items-center justify-center">جاري التحميل…</div>}>
      <VerifyContent />
    </Suspense>
  );
}


