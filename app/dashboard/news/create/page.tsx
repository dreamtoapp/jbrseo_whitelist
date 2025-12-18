import { DashboardNav } from "../../components/DashboardNav";
import { NewsForm } from "../components/NewsForm";

export default function CreateNewsPage() {
  return (
    <div dir="rtl" className="min-h-screen bg-background text-foreground">
      <DashboardNav />
      <main className="container mx-auto px-4 py-10">
        <div className="max-w-4xl mx-auto">
          <NewsForm />
        </div>
      </main>
    </div>
  );
}








