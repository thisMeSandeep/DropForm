"use client";

import { submitResponse } from "@/actions/form";
import { FormRenderer } from "@/components/custom/FormRenderer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FormSchema } from "@/types/formSchema";
import { CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface PublicFormViewProps {
  form: Partial<FormSchema> & { id: string };
}

export default function PublicFormView({ form }: PublicFormViewProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const values: Record<string, any> = {};
      
      formData.forEach((value, key) => {
        if (values[key]) {
            if (Array.isArray(values[key])) {
                values[key].push(value);
            } else {
                values[key] = [values[key], value];
            }
        } else {
            values[key] = value;
        }
      });

      const result = await submitResponse(form.id, values);

      if (result.success) {
        setIsSubmitted(true);
        toast.success("Response submitted successfully!");
      } else {
        toast.error(result.error || "Failed to submit response");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-slate-50 p-4">
        <Card className="w-full max-w-2xl mx-auto text-center py-12 animate-in fade-in zoom-in duration-300">
            <CardContent className="flex flex-col items-center gap-4">
            <div className="h-16 w-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                <CheckCircle2 className="h-8 w-8" />
            </div>
            <h2 className="text-2xl font-bold">Thank You!</h2>
            <p className="text-muted-foreground">Your response has been recorded.</p>
            <Button variant="outline" onClick={() => window.location.reload()} className="mt-4">
                Submit Another Response
            </Button>
            </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
        <FormRenderer 
            {...(form as unknown as FormSchema)} 
            isSubmitting={isSubmitting}
        />
    </form>
  );
}
