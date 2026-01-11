"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";


import { FormField, FormDesign, FormSchema } from "@/types/formSchema";
import Image from "next/image";

//  ------------------------------ Form Renderer Props --------------------------
type FormRendererProps = FormSchema & {
    readOnly?: boolean; // If true, the form is rendered in a non-editable mode
};


// ------------------------------ Field renderer--------------------------

//  FieldRenderer handles the visual representation of individual form fields.

const FieldRenderer = ({ field, design, readOnly }: { field: FormField; design?: FormDesign; readOnly?: boolean }) => {
    const textColor = design?.textColor || "#111827";
    const borderRadius = design?.borderRadius || 'md';
    const inputVariant = design?.fieldStyles?.inputVariant || 'outline';
    const labelPosition = design?.fieldStyles?.labelPosition || 'top';

    // Map design tokens to Tailwind utility classes
    const radiusMap = {
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-lg',
        xl: 'rounded-xl',
        '2xl': 'rounded-2xl',
        '3xl': 'rounded-3xl',
        full: 'rounded-full'
    };
    const roundedClass = radiusMap[borderRadius] || radiusMap.md;

    // Determine common properties for inputs based on variant
    const getVariantClasses = () => {
        switch (inputVariant) {
            case 'underlined':
                return "border-0 border-b-2 rounded-none px-0 bg-transparent focus-visible:ring-0 focus-visible:border-primary transition-all";
            case 'outline':
            default:
                return cn(
                    "bg-white/50 border-zinc-300 hover:border-zinc-400 focus-visible:ring-2 focus-visible:ring-offset-0 transition-all",
                    roundedClass
                );
        }
    };

    const commonProps = {
        disabled: readOnly,
        placeholder: field.placeholder || `Enter ${field.label.toLowerCase()}...`,
        className: cn("mt-1.5 w-full", getVariantClasses()),
        style: { color: textColor, borderColor: inputVariant === 'underlined' ? 'rgb(212 212 216)' : undefined }
    };

    // Helper to render the specific input component based on field type
    const renderInput = () => {
        switch (field.type) {

            //  text  , email and number
            case "text":
            case "email":
            case "number":
                return <Input type={field.type} {...commonProps} />;

            // textarea
            case "textarea":
                return <Textarea {...commonProps} rows={4} />;

            // radio
            case "radio":
                return (
                    <RadioGroup className="space-y-3 mt-3" disabled={readOnly}>
                        {(field.options || []).map((opt, i) => (
                            <div key={i} className="flex items-center space-x-3">
                                <RadioGroupItem value={opt.value} id={`${field.name}-${i}`} />
                                <Label
                                    htmlFor={`${field.name}-${i}`}
                                    className="font-normal text-sm cursor-pointer transition-colors"
                                    style={{ color: textColor }}
                                >
                                    {opt.label}
                                </Label>
                            </div>
                        ))}
                    </RadioGroup>
                );

            // checkbox
            case "checkbox":
                return (
                    <div className="space-y-3 mt-3">
                        {(field.options || []).map((opt, i) => (
                            <div key={i} className="flex items-center space-x-3">
                                <Checkbox id={`${field.name}-${i}`} disabled={readOnly} />
                                <Label
                                    htmlFor={`${field.name}-${i}`}
                                    className="font-normal text-sm cursor-pointer transition-colors"
                                    style={{ color: textColor }}
                                >
                                    {opt.label}
                                </Label>
                            </div>
                        ))}
                    </div>
                );

            // Select
            case "select":
                return (
                    <Select disabled={readOnly}>
                        <SelectTrigger
                            className={cn("mt-2 transition-all bg-white/50 border-zinc-300 hover:border-zinc-400", borderRadius)}
                            style={{ color: textColor, borderColor: 'rgb(212 212 216)' }}
                        >
                            <SelectValue placeholder={field.placeholder || "Select an option"} />
                        </SelectTrigger>
                        <SelectContent>
                            {(field.options || []).map((opt, i) => (
                                <SelectItem key={i} value={opt.value}>{opt.label}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                );

            // Date
            case "date":
                return (
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                className={cn(
                                    "w-full justify-start text-left font-normal mt-2 transition-all bg-white/50 border-zinc-300 hover:border-zinc-400 hover:bg-white/70",
                                    borderRadius
                                )}
                                style={{ color: textColor, borderColor: 'rgb(212 212 216)' }}
                                disabled={readOnly}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                <span>Pick a date</span>
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar mode="single" initialFocus />
                        </PopoverContent>
                    </Popover>
                );

            default:
                return (
                    <div className="h-12 w-full bg-muted rounded-md flex items-center justify-center text-xs text-muted-foreground italic">
                        Input type &quot;{field.type}&quot; not implemented
                    </div>
                );
        }
    };

    const isSideLabel = labelPosition === 'left';

    // Render the field
    return (
        <div className={cn(
            "w-full",
            isSideLabel ? "flex flex-row items-baseline gap-4" : "space-y-1"
        )}>
            <Label
                className={cn(
                    "font-medium block text-sm transition-colors",
                    isSideLabel ? "w-1/3 pt-2" : "w-full"
                )}
                style={{ color: textColor, opacity: 0.85 }}
            >
                {field.label} {field.required && <span className="text-red-500 ml-0.5">*</span>}
            </Label>

            <div className={isSideLabel ? "w-2/3" : "w-full"}>
                {renderInput()}
            </div>
        </div>
    );
};



// ---------------------------- Main renderer-------------------------

/**
 * The main FormRenderer component.
 * It strictly follows the designSchema properties provided by the user.
 */
export const FormRenderer = ({ title, description, brandLogo, logoAlignment, fieldSchema, designSchema, readOnly = false }: FormRendererProps) => {
    // Extract fields and design from schema
    const fields = fieldSchema?.fields || [];
    const design = designSchema;

    // Design tokens from the schema
    const primaryColor = design?.primaryColor || "#2563eb";
    const backgroundColor = design?.backgroundColor || "#f8f9fa";
    const textColor = design?.textColor || "#111827";

    // Mapping for Card Radius (slightly larger than input radius for nested feel)
    const cardRadiusMap = {
        sm: 'rounded-md',
        md: 'rounded-lg',
        lg: 'rounded-xl',
        xl: 'rounded-2xl',
        '2xl': 'rounded-3xl',
        '3xl': 'rounded-[2rem]',
        full: 'rounded-[2.5rem]'
    };
    const borderRadius = design?.borderRadius || 'md';
    const cardRoundedClass = cardRadiusMap[borderRadius] || cardRadiusMap.md;
    const spacing = design?.spacing || 'normal';

    // Determine alignment: prop takes precedence over design schema, defaults to center
    const align = logoAlignment || design?.logoPosition || 'center';
    const logoClass = align === 'left' ? 'justify-start' : align === 'center' ? 'justify-center' : 'justify-end';

    const fieldGap = spacing === 'compact' ? 'gap-4' : spacing === 'relaxed' ? 'gap-10' : 'gap-7';

    const logoUrl = brandLogo || design?.brandLogo;

    return (
        <div
            className="flex flex-col font-sans select-none items-center w-full min-h-screen py-12 px-4"
            style={{
                backgroundColor: backgroundColor || "#f8f9fa",
                fontFamily: design?.fontFamily || 'Inter, sans-serif'
            }}
        >
            {/* BRAND LOGO */}
            {logoUrl && (
                <div className={cn("flex w-full max-w-2xl px-1 mb-8", logoClass)}>
                    <Image
                        src={logoUrl}
                        alt="Brand Logo"
                        width={150}
                        height={40}
                        className="h-10 object-contain"
                    />
                </div>
            )}

            {/* MAIN FORM CONTAINER */}
            <Card className={cn("w-full max-w-2xl bg-white border border-zinc-200/80 shadow-lg", cardRoundedClass)} style={{
                backgroundColor: design?.formBackground || "#ffffff"
            }}>
                <CardContent className="p-10">
                    {/* HEADER */}
                    <div className="mb-12">
                        <h1 className="font-bold text-4xl tracking-tight" style={{ color: textColor }}>
                            {title}
                        </h1>
                        {description && (
                            <p className="mt-3 text-base leading-relaxed" style={{ color: textColor, opacity: 0.65 }}>
                                {description}
                            </p>
                        )}
                    </div>

                    {/* DYNAMIC FIELDS - Clean, minimal layout */}
                    <div className={cn("flex flex-col", fieldGap)}>
                        {fields.map((field, idx) => (
                            <FieldRenderer key={idx} field={field} design={design} readOnly={readOnly} />
                        ))}
                    </div>

                    {/* FOOTER */}
                    {!readOnly && (
                        <div className="flex justify-between items-center pt-10 mt-8 border-t border-zinc-200/60">
                            <Button
                                variant={design?.button?.variant || 'default'}
                                className={cn(
                                    "px-8 py-6 text-base font-semibold shadow-sm hover:shadow-md active:scale-[0.98] transition-all",
                                    borderRadius === 'full' ? 'rounded-full' : cardRoundedClass
                                )}
                                style={{
                                    backgroundColor: (!design?.button?.variant || design.button.variant === 'default') ? primaryColor : undefined,
                                    borderColor: design?.button?.variant === 'outline' ? primaryColor : undefined,
                                    color: design?.button?.variant === 'outline' ? primaryColor : (design?.button?.variant === 'ghost' ? primaryColor : undefined)
                                }}
                            >
                                {design?.button?.text || "Submit"}
                            </Button>
                            <button
                                className="text-sm font-medium hover:underline transition-colors underline-offset-4"
                                style={{ color: textColor, opacity: 0.5 }}
                            >
                                Clear form
                            </button>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};