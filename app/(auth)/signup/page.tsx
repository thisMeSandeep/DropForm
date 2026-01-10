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

    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);


    // handle onChnage
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    }

    // Sign-up user 
    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setErrorMessage(null);
        setShowSuccessMessage(false);

        try {
            const { error } = await signUp.email({
                name: user.name,
                email: user.email,
                password: user.password,
                callbackURL: `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL || window.location.origin}/email-varification`,
            });

            if (error) {
                throw new Error(error.message);
            }

            // Show success message - user needs to verify email first
            setShowSuccessMessage(true);
            // Reset form
            setUser({ name: "", email: "", password: "" });
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

                {showSuccessMessage && (
                    <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded">
                        <p className="text-green-800">
                            Account created successfully! Please check your email to verify your account.
                            You will be redirected to the dashboard after verification.
                        </p>
                    </div>
                )}

                {errorMessage && (
                    <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded">
                        <p className="text-red-800">{errorMessage}</p>
                    </div>
                )}

                {!showSuccessMessage && (
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
                )}

                {showSuccessMessage && (
                    <div className="text-center">
                        <Link href="/login" className="text-blue-600 hover:underline">
                            Go to Login
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Signup