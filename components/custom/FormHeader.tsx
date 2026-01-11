"use client";

import { Search, LogOut, User } from "lucide-react";
import { Input } from "@/components/ui/input";
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
    imageUrl?: string ;
};

const FormHeader = ({ name, email, imageUrl }: FormHeaderType) => {
    const router = useRouter();

    const getInitials = (fullName: string) => {
        if (!fullName) return "U";
        const parts = fullName.trim().split(/\s+/);
        if (parts.length === 1) return parts[0].substring(0, 1).toUpperCase();
        return (parts[0][0] + parts[1][0]).toUpperCase();
    };

    const handleLogout = async () => {
        await signOut();
        router.push("/"); // Redirect after logout
    };

    return (
        <div className="flex items-center justify-between px-6 py-3 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 sticky top-0 z-50">
            {/* Logo */}
            <div className="flex items-center gap-2">
                <div className="text-xl font-bold bg-linear-to-tr from-primary to-gray-600 bg-clip-text text-transparent">
                    Drop Form
                </div>
            </div>

            {/* Search input */}
            <div className="flex-1 max-w-md mx-8 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                    placeholder="Search forms..."
                    className="pl-9 bg-muted/40 border-muted-foreground/20 focus-visible:bg-background transition-colors rounded-full"
                />
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

export default FormHeader;