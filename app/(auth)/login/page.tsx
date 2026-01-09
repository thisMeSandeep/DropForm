"use client"

import React, { useState } from "react"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"
import { Eye, EyeOff } from "lucide-react"

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

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(1, "Password is required."),
})

type LoginFormValues = z.infer<typeof loginSchema>

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const { isSubmitting } = form.formState

  function onSubmit(data: LoginFormValues) {
    console.log("Login Data:", data)
  }

  return (
    <div className="min-h-screen bg-zinc-50 flex items-center justify-center px-4 py-12">
      <div className="flex flex-col gap-6 w-full max-w-sm">
        <Card className="border-zinc-200 shadow-xl rounded-2xl">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-2xl font-bold text-zinc-900 border-b-0">
              Welcome back
            </CardTitle>
            <CardDescription className="text-zinc-500 font-medium">
              Enter your email to sign in to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FieldGroup className="space-y-2.5">
                <Controller
                  name="email"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid} className="space-y-1">
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

                <Controller
                  name="password"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid} className="space-y-1">
                      <div className="flex items-center justify-between">
                        <FieldLabel htmlFor={field.name} className="text-zinc-700 font-semibold text-xs uppercase tracking-wider">
                          Password
                        </FieldLabel>
                        <Link
                          href="/forget-password"
                          className="text-xs font-semibold text-zinc-500 hover:text-zinc-900 hover:underline underline-offset-4 transition-all"
                        >
                          Forgot?
                        </Link>
                      </div>
                      <div className="relative">
                        <Input
                          {...field}
                          id={field.name}
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
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

                <Field className="pt-2 space-y-2">
                  <ButtonWithLoader
                    type="submit"
                    loading={isSubmitting}
                    className="h-10 w-full bg-zinc-900 text-white font-semibold hover:bg-zinc-800 transition-all rounded-lg shadow-sm"
                  >
                    Sign In
                  </ButtonWithLoader>
                </Field>

                <div className="relative py-2">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-zinc-100" />
                  </div>
                  <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-widest">
                    <span className="bg-white px-2 text-zinc-400">
                      Or continue with
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="h-9 border-zinc-200 bg-white text-zinc-700 font-semibold text-xs hover:bg-zinc-50 transition-all rounded-lg"
                    onClick={() => console.log("Google Login")}
                  >
                    Google
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="h-9 border-zinc-200 bg-white text-zinc-700 font-semibold text-xs hover:bg-zinc-50 transition-all rounded-lg"
                    onClick={() => console.log("GitHub Login")}
                  >
                    GitHub
                  </Button>
                </div>

                <FieldDescription className="text-center text-sm pt-2">
                  Don't have an account?{" "}
                  <Link href="/signup" className="font-semibold text-zinc-900 hover:underline underline-offset-4">
                    Sign up
                  </Link>
                </FieldDescription>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
        <FieldDescription className="px-6 text-center text-zinc-500 text-xs">
          By signing in, you agree to our <a href="#" className="underline underline-offset-2 hover:text-zinc-900">Terms</a>{" "}
          and <a href="#" className="underline underline-offset-2 hover:text-zinc-900">Privacy Policy</a>.
        </FieldDescription>
      </div>
    </div>
  )
}
