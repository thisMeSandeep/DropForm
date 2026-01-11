"use client";

import React, { useState } from "react";
import { FormField } from "@/types/formSchema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Trash2, Plus, GripVertical, Settings2, Palette, Code } from "lucide-react";
import { ColorPicker } from "@/components/ui/color-picker";
import { cn } from "@/lib/utils";
import { useFormStore } from "@/store/useFormStore";
import Image from "next/image";

// --- Sub-Components ---
const FieldConfigPanel = ({ field }: { field: FormField }) => {
    const { updateField } = useFormStore();

    // Determine editable properties based on type
    const showOptions = ["select", "radio", "checkbox"].includes(field.type);
    const showPlaceholder = ["text", "email", "number", "textarea", "select"].includes(field.type);

    return (
        <div className="space-y-4 p-4 border rounded-md bg-muted/20">
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label>Label</Label>
                    <Input value={field.label} onChange={(e) => updateField(field.name, { label: e.target.value })} />
                </div>
                <div className="space-y-2">
                    <Label>Required</Label>
                    <div className="flex items-center h-10">
                        <input
                            type="checkbox"
                            checked={field.required}
                            onChange={(e) => updateField(field.name, { required: e.target.checked })}
                            className="h-4 w-4"
                        />
                        <span className="ml-2 text-sm text-muted-foreground">Is required?</span>
                    </div>
                </div>
            </div>

            {showPlaceholder && (
                <div className="space-y-2">
                    <Label>Placeholder</Label>
                    <Input value={field.placeholder || ""} onChange={(e) => updateField(field.name, { placeholder: e.target.value })} />
                </div>
            )}

            {showOptions && (
                <div className="space-y-2">
                    <Label>Options</Label>
                    <div className="space-y-2">
                        {(field.options || []).map((opt, idx) => (
                            <div key={idx} className="flex gap-2">
                                <Input
                                    value={opt.label}
                                    placeholder="Label"
                                    onChange={(e) => {
                                        const newOpts = [...(field.options || [])];
                                        newOpts[idx] = { ...newOpts[idx], label: e.target.value, value: e.target.value.toLowerCase().replace(/\s+/g, '_') };
                                        updateField(field.name, { options: newOpts });
                                    }}
                                />
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => {
                                        const newOpts = field.options?.filter((_, i) => i !== idx);
                                        updateField(field.name, { options: newOpts });
                                    }}
                                >
                                    <Trash2 className="h-4 w-4 text-destructive" />
                                </Button>
                            </div>
                        ))}
                        <Button
                            variant="outline"
                            size="sm"
                            className="w-full dashed border-dashed"
                            onClick={() => {
                                const newOpts = [...(field.options || []), { label: "New Option", value: "new_option" }];
                                updateField(field.name, { options: newOpts });
                            }}
                        >
                            <Plus className="h-3 w-3 mr-2" /> Add Option
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

const FormEditor = () => {
    // Connect to Store
    const {
        form,
        selectedFieldId,
        updateGlobalSettings,
        addField,
        removeField,
        setSelectedFieldId,
        updateDesign,
        updateFieldStyles,
        updateButtonStyles
    } = useFormStore();

    const [activeTab, setActiveTab] = useState("build");

    const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 1024 * 1024) {
                alert("File size must be less than 1MB");
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                updateGlobalSettings({ brandLogo: reader.result as string });
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="flex flex-col h-full bg-background border-r shadow-lg overflow-hidden">
            <div className="p-4 border-b flex items-center justify-between shrink-0">
                <h1 className="font-semibold text-lg flex items-center gap-2">
                    <Settings2 className="w-5 h-5 text-primary" />
                    Form Editor
                </h1>
                <div className="flex gap-2">
                    <Button size="icon" variant="ghost" title="View JSON" onClick={() => console.log(form)}>
                        <Code className="w-4 h-4" />
                    </Button>
                </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col min-h-0">
                <TabsList className="w-full justify-start rounded-none border-b h-12 bg-background p-0 shrink-0">
                    <TabsTrigger value="build" className="flex-1 h-full rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none transition-none">
                        Build
                    </TabsTrigger>
                    <TabsTrigger value="design" className="flex-1 h-full rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none transition-none">
                        Design
                    </TabsTrigger>
                    <TabsTrigger value="settings" className="flex-1 h-full rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none transition-none">
                        Settings
                    </TabsTrigger>
                </TabsList>

                {/* Using a flex container with overflow-y-auto*/}
                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    <div className="p-4 space-y-6">
                        {activeTab === "build" && (
                            <>
                                {/* Quick Form Info */}
                                <div className="space-y-3">
                                    <Label>Form Title</Label>
                                    <Input
                                        value={form.title}
                                        onChange={(e) => updateGlobalSettings({ title: e.target.value })}
                                        className="font-semibold text-lg"
                                    />
                                    <Label className="mt-2 block">Description</Label>
                                    <Textarea
                                        value={form.description || ""}
                                        onChange={(e) => updateGlobalSettings({ description: e.target.value })}
                                        rows={2}
                                    />
                                </div>

                                <Separator />

                                {/* Field List */}
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <Label className="text-base font-medium">Fields</Label>

                                        {/* Add Field Dropdown */}
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="outline" size="sm" className="h-8 gap-2">
                                                    <Plus className="w-3 h-3" /> Add Field
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem onClick={() => addField("text")}>Text Input</DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => addField("email")}>Email</DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => addField("number")}>Number</DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => addField("textarea")}>Textarea</DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => addField("select")}>Dropdown</DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => addField("radio")}>Radio Group</DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => addField("checkbox")}>Checkbox</DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => addField("date")}>Date Picker</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>

                                    <div className="space-y-2">
                                        {form.fieldSchema.fields.map((field) => (
                                            <div key={field.name} className="space-y-2">
                                                <div
                                                    className={cn(
                                                        "group flex items-center gap-3 p-3 rounded-md border cursor-pointer transition-all hover:bg-muted/50",
                                                        selectedFieldId === field.name ? "border-primary bg-primary/5 shadow-sm" : "bg-card"
                                                    )}
                                                    onClick={() => setSelectedFieldId(field.name === selectedFieldId ? null : field.name)}
                                                >
                                                    <GripVertical className="w-4 h-4 text-muted-foreground opacity-50" />
                                                    <div className="flex-1">
                                                        <div className="font-medium text-sm">{field.label}</div>
                                                        <div className="text-xs text-muted-foreground capitalize">{field.type}</div>
                                                    </div>
                                                    <Button
                                                        size="icon"
                                                        variant="ghost"
                                                        className="h-8 w-8 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity hover:text-destructive"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            removeField(field.name);
                                                        }}
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </Button>
                                                </div>

                                                {/* Inline editor when selected */}
                                                {selectedFieldId === field.name && (
                                                    <div className="ml-4 pl-4 border-l-2 border-primary/20 animate-in slide-in-from-top-2 duration-200">
                                                        <FieldConfigPanel field={field} />
                                                    </div>
                                                )}
                                            </div>
                                        ))}

                                        {form.fieldSchema.fields.length === 0 && (
                                            <div className="text-center py-8 text-muted-foreground border-2 border-dashed rounded-lg">
                                                <p>No fields yet</p>
                                                <p className="text-sm">Add a field to get started</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </>
                        )}

                        {activeTab === "design" && (
                            <div className="space-y-6">
                                <div className="space-y-4">
                                    <h3 className="font-medium text-sm text-foreground/80 flex items-center gap-2">
                                        <Palette className="w-4 h-4" /> Global Colors
                                    </h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <ColorPicker
                                            label="Primary Color"
                                            value={form.designSchema.primaryColor || "#2563eb"}
                                            onChange={(v) => updateDesign({ primaryColor: v })}
                                        />
                                        <ColorPicker
                                            label="Page Background"
                                            value={form.designSchema.backgroundColor || "#f8fafc"}
                                            onChange={(v) => updateDesign({ backgroundColor: v })}
                                        />
                                        <ColorPicker
                                            label="Form Background"
                                            value={form.designSchema.formBackground || "#ffffff"}
                                            onChange={(v) => updateDesign({ formBackground: v })}
                                        />
                                        <ColorPicker
                                            label="Text Color"
                                            value={form.designSchema.textColor || "#1e293b"}
                                            onChange={(v) => updateDesign({ textColor: v })}
                                        />
                                    </div>
                                </div>

                                <Separator />

                                <div className="space-y-4">
                                    <h3 className="font-medium text-sm text-foreground/80">Layout & Radius</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>Border Radius</Label>
                                            <Select
                                                value={form.designSchema.borderRadius || "md"}
                                                onValueChange={(v: any) => updateDesign({ borderRadius: v })}
                                            >
                                                <SelectTrigger><SelectValue /></SelectTrigger>
                                                <SelectContent>
                                                    {['sm', 'md', 'lg', 'xl', '2xl', '3xl', 'full'].map(r => (
                                                        <SelectItem key={r} value={r}>{r}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Field Spacing</Label>
                                            <Select
                                                value={form.designSchema.spacing || "normal"}
                                                onValueChange={(v: any) => updateDesign({ spacing: v })}
                                            >
                                                <SelectTrigger><SelectValue /></SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="compact">Compact</SelectItem>
                                                    <SelectItem value="normal">Normal</SelectItem>
                                                    <SelectItem value="relaxed">Relaxed</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Logo Position</Label>
                                        <div className="flex gap-2 p-1 bg-muted rounded-md w-fit">
                                            {['left', 'center', 'right'].map((pos) => (
                                                <button
                                                    key={pos}
                                                    onClick={() => updateGlobalSettings({ logoAlignment: pos as any })}
                                                    className={cn(
                                                        "px-3 py-1 text-xs rounded-sm capitalize transition-all",
                                                        form.logoAlignment === pos ? "bg-background shadow-sm font-medium" : "text-muted-foreground hover:bg-background/50"
                                                    )}
                                                >
                                                    {pos}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <Separator />

                                <div className="space-y-4">
                                    <h3 className="font-medium text-sm text-foreground/80">Field Styles</h3>
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <Label>Input Style</Label>
                                            <Select
                                                value={form.designSchema.fieldStyles?.inputVariant || "outline"}
                                                onValueChange={(v: any) => updateFieldStyles({ inputVariant: v })}
                                            >
                                                <SelectTrigger className="w-32 h-8"><SelectValue /></SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="default">Default</SelectItem>
                                                    <SelectItem value="outline">Outline</SelectItem>
                                                    <SelectItem value="underlined">Underlined</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <Label>Label Position</Label>
                                            <Select
                                                value={form.designSchema.fieldStyles?.labelPosition || "top"}
                                                onValueChange={(v: any) => updateFieldStyles({ labelPosition: v })}
                                            >
                                                <SelectTrigger className="w-32 h-8"><SelectValue /></SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="top">Top</SelectItem>
                                                    <SelectItem value="left">Left (Side)</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                </div>

                                <Separator />

                                <div className="space-y-4">
                                    <h3 className="font-medium text-sm text-foreground/80">Submit Button</h3>
                                    <div className="space-y-3">
                                        <div className="space-y-2">
                                            <Label>Button Text</Label>
                                            <Input
                                                value={form.designSchema.button?.text || "Submit"}
                                                onChange={(e) => updateButtonStyles({ text: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Button Variant</Label>
                                            <Select
                                                value={form.designSchema.button?.variant || "default"}
                                                onValueChange={(v: any) => updateButtonStyles({ variant: v })}
                                            >
                                                <SelectTrigger><SelectValue /></SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="default">Default</SelectItem>
                                                    <SelectItem value="outline">Outline</SelectItem>
                                                    <SelectItem value="ghost">Ghost</SelectItem>
                                                    <SelectItem value="secondary">Secondary</SelectItem>
                                                    <SelectItem value="destructive">Destructive</SelectItem>
                                                    <SelectItem value="link">Link</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === "settings" && (
                            <div className="space-y-6">
                                <div className="space-y-4">
                                    <Label>Brand Logo</Label>
                                    <div className="flex items-center gap-4">
                                        {form.brandLogo ? (
                                            < div className="relative h-20 w-36 rounded-md border flex items-center justify-center bg-white overflow-hidden group">
                                                <Image src={form.brandLogo} alt="Logo" fill className="max-h-full max-w-full object-contain" />
                                                <button
                                                    onClick={() => updateGlobalSettings({ brandLogo: "" })}
                                                    className="absolute inset-0 bg-black/50 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="h-20 w-36 rounded-md border border-dashed flex items-center justify-center text-muted-foreground text-xs bg-muted/30">
                                                No Logo
                                            </div>
                                        )}
                                        <div className="flex-1">
                                            <Input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleLogoUpload}
                                                className="cursor-pointer"
                                            />
                                            <p className="text-xs text-muted-foreground mt-1">
                                                Max size 1MB. Displayed above title.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <Label>Form Status</Label>
                                    <Select
                                        value={form.status}
                                        onValueChange={(v: any) => updateGlobalSettings({ status: v })}
                                    >
                                        <SelectTrigger><SelectValue /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="draft">Draft</SelectItem>
                                            <SelectItem value="published">Published</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </Tabs>
        </div>
    );
};

export default FormEditor;