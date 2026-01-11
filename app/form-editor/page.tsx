"use client";


import FormEditor from '@/components/custom/FormEditor';
import FormPreview from '@/components/custom/FormPreview';
import AiPromptPanel from '@/components/custom/AiPromptPanel';

const FormEditorDemo = () => {
    return (
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
    );
};

export default FormEditorDemo;