import Link from "next/link";
import { redirect } from "next/navigation";

const EmailVerification = async ({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) => {
    const params = await searchParams;
    const error = params.error;

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Email Verification Failed</h1>
                    <p className="mb-4">{typeof error === 'string' ? error : 'Invalid or expired verification link'}</p>
                    <Link href="/login" className="text-blue-600 hover:underline">
                        Go to Login
                    </Link>
                </div>
            </div>
        );
    }

    // Verification successful - redirect to dashboard with full access
    redirect("/dashboard");
}

export default EmailVerification 