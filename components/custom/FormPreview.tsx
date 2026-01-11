"use client";

import { FormRenderer } from "@/components/custom/FormRenderer";
import { useFormStore } from "@/store/useFormStore";
import { Eye } from "lucide-react";

const FormPreview = () => {
  const { form } = useFormStore();

  return (
    <div className="flex flex-col h-full bg-slate-50/50 relative overflow-hidden">
      <div className="absolute top-4 right-4 z-20 flex gap-2">
        <div className="bg-background/80 backdrop-blur-sm px-3 py-1.5 rounded-full border text-xs font-medium text-muted-foreground flex items-center gap-2 shadow-sm">
          <Eye className="w-3 h-3" /> Live Preview
        </div>
      </div>

      <div className="flex-1 overflow-auto w-full h-full custom-scrollbar">
        <FormRenderer
          title={form.title}
          description={form.description}
          brandLogo={form.brandLogo}
          logoAlignment={form.logoAlignment}
          fields={form.fieldSchema.fields}
          design={form.designSchema}
          readOnly={true}
        />
      </div>
    </div>
  );
};

export default FormPreview;