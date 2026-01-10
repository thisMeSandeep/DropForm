import { FormField, FormDesign } from "@/components/custom/FormRenderer";

export interface FormTemplate {
  title: string;
  description?: string;
  brandLogo?: string;
  logoAlignment?: "left" | "center" | "right";
  status: "draft" | "published";
  fieldSchema: {
    version: number;
    fields: FormField[];
  };
  designSchema: FormDesign;
}

export const templates: FormTemplate[] = [
  {
    title: "Contact Information",
    description: "A clean and simple way for customers to reach out to you.",
    status: "published",
    fieldSchema: {
      version: 1,
      fields: [
        {
          name: "full_name",
          type: "text",
          label: "Full Name",
          required: true,
          placeholder: "Jane Smith",
        },
        {
          name: "email",
          type: "email",
          label: "Email Address",
          required: true,
          placeholder: "jane@example.com",
        },
        {
          name: "subject",
          type: "text",
          label: "Subject",
          required: false,
          placeholder: "How can we help?",
        },
        {
          name: "message",
          type: "textarea",
          label: "Message",
          required: true,
          placeholder: "Tell us more...",
        },
      ],
    },
    designSchema: {
      primaryColor: "#2563eb",
      backgroundColor: "#f8fafc",
      formBackground: "#ffffff",
      textColor: "#1e293b",
      borderRadius: "md",
      spacing: "normal",
      fieldStyles: {
        labelPosition: "top",
        inputVariant: "outline",
      },
      button: { text: "Send Message", variant: "default" },
    },
  },
  {
    title: "Job Application",
    description:
      "Professional hiring form to collect candidate details and experience.",
    status: "published",
    fieldSchema: {
      version: 1,
      fields: [
        { name: "name", type: "text", label: "Full Name", required: true },
        { name: "email", type: "email", label: "Email", required: true },
        {
          name: "portfolio",
          type: "text",
          label: "Portfolio URL",
          placeholder: "https://...",
        },
        {
          name: "experience",
          type: "textarea",
          label: "Work Experience Summary",
          required: true,
        },
        {
          name: "role",
          type: "select",
          label: "Target Role",
          options: [
            { label: "Frontend Engineer", value: "frontend" },
            { label: "Product Designer", value: "design" },
            { label: "Product Manager", value: "pm" },
          ],
        },
      ],
    },
    designSchema: {
      primaryColor: "#4f46e5",
      backgroundColor: "#ffffff",
      formBackground: "#f9fafb",
      textColor: "#111827",
      borderRadius: "lg",
      spacing: "relaxed",
      fieldStyles: {
        labelPosition: "top",
        inputVariant: "outline",
      },
      button: { text: "Submit Application", variant: "default" },
    },
  },
  {
    title: "Event RSVP",
    description:
      "Manage guest lists for your upcoming corporate event or wedding.",
    status: "published",
    fieldSchema: {
      version: 1,
      fields: [
        {
          name: "guest_name",
          type: "text",
          label: "Guest Name",
          required: true,
        },
        {
          name: "attending",
          type: "radio",
          label: "Will you be attending?",
          required: true,
          options: [
            { label: "Yes, I'll be there!", value: "yes" },
            { label: "Sorry, I can't make it", value: "no" },
          ],
        },
        {
          name: "dietary",
          type: "text",
          label: "Dietary Requirements",
          placeholder: "e.g. Vegan, Nut-free",
        },
        {
          name: "plus_one",
          type: "number",
          label: "Number of additional guests",
          placeholder: "0",
        },
      ],
    },
    designSchema: {
      primaryColor: "#059669",
      backgroundColor: "#ecfdf5",
      formBackground: "#ffffff",
      textColor: "#064e3b",
      borderRadius: "full",
      spacing: "comfortable" as any, // normal in renderer
      fieldStyles: {
        labelPosition: "top",
        inputVariant: "outline",
      },
      button: { text: "Send RSVP", variant: "secondary" },
    },
  } as any,
  {
    title: "Customer Feedback",
    description: "Gather valuable insights to improve your product or service.",
    status: "published",
    fieldSchema: {
      version: 1,
      fields: [
        {
          name: "rating",
          type: "radio",
          label: "How satisfied are you?",
          options: [
            { label: "Very Satisfied", value: "5" },
            { label: "Satisfied", value: "4" },
            { label: "Neutral", value: "3" },
            { label: "Unsatisfied", value: "2" },
          ],
        },
        {
          name: "favorite_feature",
          type: "text",
          label: "What is your favorite feature?",
        },
        {
          name: "improvements",
          type: "textarea",
          label: "How can we improve?",
          placeholder: "Your suggestions...",
        },
      ],
    },
    designSchema: {
      primaryColor: "#ea580c",
      backgroundColor: "#fff7ed",
      formBackground: "#ffffff",
      textColor: "#7c2d12",
      borderRadius: "sm",
      spacing: "relaxed",
      fieldStyles: {
        labelPosition: "left",
        inputVariant: "underlined",
      },
      button: { text: "Submit Feedback", variant: "outline" },
    },
  },
  {
    title: "Student Data Collection",
    description: "Organized data gathering for university courses and clubs.",
    status: "published",
    fieldSchema: {
      version: 1,
      fields: [
        {
          name: "student_name",
          type: "text",
          label: "Student Name",
          required: true,
        },
        {
          name: "student_id",
          type: "text",
          label: "Student ID",
          required: true,
          placeholder: "XXXX-XXXX",
        },
        { name: "major", type: "text", label: "Academic Major" },
        {
          name: "grad_year",
          type: "select",
          label: "Graduation Year",
          options: [
            { label: "2024", value: "2024" },
            { label: "2025", value: "2025" },
            { label: "2026", value: "2026" },
          ],
        },
      ],
    },
    designSchema: {
      primaryColor: "#7c3aed",
      backgroundColor: "#f5f3ff",
      formBackground: "#ffffff",
      textColor: "#4c1d95",
      borderRadius: "xl",
      spacing: "normal",
      fieldStyles: {
        labelPosition: "top",
        inputVariant: "outline",
      },
      button: { text: "Register", variant: "default" },
    },
  },
];
