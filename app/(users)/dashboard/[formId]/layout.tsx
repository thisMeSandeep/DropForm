import { getFormStats } from "@/actions/form";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import DashboardNav from "./DashboardNav";
import { Badge } from "@/components/ui/badge";

import ShareButton from "./ShareButton";

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ formId: string }>;
}) {
    const { formId } = await params;
    const { success, data: form } = await getFormStats(formId);

    if (!success || !form) {
        return notFound();
    }

    const publicUrl = `${process.env.NEXT_PUBLIC_APP_URL}/f/${form.id}`;

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 pt-6 pb-0">
          <div className="flex items-center gap-4 mb-6">
            <Link href="/forms">
              <Button variant="ghost" size="icon" className="shrink-0">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <div className="flex items-center gap-3">
                 <h1 className="text-xl font-bold truncate max-w-75 sm:max-w-md" title={form.title}>{form.title}</h1>
                 <Badge variant={form.status === 'published' ? 'default' : 'secondary'} className="capitalize">
                    {form.status}
                 </Badge>
              </div>
              <div className="flex items-center text-xs text-muted-foreground mt-1 gap-2">
                 <span>Created {new Date(form.createdAt).toLocaleDateString()}</span>
                 {form.status === 'published' && (
                    <>
                        <span>•</span>
                        <a href={publicUrl} target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-primary transition-colors">
                            visit link <ExternalLink className="ml-1 h-3 w-3" />
                        </a>
                    </>
                 )}
              </div>
            </div>
            
            <div className="ml-auto flex items-center gap-2">
                <Link href={`/form-editor?id=${form.id}`}>
                    <Button variant="outline" size="sm">
                        Edit Form
                    </Button>
                </Link>
                <ShareButton formId={form.id} />
            </div>
          </div>
          <DashboardNav formId={form.id} />
        </div>
      </header>
      <main className="flex-1 container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}
