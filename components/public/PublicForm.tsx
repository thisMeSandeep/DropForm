"use client";

import { submitResponse } from "@/actions/form";
import {FormRenderer} from "@/components/custom/FormRenderer";
import { FormSchema } from "@/types/formSchema";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

export default function PublicForm({ form }: { form: FormSchema }) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (isPending) return;

    const formData = new FormData(e.currentTarget);
    const formValues: Record<string, any> = {};
    
    // Process FormData to handle potential arrays (like checkboxes)
    const keys = Array.from(new Set(Array.from(formData.keys())));
    for (const key of keys) {
        const values = formData.getAll(key);
        // If multiple values exist (checkboxes), keep as array. 
        // Note: FieldRenderer logic needs to be checked if it produces distinct names or same name for checkboxes.
        // Usually grouping checkboxes by 'name' yields multiple entries.
        if (values.length > 1) {
             formValues[key] = values;
        } else {
             formValues[key] = values[0];
        }
    }

    startTransition(async () => {
      const result = await submitResponse(form.id!, formValues);

      if (result.success) {
        setIsSubmitted(true);
        toast.success("Thank you! Your response has been recorded.");
      } else {
        toast.error(result.error || "Something went wrong. Please try again.");
      }
    });
  };

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] p-4 text-center animate-in fade-in zoom-in duration-500">
        <Card className="max-w-md w-full shadow-xl border-t-4 border-t-green-500">
             <CardContent className="pt-10 pb-10 flex flex-col items-center">
                <div className="rounded-full bg-green-100 p-4 mb-6">
                    <CheckCircle2 className="h-10 w-10 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Thank You!</h2>
                <p className="text-muted-foreground mb-8 text-lg">
                    Your response has been successfully submitted.
                </p>
                <div className="flex gap-4">
                     <Button variant="outline" onClick={() => window.location.reload()}>
                        Submit Another Response
                    </Button>
                    <Button asChild>
                        <Link href="/">Create Your Own Form</Link>
                    </Button>
                </div>
             </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <FormRenderer 
        {...form} 
        readOnly={isPending}
      />
      {isPending && (
          <div className="fixed inset-0 bg-background/50 backdrop-blur-sm z-50 flex items-center justify-center">
              <div className="flex items-center gap-2 bg-background p-4 rounded-lg shadow-lg border">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-r-transparent"/>
                  <span className="font-medium">Submitting...</span>
              </div>
          </div>
      )}
    </form>
  );
}
