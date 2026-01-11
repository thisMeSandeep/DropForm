"use client";

import { updateFormStatus } from "@/actions/form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { useState, useTransition } from "react";
import { AlertCircle, Archive, CheckCircle2, PauseCircle } from "lucide-react";

interface SettingsFormProps {
  formId: string;
  currentStatus: "draft" | "published" | "paused" | "closed";
}

export default function SettingsForm({ formId, currentStatus }: SettingsFormProps) {
  const [status, setStatus] = useState<string>(currentStatus);
  const [isPending, startTransition] = useTransition();

  const handleStatusChange = async (newStatus: string) => {
    setStatus(newStatus);
  };

  const handleSave = () => {
    startTransition(async () => {
      const result = await updateFormStatus(formId, status as any);
      if (result.success) {
        toast.success("Form status updated successfully");
      } else {
        toast.error("Failed to update status");
        // Revert on error if needed
        setStatus(currentStatus);
      }
    });
  };

  const statusOptions = [
    {
      value: "published",
      label: "Published",
      description: "Form is live and collecting responses.",
      icon: CheckCircle2,
      color: "text-green-500",
    },
    {
      value: "paused",
      label: "Paused",
      description: "Form is temporarily disabled. Users will see a 'temporarily unavailable' message.",
      icon: PauseCircle,
      color: "text-orange-500",
    },
    {
      value: "closed",
      label: "Closed",
      description: "Form is closed and no longer accepting responses.",
      icon: Archive,
      color: "text-red-500",
    },
  ];

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Form Status</CardTitle>
          <CardDescription>
            Control the visibility and availability of your form.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup 
            value={status} 
            onValueChange={handleStatusChange}
            className="grid gap-4 pt-2"
          >
            {statusOptions.map((option) => (
              <div key={option.value} className="flex items-start space-x-3 space-y-0 rounded-md border p-4 hover:bg-muted/50 transition-colors [&:has(button[data-state=checked])]:bg-muted/50 [&:has(button[data-state=checked])]:border-primary">
                 <RadioGroupItem value={option.value} id={option.value} className="mt-1" />
                 <div className="grid gap-1.5 leading-none w-full cursor-pointer" onClick={() => handleStatusChange(option.value)}>
                    <Label htmlFor={option.value} className="text-base font-semibold cursor-pointer flex items-center gap-2">
                         <option.icon className={`h-4 w-4 ${option.color}`} />
                         {option.label}
                    </Label>
                    <p className="text-sm text-muted-foreground">{option.description}</p>
                 </div>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <Button onClick={handleSave} disabled={isPending || status === currentStatus}>
            {isPending ? "Saving..." : "Save Changes"}
          </Button>
        </CardFooter>
      </Card>
      
      {status === 'closed' && (
           <Card className="border-red-100 bg-red-50 dark:bg-red-950/10 dark:border-red-900/50">
             <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2 text-red-600 dark:text-red-400">
                    <AlertCircle className="h-4 w-4" />
                    Danger Zone
                </CardTitle>
             </CardHeader>
             <CardContent>
                 <p className="text-sm text-muted-foreground mb-4">
                     Deleting a form is permanent and cannot be undone. All responses will be lost.
                 </p>
                 <Button variant="destructive" size="sm">
                    Delete Form
                 </Button>
             </CardContent>
           </Card>
      )}
    </div>
  );
}
