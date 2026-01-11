import { create } from "zustand";
import { FormField, FormDesign, FormSchema } from "@/types/formSchema";

interface FormState {
  form: FormSchema;
  selectedFieldId: string | null;

  // Actions
  setForm: (schema: FormSchema) => void;
  updateGlobalSettings: (
    settings: Partial<
      Pick<
        FormSchema,
        "title" | "description" | "brandLogo" | "logoAlignment" | "status"
      >
    >
  ) => void;

  // Field Actions
  addField: (type: string) => void;
  updateField: (id: string, updates: Partial<FormField>) => void;
  removeField: (id: string) => void;
  setSelectedFieldId: (id: string | null) => void;

  // Design Actions
  updateDesign: (updates: Partial<FormDesign>) => void;
  updateFieldStyles: (
    updates: Partial<NonNullable<FormDesign["fieldStyles"]>>
  ) => void;
  updateButtonStyles: (
    updates: Partial<NonNullable<FormDesign["button"]>>
  ) => void;
}

// Initial State (Moved from FormEditor.tsx)
const initialSchema: FormSchema = {
  title: "Frontend Developer Job Application",
  description: "Apply for the frontend developer role",
  brandLogo: "/sampleLogo.png",
  logoAlignment: "center",
  status: "published",
  createdAt: new Date().toISOString(),
  fieldSchema: {
    version: 1,
    fields: [
      {
        name: "name",
        type: "text",
        label: "Full Name",
        required: true,
        placeholder: "John Doe",
      },
      {
        name: "email",
        type: "email",
        label: "Email Address",
        required: true,
        placeholder: "john@example.com",
      },
      {
        name: "age",
        type: "number",
        label: "Years of Experience",
        required: true,
        placeholder: "e.g. 5",
      },
      {
        name: "bio",
        type: "textarea",
        label: "Short Biography",
        required: false,
        placeholder: "Tell us a bit about yourself...",
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
        required: true,
      },
    ],
  },
  designSchema: {
    primaryColor: "#2563eb",
    backgroundColor: "#f8fafc",
    formBackground: "#ffffff",
    textColor: "#1e293b",
    fontFamily: "",
    borderRadius: "sm",
    spacing: "relaxed",
    fieldStyles: {
      labelPosition: "top",
      inputVariant: "default",
    },
    button: {
      text: "Submit Application",
      variant: "default",
    },
  },
};

export const useFormStore = create<FormState>((set) => ({
  form: initialSchema,
  selectedFieldId: null,

  setForm: (schema) => set({ form: schema }),

  updateGlobalSettings: (settings) =>
    set((state) => ({
      form: { ...state.form, ...settings },
    })),

  addField: (type) => {
    const newField: FormField = {
      name: `field_${crypto.randomUUID().slice(0, 8)}`,
      type,
      label: `New ${type.charAt(0).toUpperCase() + type.slice(1)}`,
      required: false,
      options: ["select", "radio", "checkbox"].includes(type)
        ? [{ label: "Option 1", value: "option_1" }]
        : undefined,
    };
    set((state) => ({
      form: {
        ...state.form,
        fieldSchema: {
          ...state.form.fieldSchema,
          fields: [...state.form.fieldSchema.fields, newField],
        },
      },
      selectedFieldId: newField.name,
    }));
  },

  updateField: (id, updates) =>
    set((state) => ({
      form: {
        ...state.form,
        fieldSchema: {
          ...state.form.fieldSchema,
          fields: state.form.fieldSchema.fields.map((f) =>
            f.name === id ? { ...f, ...updates } : f
          ),
        },
      },
    })),

  removeField: (id) =>
    set((state) => {
      const newFields = state.form.fieldSchema.fields.filter(
        (f) => f.name !== id
      );
      return {
        form: {
          ...state.form,
          fieldSchema: {
            ...state.form.fieldSchema,
            fields: newFields,
          },
        },
        selectedFieldId:
          state.selectedFieldId === id ? null : state.selectedFieldId,
      };
    }),

  setSelectedFieldId: (id) => set({ selectedFieldId: id }),

  updateDesign: (updates) =>
    set((state) => ({
      form: {
        ...state.form,
        designSchema: { ...state.form.designSchema, ...updates },
      },
    })),

  updateFieldStyles: (updates) =>
    set((state) => ({
      form: {
        ...state.form,
        designSchema: {
          ...state.form.designSchema,
          fieldStyles: { ...state.form.designSchema.fieldStyles, ...updates },
        },
      },
    })),

  updateButtonStyles: (updates) =>
    set((state) => ({
      form: {
        ...state.form,
        designSchema: {
          ...state.form.designSchema,
          button: { ...state.form.designSchema.button, ...updates },
        },
      },
    })),
}));
