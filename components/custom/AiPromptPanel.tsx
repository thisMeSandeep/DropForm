"use client";


import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export const AiPromptPanel = () => {
  return (
    <div className="flex flex-col h-full bg-background border-r p-4 gap-4">
      <div className="flex items-center gap-2 text-primary font-semibold">
        <Sparkles className="w-5 h-5" />
        AI Generator
      </div>

      <div className="flex-1 flex flex-col justify-center gap-4 text-center p-4 border-2 border-dashed rounded-lg bg-muted/20">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto text-primary">
          <Sparkles className="w-6 h-6" />
        </div>
        <div>
          <h3 className="font-medium mb-1">Coming Soon</h3>
          <p className="text-sm text-muted-foreground">
            Describe your form and let AI build it for you in seconds.
          </p>
        </div>

        <Textarea
          placeholder="e.g., Create a registration form for a hackathon..."
          className="min-h-[100px] resize-none"
          disabled
        />

        <Button disabled className="w-full">
          <Sparkles className="w-4 h-4 mr-2" />
          Generate Form
        </Button>
      </div>
    </div>
  );
};

export default AiPromptPanel;