"use server";

import { prisma } from "@/utils/prisma";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { auth } from "@/utils/auth";
import { headers } from "next/headers";

// Create form
export async function createForm(
  data: Omit<Prisma.FormUncheckedCreateInput, "userId" | "status" | "version">
) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    const form = await prisma.form.create({
      data: {
        ...data,
        userId: session.user.id,
      },
    });
    return { success: true, data: form };
  } catch (error) {
    console.error("Failed to create form:", error);
    return { success: false, error: "Failed to create form" };
  }
}

// Get form by id
export async function getForm(id: string) {
  try {
    const form = await prisma.form.findUnique({
      where: { id },
    });
    return { success: true, data: form };
  } catch (error) {
    return { success: false, error: "Form not found" };
  }
}

// Get all forms for user
export async function getForms() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    const forms = await prisma.form.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return { success: true, data: forms };
  } catch (error) {
    console.error("Failed to fetch forms:", error);
    return { success: false, error: "Failed to fetch forms" };
  }
}

// Update form by id
export async function updateForm(id: string, data: Prisma.FormUpdateInput) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    const form = await prisma.form.update({
      where: {
        id,
      },
      data: {
        ...data,
      },
    });

    revalidatePath(`/form-editor/${id}`);
    return { success: true, data: form };
  } catch (error) {
    console.error("Update failed:", error);
    return { success: false, error: "Failed to update form" };
  }
}

// Delete form
export async function deleteForm(id: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    await prisma.form.delete({
      where: {
        id,
        userId: session.user.id, // Ensure user owns the form
      },
    });
    revalidatePath("/forms");
    return { success: true };
  } catch (error) {
    console.error("Delete failed:", error);
    return { success: false, error: "Failed to delete form" };
  }
}
