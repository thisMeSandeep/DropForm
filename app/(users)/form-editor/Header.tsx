"use client";

import { File, LogOut, User, Loader2 } from "lucide-react";
import { signOut } from "@/utils/auth-client";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";

type FormHeaderType = {
    name: string;
    email: string;
    imageUrl?: string;
    formTitle: string;
    status: "saved" | "saving" | "error" | "unsaved";
};

const Header = ({ name, email, imageUrl, formTitle, status }: FormHeaderType) => {
    const router = useRouter();

    const getInitials = (fullName: string) => {
        if (!fullName) return "U";
        const parts = fullName.trim().split(/\s+/);
        if (parts.length === 1) return parts[0].substring(0, 1).toUpperCase();
        return (parts[0][0] + parts[1][0]).toUpperCase();
    };

    const handleLogout = async () => {
        await signOut();
        router.push("/sign-in"); // Redirect after logout
    };

    return (
        <div className="flex items-center justify-between px-6 py-3 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 sticky top-0 z-50">
            {/* Logo */}
            <div className="flex items-center gap-2">
                <File className="size-10 text-gray-800" />

                {/* Sync status */}
                <div>
                    <p className="text-xl text-gray-600">{formTitle}</p>
                    <p className="text-xs text-muted-foreground">
                        {status === "saving" && <Loader2 className="animate-spin h-4 w-4" />}
                        {status === "saved" && "Saved to cloud"}
                        {status === "error" && <span className="text-red-500">Error saving</span>}
                        {status === "unsaved" && "Unsaved changes"}
                    </p>
                </div>
            </div>


            {/* User Profile */}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button className="rounded-full ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                        <Avatar className="h-9 w-9 border border-border shadow-sm">
                            <AvatarImage src={imageUrl} alt={name} />
                            <AvatarFallback className="bg-primary/10 text-primary font-medium">
                                {getInitials(name)}
                            </AvatarFallback>
                        </Avatar>
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                            <p className="text-sm font-medium leading-none">{name}</p>
                            <p className="text-xs leading-none text-muted-foreground">
                                {email}
                            </p>
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem disabled>
                        <User className="mr-2 h-4 w-4" /> Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive">
                        <LogOut className="mr-2 h-4 w-4" /> Log out
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default Header;