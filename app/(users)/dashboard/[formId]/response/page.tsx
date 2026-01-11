import { getFormResponses } from "@/actions/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { notFound } from "next/navigation";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export default async function ResponsesPage({ params }: { params: Promise<{ formId: string }> }) {
  const { formId } = await params;
  const { success, data } = await getFormResponses(formId);

  if (!success || !data) {
    return notFound();
  }

  const { responses, fieldSchema } = data;
  
  // Safe cast for fieldSchema
  const schema = fieldSchema as unknown as { fields: Array<{ id: string; label: string; type: string }> };
  const fields = schema?.fields || [];
  
  if (responses.length === 0) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Responses</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
                    <p>No responses yet.</p>
                </div>
            </CardContent>
        </Card>
    );
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Responses ({responses.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[600px] w-full rounded-md border">
            <div className="w-full">
            <table className="w-full caption-bottom text-sm text-left">
                <thead className="[&_tr]:border-b">
                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground min-w-[150px]">
                        Submission Date
                    </th>
                    {fields.map((field) => (
                    <th key={field.id} className="h-12 px-4 text-left align-middle font-medium text-muted-foreground min-w-[200px]">
                        {field.label}
                    </th>
                    ))}
                </tr>
                </thead>
                <tbody className="[&_tr:last-child]:border-0">
                {responses.map((response) => {
                    const values = response.values as Record<string, any>;
                    return (
                        <tr key={response.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                        <td className="p-4 align-middle">
                            {new Date(response.createdAt).toLocaleString()}
                        </td>
                        {fields.map((field) => (
                            <td key={field.id} className="p-4 align-middle">
                            {values[field.id]?.toString() || "-"}
                            </td>
                        ))}
                        </tr>
                    );
                })}
                </tbody>
            </table>
            </div>
            <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </CardContent>
    </Card>
  );
}