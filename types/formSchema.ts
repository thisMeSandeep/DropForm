//  Form field type
export interface FormField {
  name: string;
  type: string;
  label: string;
  required?: boolean;
  options?: { label: string; value: string }[];
  validation?: any;
  placeholder?: string;
}

// Form design type
export interface FormDesign {
  primaryColor?: string;
  backgroundColor?: string;
  formBackground?: string;
  textColor?: string;
  fontFamily?: string;
  borderRadius?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full";
  spacing?: "compact" | "normal" | "relaxed";
  brandLogo?: string;
  logoPosition?: "left" | "center" | "right";
  fieldStyles?: {
    labelPosition?: "top" | "left";
    inputVariant?: "default" | "outline" | "underlined";
  };
  button?: {
    text?: string;
    variant?:
    | "default"
    | "outline"
    | "ghost"
    | "link"
    | "destructive"
    | "secondary";
  };
}

//  Composed form schema type
export interface FormSchema {
  title: string;
  description: string | null;
  brandLogo: string | null;
  logoAlignment: "left" | "center" | "right";
  status: "published" | "draft" | "paused" | "archived" | "closed";
  createdAt?: string;
  fieldSchema: {
    version: number;
    fields: FormField[];
  };
  id?: string;
  designSchema: FormDesign;
}
