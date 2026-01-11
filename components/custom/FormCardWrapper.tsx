"use client";

import { useState } from "react";

import { FormPreviewThumbnail } from "@/components/custom/FormPreviewThumbnail";
import { deleteForm } from "@/actions/form";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { FormSchema } from "@/types/formSchema";

interface FormCardWrapperProps {
    form: FormSchema; // Using any to match existing usage in page.tsx, refine type if possible
}

export function FormCardWrapper({ form }: FormCardWrapperProps) {
    const [isDeleting, setIsDeleting] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const router = useRouter();

    const handleDelete = async () => {
        // If published, show warning first
        if (form.status === "published" && !showDeleteDialog) {
            setShowDeleteDialog(true);
            return;
        }

        try {
            setIsDeleting(true);
            const result = await deleteForm(form.id ?? "");

            if (result.success) {
                toast.success("Form deleted successfully");
                router.refresh();
            } else {
                toast.error(result.error || "Failed to delete form");
            }
        } catch (error) {
            console.error("Delete error:", error);
            toast.error("An error occurred");
        } finally {
            setIsDeleting(false);
            setShowDeleteDialog(false);
        }
    };

    return (
        <>
            <div className="relative group">
                <FormPreviewThumbnail
                    form={form}
                    onDelete={handleDelete}
                />
            </div>

            <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure you want to delete this form?</AlertDialogTitle>
                        <AlertDialogDescription>
                            All responses will be deleted and cannot be recovered. This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={(e) => {
                                e.preventDefault();
                                handleDelete();
                            }}
                            className="bg-red-600 hover:bg-red-700"
                        >
                            {isDeleting ? "Deleting..." : "Delete Form"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
