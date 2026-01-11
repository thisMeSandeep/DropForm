"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useFormStore } from "@/store/useFormStore";
import { updateForm } from "@/actions/form";

export type AutoSaveStatus = "saved" | "saving" | "error" | "unsaved";

export function useFormAutoSave(formId: string) {
  const form = useFormStore((state) => state.form);
  const [status, setStatus] = useState<AutoSaveStatus>("saved");
  const debouncedSaveRef = useRef<NodeJS.Timeout | null>(null);
  const isFirstRender = useRef(true);

  const save = useCallback(async () => {
    setStatus("saving");

    // Construct payload
    const payload = {
      title: form.title,
      description: form.description,
      brandLogo: form.brandLogo,
      logoAlignment: form.logoAlignment,
      status: form.status,
      fieldSchema: form.fieldSchema,
      designSchema: form.designSchema,
    } as any;

    // Simple update without version check
    const result = await updateForm(formId, payload);

    if (result.success && result.data) {
      setStatus("saved");
    } else {
      setStatus("error");
      console.error(result.error);
    }
  }, [form, formId]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    setStatus("unsaved");

    if (debouncedSaveRef.current) {
      clearTimeout(debouncedSaveRef.current);
    }

    debouncedSaveRef.current = setTimeout(() => {
      save();
    }, 3000); // 3s debounce

    return () => {
      if (debouncedSaveRef.current) {
        clearTimeout(debouncedSaveRef.current);
      }
    };
  }, [form, save]);

  return { status };
}
