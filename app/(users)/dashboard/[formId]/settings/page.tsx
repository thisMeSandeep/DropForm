import { getFormStats } from "@/actions/form";
import { notFound } from "next/navigation";
import SettingsForm from "./SettingsForm";

export default async function SettingsPage({ params }: { params: Promise<{ formId: string }> }) {
  const { formId } = await params;
  const { success, data: form } = await getFormStats(formId);

  if (!success || !form) {
    return notFound();
  }

  return (
    <div className="max-w-4xl mx-auto py-4">
      <SettingsForm 
        formId={form.id} 
        currentStatus={form.status as "draft" | "published" | "paused" | "closed"} 
      />
    </div>
  );
}