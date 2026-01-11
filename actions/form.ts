"use server";

import { prisma } from "@/utils/prisma";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { auth } from "@/utils/auth";
import { headers } from "next/headers";
import { FormSchema, FormDesign, FormField } from "@/types/formSchema";

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

    const formattedForm: FormSchema = {
      ...form,
      logoAlignment: form.logoAlignment as "left" | "center" | "right",
      status: form.status as "published" | "draft",
      createdAt: form.createdAt.toISOString(),
      fieldSchema: form.fieldSchema as unknown as {
        version: number;
        fields: FormField[];
      },
      designSchema: form.designSchema as unknown as FormDesign,
    };

    return { success: true, data: formattedForm };
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

    if (!form) {
        return { success: false, error: "Form not found" };
    }

    const formattedForm: FormSchema = {
      ...form,
      logoAlignment: form.logoAlignment as "left" | "center" | "right",
      status: form.status as "published" | "draft",
      createdAt: form.createdAt.toISOString(),
      fieldSchema: form.fieldSchema as unknown as {
        version: number;
        fields: FormField[];
      },
      designSchema: form.designSchema as unknown as FormDesign,
    };

    return { success: true, data: formattedForm };
  } catch (error) {
    console.log(error)
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

    const formattedForms: FormSchema[] = forms.map((form) => ({
      ...form,
      logoAlignment: form.logoAlignment as "left" | "center" | "right",
      status: form.status as "published" | "draft",
      createdAt: form.createdAt.toISOString(),
      fieldSchema: form.fieldSchema as unknown as {
        version: number;
        fields: FormField[];
      },
      designSchema: form.designSchema as unknown as FormDesign,
    }));

    return { success: true, data: formattedForms };
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

    const formattedForm: FormSchema = {
      ...form,
      logoAlignment: form.logoAlignment as "left" | "center" | "right",
      status: form.status as "published" | "draft",
      createdAt: form.createdAt.toISOString(),
      fieldSchema: form.fieldSchema as unknown as {
        version: number;
        fields: FormField[];
      },
      designSchema: form.designSchema as unknown as FormDesign,
    };

    return { success: true, data: formattedForm };
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

// Publish form
export async function publishForm(id: string) {
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
        userId: session.user.id,
      },
      data: {
        status: "published",
        publishedAt: new Date(),
      },
    });
    revalidatePath("/form-editor");
    return { success: true, data: form };
  } catch (error) {
    console.error("Publish failed:", error);
    return { success: false, error: "Failed to publish form" };
  }
}

// Get form stats (Dashboard Overview)
export async function getFormStats(id: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    const form = await prisma.form.findUnique({
      where: {
        id,
        userId: session.user.id,
      },
      select: {
        id: true,
        title: true,
        status: true,
        totalResponses: true,
        lastResponseAt: true,
        publishedAt: true,
        createdAt: true,
        responses: {
          orderBy: {
            createdAt: 'desc'
          },
          take: 5 
        }
      }
    });

    if (!form) {
      return { success: false, error: "Form not found" };
    }

    return { success: true, data: form };
  } catch (error) {
    console.error("Failed to get form stats:", error);
    return { success: false, error: "Failed to get form stats" };
  }
}

// Get all responses (Responses Page)
export async function getFormResponses(id: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    const form = await prisma.form.findUnique({
      where: {
        id,
        userId: session.user.id
      },
      select: {
        fieldSchema: true,
        responses: {
          orderBy: {
            createdAt: 'desc'
          }
        }
      }
    });

    if (!form) {
      return { success: false, error: "Form not found" };
    }

    return { 
      success: true, 
      data: {
        responses: form.responses,
        fieldSchema: form.fieldSchema 
      }
    };
  } catch (error) {
    console.error("Failed to get responses:", error);
    return { success: false, error: "Failed to get responses" };
  }
}

// Update form status (Settings Page)
export async function updateFormStatus(id: string, status: "draft" | "published" | "paused" | "closed") {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    const data: any = { status };
    // If setting to published and it wasn't published before, set publishedAt
    if (status === 'published') {
        const currentForm = await prisma.form.findUnique({
             where: { id },
             select: { publishedAt: true }
        });
        if (currentForm && !currentForm.publishedAt) {
            data.publishedAt = new Date();
        }
    }

    const form = await prisma.form.update({
      where: {
        id,
        userId: session.user.id,
      },
      data,
    });
    
    revalidatePath(`/dashboard/${id}`);
    return { success: true, data: form };
  } catch (error) {
    console.error("Failed to update status:", error);
    return { success: false, error: "Failed to update status" };
  }
}

// Get public form data
export async function getPublicForm(id: string) {
  try {
    const form = await prisma.form.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        title: true,
        description: true,
        status: true,
        fieldSchema: true,
        designSchema: true,
        brandLogo: true,
        logoAlignment: true,
      }
    });

    if (!form) {
      return { success: false, error: "Form not found" };
    }

    // Only allow published or paused forms to be fetched (paused will show a specific message in UI)
    if (form.status === 'draft' || form.status === 'archived') {
         return { success: false, error: "Form not found" };
    }

    const formattedForm: Partial<FormSchema> = {
      ...form,
      logoAlignment: form.logoAlignment as "left" | "center" | "right",
      status: form.status as "published" | "draft" | "paused" | "closed",
      fieldSchema: form.fieldSchema as unknown as {
        version: number;
        fields: FormField[];
      },
      designSchema: form.designSchema as unknown as FormDesign,
    };

    return { success: true, data: formattedForm };
  } catch (error) {
    console.error("Failed to get public form:", error);
    return { success: false, error: "Failed to get form" };
  }
}

// Submit response
export async function submitResponse(formId: string, values: any) {
    try {
        const form = await prisma.form.findUnique({
            where: { id: formId },
            include: { user: true }
        });

        if (!form) {
            return { success: false, error: "Form not found" };
        }

        if (form.status !== 'published') {
            return { success: false, error: "Form is not accepting responses" };
        }

        const user = form.user;
        if (user.responsesUsed >= user.responseLimit) {
            return { success: false, error: "This form has reached its response limit." };
        }

        // Transaction to ensure data integrity
        await prisma.$transaction(async (tx) => {
            // Create response
            await tx.response.create({
                data: {
                    formId,
                    values,
                }
            });

            // Update form stats
            await tx.form.update({
                where: { id: formId },
                data: {
                    totalResponses: { increment: 1 },
                    lastResponseAt: new Date(),
                }
            });

            // Increment user usage
            await tx.user.update({
                where: { id: user.id },
                data: {
                    responsesUsed: { increment: 1 }
                }
            });
        });

        revalidatePath(`/dashboard/${formId}`);
        return { success: true };

    } catch (error) {
        console.error("Submission failed:", error);
        return { success: false, error: "Failed to submit response" };
    }
}
