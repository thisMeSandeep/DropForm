"use client"

import FormEditor from '@/components/custom/FormEditor';
import FormPreview from '@/components/custom/FormPreview';
import AiPromptPanel from '@/components/custom/AiPromptPanel';
import Header from './Header';
import { useSession } from "@/utils/auth-client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useRef, Suspense } from "react";
import { useFormStore } from '@/store/useFormStore';
import { LayoutPanelLeft, PanelsTopLeft, Sparkles } from "lucide-react";
import { useFormAutoSave } from "@/hooks/useFormAutoSave";
import { createForm, getForm } from "@/actions/form";


type Pane = 'ai' | 'editor' | 'preview';

const EditorContent = () => {
    const { data: session, isPending } = useSession();
    const router = useRouter();
    const searchParams = useSearchParams();
    const formId = searchParams.get("id");

    const form = useFormStore((state) => state.form);
    const setForm = useFormStore((state) => state.setForm);

    const { status } = useFormAutoSave(formId || "");
    const initialized = useRef(false);

    const formTitle = form.title || "Untitled Form";
    const [activePane, setActivePane] = useState<Pane>('editor');

    useEffect(() => {
        if (!isPending && !session) {
            router.push("/login");
        }
    }, [session, isPending, router]);

    // Initialize form: Fetch existing or Create new
    useEffect(() => {
        if (initialized.current || !session) return;

        const initForm = async () => {
            initialized.current = true;
            if (formId) {
                // Fetch existing form
                const { success, data } = await getForm(formId);
                if (success && data) {
                    setForm(data);
                } else {
                    // Helper: if not found, maybe redirect or show error?
                    // For now, treat as new? No, creating new on bad ID is risky.
                    // Just show error or redirect to clean editor.
                }
            } else {
                // Create new form
                const { success, data } = await createForm({
                    title: "Untitled Form",
                    fieldSchema: [], // Default empty
                    designSchema: {}, // Default empty
                });
                if (success && data) {
                    router.replace(`/form-editor?id=${data.id}`);
                }
            }
        };

        initForm();
    }, [formId, session, setForm, router]);

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
            <Header
                name={user.name}
                email={user.email}
                imageUrl={user.image || undefined}
                formTitle={formTitle}
                status={status}
            />

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

                <div className="hidden h-full xl:grid xl:grid-rows-1 xl:grid-cols-[300px_1fr_1fr] 2xl:grid-cols-[340px_1fr_1fr] gap-3">
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

const UserFormEditor = () => (
    <Suspense fallback={<div className="flex h-screen w-full items-center justify-center">Loading form editor...</div>}>
        <EditorContent />
    </Suspense>
);

export default UserFormEditor;