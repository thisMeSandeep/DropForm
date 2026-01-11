"use client";

import { FormField, FormDesign } from "@/types/formSchema";
import { FormRenderer } from "./FormRenderer";

interface TemplateThumbnailProps {
    template: {
        title: string;
        description?: string;
        brandLogo?: string;
        logoAlignment?: 'left' | 'center' | 'right';
        fieldSchema: { fields: FormField[] };
        designSchema: FormDesign;
    };
}

export const TemplateThumbnail = ({ template }: TemplateThumbnailProps) => {
    return (
        <div className="flex flex-col gap-3 group w-full max-w-[280px]">
            {/* Thumbnail Preview Area */}
            <div className="relative w-full aspect-4/3 bg-gray-50 border border-zinc-200 rounded-xl overflow-hidden group-hover:border-primary/40 transition-all duration-300 shadow-sm hover:shadow-md ring-1 ring-black/5">
                {/* Minified Form Content */}
                <div
                    className="absolute top-0 left-0 origin-top-left pointer-events-none select-none"
                    style={{
                        transform: "scale(0.28)", // Same scale as FormPreviewCard
                        width: "1000px",
                    }}
                >
                    <FormRenderer
                        title={template.title}
                        description={template.description}
                        brandLogo={template.brandLogo}
                        logoAlignment={template.logoAlignment}
                        fields={template.fieldSchema?.fields || []}
                        design={template.designSchema}
                        readOnly
                    />
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-transparent group-hover:bg-black/2 transition-colors pointer-events-none" />
            </div>

            {/* Title Only */}
            <div className="flex items-start justify-between px-1.5 mt-0.5">
                <h3 className="text-[14px] font-semibold text-zinc-900 truncate leading-tight w-full">
                    {template.title}
                </h3>
            </div>
        </div>
    );
};
export default TemplateThumbnail;