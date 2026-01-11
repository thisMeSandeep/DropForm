"use client"

import FormEditor from '@/components/custom/FormEditor';
import FormPreview from '@/components/custom/FormPreview';
import AiPromptPanel from '@/components/custom/AiPromptPanel';
import Header from './Header';
import { useSession } from "@/utils/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFormStore } from '@/store/useFormStore';

const UserFormEditor = () => {
    const { data: session, isPending } = useSession();
    const router = useRouter()

    useEffect(() => {
        if (!isPending && !session) {
            router.push("/login");
        }
    }, [session, isPending, router]);

    if (isPending) {
        return <div className="flex h-screen w-full items-center justify-center">Loading...</div>; // Or a better skeleton/spinner
    }

    if (!session) {
        return null; // Will redirect via useEffect
    }

    const user = session.user;


    // Get form title from store 
    const form= useFormStore((state)=>state.form);
    const formTitle= form.status;

    return (
        <div>
            {/* Header  */}
            <Header name={user.name} email={user.email} imageUrl={user.image || undefined} formTitle={formTitle}/>

            {/* Editor part  */}
            <div className="flex h-screen w-full overflow-hidden">

                {/* 1. Left Panel - AI Prompt (Fixed width, optional collapse later) */}
                <div className="w-[400px] shrink-0 border-r hidden xl:block">
                    <AiPromptPanel />
                </div>

                {/* 2. Middle Panel - Editor (Fixed width, usually broader than AI panel) */}
                <div className="w-[450px] shrink-0 border-r bg-background">
                    <FormEditor />
                </div>

                {/* 3. Right Panel - Preview (Flex grow to fill remaining space) */}
                <div className="flex-1 min-w-0 bg-slate-50 relative">
                    <FormPreview />
                </div>
            </div>
        </div>
    );
};

export default UserFormEditor;