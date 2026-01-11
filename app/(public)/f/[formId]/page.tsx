import { getPublicForm } from "@/actions/form";
import { notFound } from "next/navigation";
import PublicFormView from "./PublicFormView";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Ban } from "lucide-react";
import { Metadata } from "next";
import { FormSchema } from "@/types/formSchema";

interface PageProps {
  params: Promise<{ formId: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { formId } = await params;
  const { success, data: form } = await getPublicForm(formId);

  if (!success || !form) {
    return {
      title: "Form Not Found",
    };
  }

  return {
    title: form.title,
    description: form.description || "Please fill out this form.",
  };
}

export default async function PublicFormPage({ params }: PageProps) {
  const { formId } = await params;
  const { success, data: form } = await getPublicForm(formId);

  if (!success || !form) {
    return notFound();
  }

  // Handle specific statuses
  if (form.status === 'paused') {
    return (
        <Card className="w-full max-w-md mx-auto mt-20 text-center">
            <CardHeader className="flex flex-col items-center">
                <div className="bg-orange-100 p-3 rounded-full mb-4">
                     <AlertCircle className="h-8 w-8 text-orange-600" />
                </div>
                <CardTitle>Form Temporarily Unavailable</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">
                    This form is currently paused and not accepting new responses. Please try again later.
                </p>
            </CardContent>
        </Card>
    );
  }

  if (form.status === 'closed') {
    return (
        <Card className="w-full max-w-md mx-auto mt-20 text-center">
             <CardHeader className="flex flex-col items-center">
                <div className="bg-red-100 p-3 rounded-full mb-4">
                     <Ban className="h-8 w-8 text-red-600" />
                </div>
                <CardTitle>Form Closed</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">
                    This form is no longer accepting responses.
                </p>
            </CardContent>
        </Card>
    );
  }

  return <PublicFormView form={form as unknown as Partial<FormSchema> & { id: string }} />;
}


