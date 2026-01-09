"use client"

import React, { useState } from "react"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"
import { Eye, EyeOff } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldError,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import ButtonWithLoader from "@/components/custom/ButtonWithLoader"

const signupSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters."),
    email: z.string().email("Please enter a valid email address."),
    password: z.string().min(8, "Password must be at least 8 characters."),
    confirmPassword: z.string().min(8, "Please confirm your password."),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
})

type SignupFormValues = z.infer<typeof signupSchema>

export default function SignupPage() {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const form = useForm<SignupFormValues>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    })

    const { isSubmitting } = form.formState

    function onSubmit(data: SignupFormValues) {
        console.log("Signup Data:", data)
    }

    return (
        <div className="min-h-screen bg-zinc-50 flex items-center justify-center px-4 py-12">
            <div className="flex flex-col gap-6 w-full max-w-md">
                <Card className="border-zinc-200 shadow-xl rounded-2xl">
                    <CardHeader className="text-center pb-2">
                        <CardTitle className="text-2xl font-bold text-zinc-900 border-b-0">
                            Create your account
                        </CardTitle>
                        <CardDescription className="text-zinc-500 font-medium">
                            Enter your details below to create your account
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FieldGroup className="space-y-2.5">
                                <Controller
                                    name="name"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor={field.name} className="text-zinc-700 font-semibold text-xs uppercase tracking-wider">
                                                Full Name
                                            </FieldLabel>
                                            <Input
                                                {...field}
                                                id={field.name}
                                                type="text"
                                                placeholder="John Doe"
                                                className="h-10 border-zinc-200 bg-zinc-50 text-zinc-900 placeholder:text-zinc-400 focus-visible:ring-zinc-900/5 focus-visible:border-zinc-400 transition-all rounded-lg"
                                            />
                                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                        </Field>
                                    )}
                                />

                                <Controller
                                    name="email"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor={field.name} className="text-zinc-700 font-semibold text-xs uppercase tracking-wider">
                                                Email address
                                            </FieldLabel>
                                            <Input
                                                {...field}
                                                id={field.name}
                                                type="email"
                                                placeholder="m@example.com"
                                                className="h-10 border-zinc-200 bg-zinc-50 text-zinc-900 placeholder:text-zinc-400 focus-visible:ring-zinc-900/5 focus-visible:border-zinc-400 transition-all rounded-lg"
                                            />
                                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                        </Field>
                                    )}
                                />

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                    <Controller
                                        name="password"
                                        control={form.control}
                                        render={({ field, fieldState }) => (
                                            <Field data-invalid={fieldState.invalid} className="space-y-1">
                                                <FieldLabel htmlFor={field.name} className="text-zinc-700 font-semibold text-xs uppercase tracking-wider">
                                                    Password
                                                </FieldLabel>
                                                <div className="relative">
                                                    <Input
                                                        {...field}
                                                        id={field.name}
                                                        type={showPassword ? "text" : "password"}
                                                        className="h-10 border-zinc-200 bg-zinc-50 pr-10 text-zinc-900 placeholder:text-zinc-400 focus-visible:ring-zinc-900/5 focus-visible:border-zinc-400 transition-all rounded-lg"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowPassword(!showPassword)}
                                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 transition-colors"
                                                    >
                                                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                                    </button>
                                                </div>
                                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                            </Field>
                                        )}
                                    />

                                    <Controller
                                        name="confirmPassword"
                                        control={form.control}
                                        render={({ field, fieldState }) => (
                                            <Field data-invalid={fieldState.invalid} className="space-y-1">
                                                <FieldLabel htmlFor={field.name} className="text-zinc-700 font-semibold text-xs uppercase tracking-wider">
                                                    Confirm
                                                </FieldLabel>
                                                <div className="relative">
                                                    <Input
                                                        {...field}
                                                        id={field.name}
                                                        type={showConfirmPassword ? "text" : "password"}
                                                        className="h-10 border-zinc-200 bg-zinc-50 pr-10 text-zinc-900 placeholder:text-zinc-400 focus-visible:ring-zinc-900/5 focus-visible:border-zinc-400 transition-all rounded-lg"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 transition-colors"
                                                    >
                                                        {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                                    </button>
                                                </div>
                                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                            </Field>
                                        )}
                                    />
                                </div>

                                <Field className="space-y-2">
                                    <ButtonWithLoader
                                        type="submit"
                                        loading={isSubmitting}
                                        className="h-10 w-full bg-zinc-900 text-white font-semibold hover:bg-zinc-800 transition-all rounded-lg shadow-sm"
                                    >
                                        Create Account
                                    </ButtonWithLoader>
                                    <FieldDescription className="text-center text-sm">
                                        Already have an account?{" "}
                                        <Link href="/login" className="font-semibold text-zinc-900 hover:underline underline-offset-4">
                                            Sign in
                                        </Link>
                                    </FieldDescription>
                                </Field>
                            </FieldGroup>
                        </form>
                    </CardContent>
                </Card>
                <FieldDescription className="px-6 text-center text-zinc-500">
                    By clicking continue, you agree to our <a href="#" className="underline underline-offset-2 hover:text-zinc-900">Terms of Service</a>{" "}
                    and <a href="#" className="underline underline-offset-2 hover:text-zinc-900">Privacy Policy</a>.
                </FieldDescription>
            </div>
        </div>
    )
}
