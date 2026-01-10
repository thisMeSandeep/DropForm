"use client";

import { signUp } from "@/utils/auth-client";
import { useState } from "react";
import Link from "next/link";

const Signup = () => {

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
    })

    const [errorMessage, setErrorMessage] = useState<string | null>(null);


    // handle onChnage
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    }

    // Sign-up user - automatically signs in and redirects to dashboard
    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setErrorMessage(null);

        try {
            const { error } = await signUp.email({
                name: user.name,
                email: user.email,
                password: user.password,
                callbackURL: "/dashboard", // Redirect to dashboard after successful signup and auto-signin
            });

            if (error) {
                throw new Error(error.message);
            }

            // User will be automatically signed in and redirected to dashboard
            // No need to show success message as redirect happens automatically
        } catch (err: unknown) {
            if (err instanceof Error) {
                setErrorMessage(err.message);
                console.error("Signup error:", err.message);
            } else {
                const errorMsg = "An unexpected error occurred";
                setErrorMessage(errorMsg);
                console.error("Signup error:", err)
            }
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center">Sign Up</h1>

                {errorMessage && (
                    <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded">
                        <p className="text-red-800">{errorMessage}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">

                        <div>
                            <label htmlFor="email" className="block mb-1">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={user.name}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded"
                                required
                            />
                        </div>


                        <div>
                            <label htmlFor="email" className="block mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={user.email}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block mb-1">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={user.password}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            Sign Up
                        </button>
                    </form>

                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                        Already have an account?{" "}
                        <Link href="/login" className="text-blue-600 hover:underline">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Signup