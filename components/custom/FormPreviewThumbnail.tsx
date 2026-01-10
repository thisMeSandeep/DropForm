"use client";

import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { FormRenderer, FormField, FormDesign } from "./FormRenderer";

interface FormThumbnailProps {
    title: string;
    description?: string;
    brandLogo?: string;
    logoAlignment?: 'left' | 'center' | 'right';
    fieldSchema: { fields: FormField[] };
    designSchema: FormDesign;
    className?: string;
}

export const FormPreviewThumbnail = ({
    title,
    description,
    brandLogo,
    logoAlignment,
    fieldSchema,
    designSchema,
    className
}: FormThumbnailProps) => {
    // Scaling logic: 1000px -> 200px (0.2 scale)
    return (
        <div className={cn(
            "relative w-full aspect-4/3 bg-gray-50 border border-gray-200 rounded-lg overflow-hidden group hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-md",
            className
        )}>
            {/* The Scaled Wrapper */}
            <div
                className="absolute top-0 left-0 origin-top-left pointer-events-none"
                style={{
                    transform: "scale(0.2)",
                    width: "1000px",
                }}
            >
                <FormRenderer
                    title={title}
                    description={description}
                    brandLogo={brandLogo}
                    logoAlignment={logoAlignment}
                    fields={fieldSchema?.fields || []}
                    design={designSchema}
                    readOnly
                />
            </div>

            {/* Interaction Overlay */}
            <div className="absolute inset-0 bg-transparent group-hover:bg-black/5 transition-colors pointer-events-none" />
        </div>
    );
};

export const BlankFormCard = () => {
    return (
        <div className="flex flex-col gap-3 group cursor-pointer w-full max-w-[220px]">
            <div className="relative w-full aspect-4/3 bg-white border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center group-hover:border-primary group-hover:bg-primary/5 transition-all duration-300 overflow-hidden">
                <Plus className="w-12 h-12 text-gray-400 group-hover:text-primary transition-colors" />
            </div>
            <span className="text-sm font-medium text-gray-700 px-1">Blank form</span>
        </div>
    );
};

export const FormCard = ({ form }: { form: any }) => {
    return (
        <div className="flex flex-col gap-3 group cursor-pointer w-full max-w-[220px]">
            <FormPreviewThumbnail
                title={form.title}
                description={form.description}
                brandLogo={form.brandLogo}
                logoAlignment={form.logoAlignment}
                fieldSchema={form.fieldSchema}
                designSchema={form.designSchema}
            />
            <div className="flex flex-col px-1">
                <span className="text-sm font-medium text-gray-900 truncate">{form.title}</span>
                <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">Form</span>
                    <span className="text-[10px] text-gray-400">Opened Oct 24</span>
                </div>
            </div>
        </div>
    );
};

export const FormPreviewGrid = ({ forms }: { forms: any[] }) => {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8 p-8">
            <BlankFormCard />
            {forms.map((form, idx) => (
                <FormCard key={idx} form={form} />
            ))}
        </div>
    );
};
