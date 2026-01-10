"use client";

import { FormRenderer } from "@/components/custom/FormRenderer";
import { FormPreviewCard } from "@/components/custom/FormPreviewThumbnail";
import { FormTemplate, templates } from "@/data/formData";

// Using the data from the file the user referenced
const formSchema = {
    title: "Frontend Developer Job Application",
    description: "Apply for the frontend developer role",
    brandLogo: "/sampleLogo.png",
    logoAlignment: "center" as const,
    status: "published" as const,
    createdAt: new Date().toISOString(),
    fieldSchema: {
        version: 1,
        fields: [
            {
                name: "name",
                type: "text",
                label: "Full Name",
                required: true,
                placeholder: "John Doe"
            },
            {
                name: "email",
                type: "email",
                label: "Email Address",
                required: true,
                placeholder: "john@example.com"
            },
            {
                name: "age",
                type: "number",
                label: "Years of Experience",
                required: true,
                placeholder: "e.g. 5"
            },
            {
                name: "bio",
                type: "textarea",
                label: "Short Biography",
                required: false,
                placeholder: "Tell us a bit about yourself..."
            },
            {
                name: "position",
                type: "select",
                label: "Target Position",
                required: true,
                options: [
                    { label: "Frontend Engineer", value: "frontend" },
                    { label: "Backend Engineer", value: "backend" },
                    { label: "Fullstack Engineer", value: "fullstack" },
                ],
            },
            {
                name: "work_mode",
                type: "radio",
                label: "Preferred Work Mode",
                required: true,
                options: [
                    { label: "Remote", value: "remote" },
                    { label: "On-site", value: "onsite" },
                    { label: "Hybrid", value: "hybrid" },
                ],
            },
            {
                name: "skills",
                type: "checkbox",
                label: "Technical Skills",
                required: false,
                options: [
                    { label: "React / Next.js", value: "react" },
                    { label: "TypeScript", value: "ts" },
                    { label: "Tailwind CSS", value: "tailwind" },
                    { label: "Node.js", value: "node" },
                ],
            },
            {
                name: "available_from",
                type: "date",
                label: "Available Start Date",
                required: true
            },
        ],
    },
    designSchema: {
        primaryColor: "#2563eb", // Royal Blue
        backgroundColor: "#f8fafc", // Slate 50
        formBackground: "#ffffff", // White
        textColor: "#1e293b", // Slate 800
        fontFamily: "",
        borderRadius: "sm" as const,
        spacing: "relaxed" as const,
        fieldStyles: {
            labelPosition: "top" as const,
            inputVariant: "default" as const,
        },
        button: {
            text: "Submit Application",
            variant: "default" as const,
        },
    }
};

export default function PreviewDemoPage() {

    const form: FormTemplate= templates[0];


    return (
        <div className="min-h-screen bg-[#f8fafc] py-12 px-6 flex flex-col items-center gap-16">

            {/* Template Gallery Section */}
            <div className="w-full max-w-6xl flex flex-col items-center gap-8">
                <div className="text-center">
                    <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 mb-2">Template Gallery</h2>
                    <h1 className="text-3xl font-bold text-zinc-900">Choose a Template</h1>
                    <p className="text-zinc-500 mt-2">Start with a professional layout and customize it to your needs.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 w-full justify-items-center">
                    {templates.map((template, idx) => (
                        <FormPreviewCard
                            key={idx}
                            form={{
                                ...template,
                                createdAt: new Date().toISOString()
                            }}
                            onDelete={() => alert(`Delete clicked for: ${template.title}`)}
                        />
                    ))}
                </div>
            </div>

            {/* Individual Component Previews */}
            <div className="w-full max-w-6xl border-t border-zinc-200 pt-16 flex flex-col items-center gap-16">


                <div className="w-full flex flex-col items-center gap-6">
                    <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-400 text-center">Full Component: FormRenderer</h2>
                    <FormRenderer
                        title={form.title}
                        description={form.description}
                        brandLogo={form.brandLogo}
                        logoAlignment={form.logoAlignment}
                        fields={form.fieldSchema.fields}
                        design={form.designSchema}
                    />
                </div>
            </div>
        </div>
    );
}
