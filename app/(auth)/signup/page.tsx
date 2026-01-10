"use client"

import { signUp, signIn } from "@/utils/auth-client"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import Image from "next/image"
import Link from "next/link"
import { Mail, Lock, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import ButtonWithLoader from "@/components/custom/ButtonWithLoader"
import { Card, CardContent } from "@/components/ui/card"
import { FormField } from "@/components/ui/form-field"
import { BGPattern } from "@/components/ui/bg-pattern"

// Zod validation schema
const signupSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.email("Please enter a valid email address"),
    password: z
        .string()
        .min(1, "Password is required")
        .min(6, "Password must be at least 6 characters"),
})

type SignupFormData = z.infer<typeof signupSchema>

const Signup = () => {
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignupFormData>({
        resolver: zodResolver(signupSchema),
    })

    // Handle email/password signup
    const onSubmit = async (data: SignupFormData) => {
        setIsSubmitting(true)
        setErrorMessage(null)

        try {
            const { error } = await signUp.email({
                name: data.name,
                email: data.email,
                password: data.password,
                callbackURL: `/forms`,
            })

            if (error) {
                setErrorMessage(error.message || "Something went wrong during sign up")
            }
        } catch (err: unknown) {
            if (err instanceof Error) {
                setErrorMessage(err.message || "An unexpected error occurred")
                console.error("Signup error:", err.message)
            } else {
                setErrorMessage("An unexpected error occurred")
                console.error("Signup error:", err)
            }
        } finally {
            setIsSubmitting(false)
        }
    }

    // Social Sign in (Google, GitHub)
    const socialSignIn = async (provider: "google" | "github") => {
        try {
            setErrorMessage(null)
            const { error } = await signIn.social({
                provider,
                callbackURL: "/forms",
            })

            if (error) {
                const providerName = provider === "google" ? "Google" : "GitHub"
                setErrorMessage(
                    error.message || `Failed to initiate ${providerName} sign in`
                )
                console.error(`${providerName} sign in error:`, error.message)
            }
        } catch (err: unknown) {
            const providerName = provider === "google" ? "Google" : "GitHub"
            if (err instanceof Error) {
                setErrorMessage(err.message || "An unexpected error occurred")
                console.error(`${providerName} sign in error:`, err.message)
            } else {
                setErrorMessage("An unexpected error occurred")
                console.error(`${providerName} sign in error:`, err)
            }
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative">
            {/* Background Pattern */}
            <BGPattern variant="grid" mask="fade-edges" fill="#030014" className="opacity-15" />
            <Card className="w-full max-w-md rounded-2xl shadow-[0_20px_50px_rgba(3,0,20,0.4)] border border-white/10 bg-background/60 backdrop-blur-xl">
                <CardContent className="p-6 flex flex-col gap-6">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold">Create an Account</h1>
                        <p className="text-gray-600 text-sm mt-1">
                            Join DropForm and start managing your forms
                        </p>
                    </div>

                    {errorMessage && (
                        <div className="p-3 bg-destructive/10 border border-destructive/20 text-destructive rounded-lg text-sm">
                            {errorMessage}
                        </div>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
                        {/* Name Field */}
                        <FormField
                            id="name"
                            label="Full Name"
                            type="text"
                            placeholder="Enter your full name"
                            icon={User}
                            error={errors.name?.message}
                            inputProps={register("name")}
                        />

                        {/* Email Field */}
                        <FormField
                            id="email"
                            label="Email"
                            type="email"
                            placeholder="Enter your email"
                            icon={Mail}
                            error={errors.email?.message}
                            inputProps={register("email")}
                        />

                        {/* Password Field */}
                        <FormField
                            id="password"
                            label="Password"
                            type="password"
                            placeholder="Create a password"
                            icon={Lock}
                            error={errors.password?.message}
                            inputProps={register("password")}
                        />

                        {/* Submit Button */}
                        <ButtonWithLoader
                            type="submit"
                            variant="default"
                            className="w-full h-12 text-base font-medium rounded-lg"
                            loading={isSubmitting}
                            loadingText="Creating account..."
                        >
                            Sign Up
                        </ButtonWithLoader>
                    </form>

                    {/* Divider */}
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-border"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-background text-muted-foreground">
                                Or continue with
                            </span>
                        </div>
                    </div>

                    {/* Social Login Buttons */}
                    <div className="flex flex-row gap-3">
                        <Button
                            type="button"
                            variant="outline"
                            className="flex-1 h-12 rounded-lg flex items-center justify-center gap-2"
                            onClick={() => socialSignIn("google")}
                        >
                            <Image
                                src="/google.svg"
                                alt="Google"
                                width={20}
                                height={20}
                                className="shrink-0"
                            />
                            Google
                        </Button>

                        <Button
                            type="button"
                            variant="outline"
                            className="flex-1 h-12 rounded-lg flex items-center justify-center gap-2"
                            onClick={() => socialSignIn("github")}
                        >
                            <Image
                                src="/github.svg"
                                alt="GitHub"
                                width={20}
                                height={20}
                                className="shrink-0"
                            />
                            GitHub
                        </Button>
                    </div>

                    {/* Login Link */}
                    <p className="text-center text-sm text-muted-foreground mt-2">
                        Already have an account?{" "}
                        <Link href="/login" className="text-primary cursor-pointer hover:underline font-medium">
                            Sign In
                        </Link>
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}

export default Signup