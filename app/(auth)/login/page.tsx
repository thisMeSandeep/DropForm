"use client"
import { signIn } from "@/utils/auth-client"
import { useState, useEffect } from "react"

const Login = () => {
    const [formData, setFormdata] = useState({
        email: "",
        password: "",
    })
    const [errorMessage, setErrorMessage] = useState<string | null>(null)


    // handle onChnage
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setFormdata((prev) => ({
            ...prev,
            [name]: value,
        }));
    }


    // handle login
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const { error } = await signIn.email({
                email: formData.email,
                password: formData.password,
                rememberMe: true,
                callbackURL: `/dashboard`
            });

            if (error) {
                throw new Error(error.message);
            }

        } catch (err: unknown) {
            if (err instanceof Error) {
                alert(err.message);
                console.error("Signup error:", err.message);
            } else {
                const errorMsg = "An unexpected error occurred";
                alert(errorMsg);
                console.error("Signup error:", err)
            }
        }
    }


    // Check for OAuth errors in URL parameters when component mounts
    useEffect(() => {
        if (typeof window !== "undefined") {
            const params = new URLSearchParams(window.location.search);
            const error = params.get("error");
            if (error) {
                setErrorMessage(error === "access_denied"
                    ? "Sign in was cancelled. Please try again."
                    : "An error occurred during sign in. Please try again.");
                // Clean up URL by removing error parameter
                const newUrl = new URL(window.location.href);
                newUrl.searchParams.delete("error");
                window.history.replaceState({}, "", newUrl.pathname);
            }
        }
    }, []);

    // Google Sign in 
    const googleSignIn = async () => {
        try {
            setErrorMessage(null);
            // For OAuth flows, signIn.social() will redirect to the provider
            // After successful auth, Better Auth redirects to callbackURL
            // On error, it will redirect back with error parameter
            const { error } = await signIn.social({
                provider: "google",
                callbackURL: "/dashboard", // Redirect to dashboard on success
            });

            // If there's an immediate error (before redirect), handle it
            if (error) {
                setErrorMessage(error.message || "Failed to initiate Google sign in");
                console.error("Google sign in error:", error.message);
            }
            // Note: If successful, the user will be redirected to Google, 
            // then back to callbackURL after authentication
        } catch (err: unknown) {
            if (err instanceof Error) {
                setErrorMessage(err.message || "An unexpected error occurred");
                console.error("Google sign in error:", err.message);
            } else {
                setErrorMessage("An unexpected error occurred");
                console.error("Google sign in error:", err);
            }
        }
    };


    // GitHub Sign in 
    const githubSignIn = async () => {
        try {
            setErrorMessage(null);
            // For OAuth flows, signIn.social() will redirect to the provider
            // After successful auth, Better Auth redirects to callbackURL
            // On error, it will redirect back with error parameter
            const { error } = await signIn.social({
                provider: "github",
                callbackURL: "/dashboard", // Redirect to dashboard on success
            });

            // If there's an immediate error (before redirect), handle it
            if (error) {
                setErrorMessage(error.message || "Failed to initiate GitHub sign in");
                console.error("GitHub sign in error:", error.message);
            }
            // Note: If successful, the user will be redirected to GitHub, 
            // then back to callbackURL after authentication
        } catch (err: unknown) {
            if (err instanceof Error) {
                setErrorMessage(err.message || "An unexpected error occurred");
                console.error("GitHub sign in error:", err.message);
            } else {
                setErrorMessage("An unexpected error occurred");
                console.error("GitHub sign in error:", err);
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

                {errorMessage && (
                    <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                        {errorMessage}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
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
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Login
                    </button>
                </form>

                <div className="mt-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">Or continue with</span>
                        </div>
                    </div>

                    <div className="mt-4 space-y-3">
                        <button
                            type="button"
                            onClick={googleSignIn}
                            className="w-full px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
                        >
                            Google
                        </button>

                        <button
                            type="button"
                            onClick={githubSignIn}
                            className="w-full px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
                        >
                            GitHub
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login