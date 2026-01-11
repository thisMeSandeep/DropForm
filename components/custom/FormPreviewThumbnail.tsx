"use client";

import { Trash2 } from "lucide-react";
import { FormField, FormDesign } from "@/types/formSchema";
import { format } from "date-fns";
import { FormRenderer } from "./FormRenderer";

import Link from "next/link";
// ... imports

interface FormPreviewCardProps {
    form: {
        id: string; // Added id
        title: string;
        description?: string;
        brandLogo?: string;
        logoAlignment?: 'left' | 'center' | 'right';
        fieldSchema: { fields: FormField[] };
        designSchema: FormDesign;
        createdAt?: string | Date;
    };
    onDelete?: () => void;
}

export const FormPreviewThumbnail = ({ form, onDelete }: FormPreviewCardProps) => {
    const creationDate = form.createdAt ? new Date(form.createdAt) : new Date();

    return (
        <div className="flex flex-col gap-3 group w-full max-w-[280px]">
            {/* Thumbnail Preview Area */}
            <Link href={`/form-editor?id=${form.id}`} className="block">
                <div className="relative w-full aspect-4/3 bg-gray-50 border border-zinc-200 rounded-xl overflow-hidden group-hover:border-primary/40 transition-all duration-300 shadow-sm hover:shadow-md ring-1 ring-black/5">
                    {/* Minified Form Content */}
                    <div
                        className="absolute top-0 left-0 origin-top-left pointer-events-none select-none"
                        style={{
                            transform: "scale(0.28)", // Adjusted scale for 280px width
                            width: "1000px",
                        }}
                    >
                        <FormRenderer
                            title={form.title}
                            description={form.description}
                            brandLogo={form.brandLogo}
                            logoAlignment={form.logoAlignment}
                            fields={form.fieldSchema?.fields || []}
                            design={form.designSchema}
                            readOnly
                        />
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-transparent group-hover:bg-black/2 transition-colors pointer-events-none" />
                </div>
            </Link>

            {/* Metadata and Actions */}
            <div className="flex items-start justify-between px-1.5 mt-0.5">
                <div className="flex flex-col gap-0.5 overflow-hidden">
                    <Link href={`/form-editor?id=${form.id}`} className="block">
                        <h3 className="text-[14px] font-semibold text-zinc-900 truncate pr-2 leading-tight hover:text-primary transition-colors">
                            {form.title}
                        </h3>
                    </Link>
                    {form.createdAt && (
                        <div className="flex items-center gap-1.5">
                            <span className="text-[11px] font-medium text-zinc-400 uppercase tracking-tight">Form</span>
                            <span className="w-1 h-1 rounded-full bg-zinc-300" />
                            <span className="text-[11px] text-zinc-500 font-medium">
                                {format(new Date(form.createdAt), "MMM d, yyyy")}
                            </span>
                        </div>
                    )}
                </div>

                {/* Quick Delete Action */}
                {onDelete && (
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onDelete();
                        }}
                        className="p-2 -mr-1 text-zinc-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200 group/btn cursor-pointer"
                        title="Delete form"
                    >
                        <Trash2 className="w-4 h-4 opacity-70 group-hover/btn:opacity-100" />
                    </button>
                )}
            </div>
        </div>
    );
};
