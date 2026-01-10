"use client"

import { signOut } from "@/utils/auth-client";
import { useRouter } from "next/navigation";

const Logout = () => {

    const router = useRouter();
    const handleLogout = async () => {
        await signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/login");
                },
            },
        });
    }

    return (
        <button onClick={handleLogout}>Logout</button>
    )
}

export default Logout