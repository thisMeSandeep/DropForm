"use client"

import FormEditor from '@/components/custom/FormEditor';
import FormPreview from '@/components/custom/FormPreview';
import AiPromptPanel from '@/components/custom/AiPromptPanel';
import Header from './Header';
import { useSession } from "@/utils/auth-client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormStore } from '@/store/useFormStore';
import { LayoutPanelLeft, PanelsTopLeft, Sparkles } from "lucide-react";

type Pane = 'ai' | 'editor' | 'preview';

const UserFormEditor = () => {
    const { data: session, isPending } = useSession();
    const router = useRouter()
    const form = useFormStore((state)=>state.form);
    const formTitle = form.title || "Untitled Form";
    const [activePane, setActivePane] = useState<Pane>('editor');

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

    const mobileButtonClasses = (pane: Pane) =>
        `flex items-center gap-2 rounded-xl border px-3 py-2 text-sm font-medium transition ${activePane === pane ? 'bg-slate-900 text-white shadow-sm border-slate-900' : 'bg-white text-slate-700 hover:bg-slate-100 border-slate-200'}`;

    return (
        <div className="min-h-screen bg-slate-50">
            <Header name={user.name} email={user.email} imageUrl={user.image || undefined} formTitle={formTitle} />

            <div className="h-[calc(100vh-80px)] w-full overflow-hidden px-4 py-3 xl:px-6">
                <div className="mb-3 flex items-center gap-2 xl:hidden">
                    <button className={mobileButtonClasses('ai')} onClick={() => setActivePane('ai')} aria-label="Open AI prompt">
                        <Sparkles className="h-4 w-4" />
                        <span>AI Prompt</span>
                    </button>
                    <button className={mobileButtonClasses('editor')} onClick={() => setActivePane('editor')} aria-label="Open form editor">
                        <LayoutPanelLeft className="h-4 w-4" />
                        <span>Editor</span>
                    </button>
                    <button className={mobileButtonClasses('preview')} onClick={() => setActivePane('preview')} aria-label="Open form preview">
                        <PanelsTopLeft className="h-4 w-4" />
                        <span>Preview</span>
                    </button>
                </div>

                <div className="hidden h-full xl:grid xl:grid-rows-1 xl:grid-cols-[320px_minmax(520px,1fr)_minmax(520px,1.1fr)] 2xl:grid-cols-[360px_minmax(600px,1fr)_minmax(640px,1.2fr)] gap-3">
                    <div className="h-full rounded-2xl border bg-white/70 backdrop-blur-sm shadow-sm overflow-hidden">
                        <div className="h-full overflow-auto">
                            <AiPromptPanel />
                        </div>
                    </div>

                    <div className="h-full rounded-2xl border bg-white shadow-sm overflow-hidden flex flex-col">
                        <div className="flex-1 overflow-auto">
                            <FormEditor />
                        </div>
                    </div>

                    <div className="h-full rounded-2xl border bg-white shadow-sm overflow-hidden flex flex-col">
                        <div className="flex-1 overflow-auto">
                            <FormPreview />
                        </div>
                    </div>
                </div>

                <div className="xl:hidden h-full">
                    <div className="h-full rounded-2xl border bg-white shadow-sm overflow-hidden flex flex-col">
                        <div className="flex-1 overflow-auto">
                            {activePane === 'ai' && <AiPromptPanel />}
                            {activePane === 'editor' && <FormEditor />}
                            {activePane === 'preview' && <FormPreview />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserFormEditor;