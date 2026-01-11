export interface FormField {
  name: string;
  type: string;
  label: string;
  required?: boolean;
  options?: { label: string; value: string }[];
  validation?: any;
  placeholder?: string;
}

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

export interface FormSchema {
  title: string;
  description: string;
  brandLogo: string;
  logoAlignment: "left" | "center" | "right";
  status: "published" | "draft";
  createdAt: string;
  fieldSchema: {
    version: number;
    fields: FormField[];
  };
  designSchema: FormDesign;
}
