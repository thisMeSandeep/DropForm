"use client";

import { useRouter } from "next/navigation";
import { useFormStore } from "@/store/useFormStore";
import { templates } from "@/data/formData";
import { TemplateThumbnail } from "@/components/custom/TemplateThumbnail";
import { FormSchema } from "@/types/formSchema";

const TemplateList = () => {
    const router = useRouter();
    const { setForm } = useFormStore();

    const handleSelectTemplate = (template:any) => {
        // Create a new schema from the template
        const newForm: FormSchema = {
            ...template,
            status: "draft",
            createdAt: new Date().toISOString(),
        };

        setForm(newForm);
        router.push("/form-editor");
    };

    const handleCreateBlank = () => {
        // Create fresh blank form schema
        const blankForm: FormSchema = {
            title: "Untitled Form",
            description: "",
            brandLogo: "",
            logoAlignment: "left",
            status: "draft",
            createdAt: new Date().toISOString(),
            fieldSchema: { version: 1, fields: [] },
            designSchema: {
                primaryColor: "#000000",
                backgroundColor: "#ffffff",
                formBackground: "#ffffff",
                textColor: "#000000",
                borderRadius: "md",
                spacing: "normal",
                fieldStyles: { labelPosition: "top", inputVariant: "outline" },
                button: { text: "Submit", variant: "default" }
            }
        };
        setForm(blankForm);
        router.push("/form-editor");
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {/* Create Blank Card */}
            <div
                onClick={handleCreateBlank}
                className="flex flex-col gap-3 group w-full cursor-pointer"
            >
                <div className="relative w-full aspect-4/3 bg-white border border-dashed border-zinc-300 rounded-xl overflow-hidden group-hover:border-primary group-hover:bg-primary/5 transition-all duration-300 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 4.5v15m7.5-7.5h-15"
                            />
                        </svg>
                    </div>
                </div>
                <div className="flex flex-col gap-0.5">
                    <h3 className="text-[14px] font-semibold text-zinc-900 leading-tight">
                        Blank Form
                    </h3>
                    <span className="text-[11px] font-medium text-zinc-500">
                        Start from scratch
                    </span>
                </div>
            </div>

            {/* Template Cards */}
            {templates.map((template, idx) => (
                <div
                    key={idx}
                    className="cursor-pointer"
                    onClick={() => handleSelectTemplate(template)}
                >
                    <TemplateThumbnail template={template} />
                </div>
            ))}
        </div>
    );
};

export default TemplateList;
