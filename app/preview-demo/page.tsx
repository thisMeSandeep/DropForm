"use client";

import { FormRenderer } from "@/components/custom/FormRenderer";

// Using the data from the file the user referenced
const formSchema = {
    title: "Frontend Developer Job Application",
    description: "Apply for the frontend developer role",
    brandLogo: "/sampleLogo.png",
    logoAlignment: "center" as const,
    status: "published",
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
    return (
        <div className="min-h-screen bg-[#f8f9fa] flex justify-center py-12">
            <FormRenderer
                title={formSchema.title}
                description={formSchema.description}
                brandLogo={formSchema.brandLogo}
                logoAlignment={formSchema.logoAlignment}
                fields={formSchema.fieldSchema.fields}
                design={formSchema.designSchema}
            />
        </div>
    );
}
