import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { FormField, FormDesign, FormSchema } from "@/types/formSchema";

interface FormState {
  form: FormSchema;
  selectedFieldId: string | null;

  // Global Actions
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

// Initial State
const initialSchema: FormSchema = {
  title: "Untitled Form",
  description: "Description of your form",
  brandLogo: "",
  logoAlignment: "left",
  status: "draft",
  createdAt: new Date().toISOString(),
  fieldSchema: {
    version: 1,
    fields: [],
  },
  designSchema: {
    primaryColor: "#000000",
    backgroundColor: "#ffffff",
    formBackground: "#ffffff",
    textColor: "#000000",
    borderRadius: "md",
    spacing: "normal",
    fieldStyles: {
      labelPosition: "top",
      inputVariant: "outline",
    },
    button: {
      text: "Submit",
      variant: "default",
    },
  },
};

// Avoid touching browser storage during SSR/prerender.
const safeStorage = createJSONStorage(() => {
  if (typeof window === "undefined") {
    return {
      getItem: () => null,
      setItem: () => null,
      removeItem: () => null,
    } as const;
  }
  return localStorage;
});

export const useFormStore = create<FormState>()(
  persist(
    (set) => ({
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
              fieldStyles: {
                ...state.form.designSchema.fieldStyles,
                ...updates,
              },
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
    }),
    {
      name: "form-storage",
      storage: safeStorage,
    }
  )
);
