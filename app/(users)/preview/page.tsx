"use client";

import React, { useEffect, useState } from "react";
import { useFormStore } from "@/store/useFormStore";
import { FormRenderer } from "@/components/custom/FormRenderer";
import { Button } from "@/components/ui/button";
import { Share2, Save, ArrowLeft } from "lucide-react";
import Link from "next/link";

const Preview = () => {
    const { form } = useFormStore();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleSave = () => {
        // Logic to save the form to backend would go here
        alert("Form saved! (Mock functionality)");
        console.log("Saving form schema:", form);
    };

    if (!mounted) {
        return <div className="h-screen flex items-center justify-center">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            {/* Header / Toolbar */}
            <header className="bg-background border-b h-16 flex items-center justify-between px-6 sticky top-0 z-50">
                <div className="flex items-center gap-4">
                    <Link href="/form-editor" className="text-muted-foreground hover:text-foreground transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <h1 className="font-semibold text-lg">{form.title || "Untitled Form"}</h1>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary uppercase font-medium tracking-wider">
                        {form.status}
                    </span>
                </div>

                <div className="flex items-center gap-3">
                    <Button variant="outline" size="sm" className="gap-2">
                        <Share2 className="w-4 h-4" /> Share
                    </Button>
                    <Button size="sm" className="gap-2" onClick={handleSave}>
                        <Save className="w-4 h-4" /> Save Form
                    </Button>
                </div>
            </header>

            {/* Main Form Display */}
            <main className="flex-1 overflow-y-auto">
                <FormRenderer
                    title={form.title}
                    description={form.description}
                    brandLogo={form.brandLogo}
                    logoAlignment={form.logoAlignment}
                    fields={form.fieldSchema.fields}
                    design={form.designSchema}
                    readOnly={false} // Interactive in preview
                />
            </main>
        </div>
    );
};

export default Preview;