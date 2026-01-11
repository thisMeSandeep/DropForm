"use client";

import { useEffect, useEffectEvent, useState } from "react";
import { useFormStore } from "@/store/useFormStore";
import { FormRenderer } from "@/components/custom/FormRenderer";
import { Button } from "@/components/ui/button";
import { Share2, ArrowLeft, Globe } from "lucide-react";
import Link from "next/link";
import { publishForm } from "@/actions/form"; // Import newly created action
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const Preview = () => {
    const { form, setForm } = useFormStore(); // Destructure setForm to update local state
    const [mounted, setMounted] = useState(false);
    const [isPublishing, setIsPublishing] = useState(false);
    const router = useRouter();


    const searchParams = useSearchParams();
    const formId = searchParams.get("id");

    const onMount = useEffectEvent(() => {
        setMounted(true);
    });

    useEffect(() => {
        onMount();
    }, []);


    // Handle form publish
    const handlePublish = async (e: React.MouseEvent) => {
        e.preventDefault();

        console.log("Publish button clicked");
        console.log("Form ID:", formId);

        if (!formId) {
            toast.error("Form ID not found. Please save the form first.");
            return;
        }

        setIsPublishing(true);
        try {
            console.log("Calling publishForm server action...");
            const result = await publishForm(formId);
            console.log("Publish result:", result);

            if (result.success && result.data) {
                toast.success("Form published successfully!");
                setForm({ ...form, status: "published" });
            } else {
                toast.error(result.error || "Failed to publish form");
            }
        } catch (error) {
            console.error("Publish error:", error);
            toast.error("An error occurred while publishing");
        } finally {
            setIsPublishing(false);
        }
    };

    if (!mounted) {
        return <div className="h-screen flex items-center justify-center">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            {/* Header / Toolbar */}
            <header className="bg-background border-b h-16 flex items-center justify-between px-6 sticky top-0 z-50">
                <div className="flex items-center gap-4">
                    <Link href={`/form-editor?id=${formId}`} className="text-muted-foreground hover:text-foreground transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <h1 className="font-semibold text-lg">{form.title || "Untitled Form"}</h1>
                    <span className={`text-xs px-2 py-0.5 rounded-full uppercase font-medium tracking-wider ${form.status === 'published'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                        }`}>
                        {form.status}
                    </span>
                </div>

                <div className="flex items-center gap-3">
                    {form.status === "published" ? (
                        <Button size="sm" variant="secondary" className="gap-2 cursor-not-allowed opacity-80" disabled>
                            <Globe className="w-4 h-4" /> Published
                        </Button>
                    ) : (
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button size="sm" className="gap-2 bg-zinc-900 hover:bg-zinc-800 text-white transition-all shadow-none cursor-pointer">
                                    <Globe className="w-4 h-4" /> Publish
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Publish Form?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Are you sure you want to publish this form? Once published, the schema cannot be edited to ensure data consistency.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={handlePublish} disabled={isPublishing}>
                                        {isPublishing ? "Publishing..." : "Confirm Publish"}
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    )}
                </div>
            </header>

            {/* Main Form Display */}
            <main className="flex-1 overflow-y-auto">
                <FormRenderer
                    title={form.title}
                    description={form.description}
                    brandLogo={form.brandLogo}
                    logoAlignment={form.logoAlignment}
                    fields={form.fieldSchema?.fields || []} // Safety check
                    design={form.designSchema}
                    readOnly={false}
                />
            </main>
        </div>
    );
};

export default Preview;