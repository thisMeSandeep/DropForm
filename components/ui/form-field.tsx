"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"

interface FormFieldProps {
  id: string
  label: string
  type?: string
  placeholder?: string
  icon?: LucideIcon
  error?: string
  className?: string
  inputProps?: React.ComponentProps<typeof Input>
}

export function FormField({
  id,
  label,
  type = "text",
  placeholder,
  icon: Icon,
  error,
  className,
  inputProps,
}: FormFieldProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <Label htmlFor={id}>{label}</Label>
      <div
        className={cn(
          "flex items-center gap-2 border rounded-lg px-3 h-12 transition-colors",
          "focus-within:ring-2 focus-within:ring-ring focus-within:border-ring",
          error && "border-destructive focus-within:ring-destructive/20 focus-within:border-destructive"
        )}
      >
        {Icon && <Icon className="h-5 w-5 text-muted-foreground shrink-0" />}
        <Input
          id={id}
          type={type}
          placeholder={placeholder}
          className="border-0 shadow-none focus-visible:ring-0 h-auto px-0"
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${id}-error` : undefined}
          {...inputProps}
        />
      </div>
      {error && (
        <p id={`${id}-error`} className="text-sm text-destructive" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
