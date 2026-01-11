"use client";

import React, { useRef } from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

interface ColorPickerProps {
    label?: string;
    value: string;
    onChange: (value: string) => void;
    className?: string;
}

export function ColorPicker({ label, value, onChange, className }: ColorPickerProps) {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleDivClick = () => {
        inputRef.current?.click();
    };

    return (
        <div className={cn("space-y-1.5", className)}>
            {label && <Label className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{label}</Label>}
            <div className="flex items-center gap-2">
                <div
                    onClick={handleDivClick}
                    className="relative w-10 h-10 rounded-full border border-border shadow-sm cursor-pointer overflow-hidden transition-transform active:scale-95 group hover:ring-2 hover:ring-ring hover:ring-offset-1"
                    style={{ backgroundColor: value }}
                >
                    {/* Glossy Overlay */}
                    <div className="absolute inset-0 bg-linear-to-tr from-black/10 to-white/20 pointer-events-none" />
                    <input
                        ref={inputRef}
                        type="color"
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    />
                </div>
                <div className="text-sm font-mono text-muted-foreground uppercase">{value}</div>
            </div>
        </div>
    );
}
