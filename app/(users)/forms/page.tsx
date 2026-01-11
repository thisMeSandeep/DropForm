import TemplateList from "./TemplateList";
import FormHeader from "@/components/custom/FormHeader";
import { auth } from "@/utils/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getForms } from "@/actions/form";
import { FormCardWrapper } from "@/components/custom/FormCardWrapper";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const Forms = async () => {
  let session;
  try {
    session = await auth.api.getSession({
      headers: await headers()
    })
  } catch (error) {
    console.error("Session error (likely corrupted cookie):", error);
    redirect("/login");
  }

  if (!session) {
    redirect("/login")
  }

  const user = session.user
  const { data: forms } = await getForms();

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <FormHeader name={user.name} email={user.email} imageUrl={user.image || undefined} />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">

        {/* Templates Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-zinc-900 tracking-tight">Start with a template</h2>
            <button className="text-sm font-medium text-primary hover:text-primary/90 transition-colors">
              View all
            </button>
          </div>

          <TemplateList />
        </section>

        {/* Saved Forms Section */}
        <section>
          <h2 className="text-xl font-semibold text-zinc-900 tracking-tight mb-6">Recent forms</h2>

          {forms && forms.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {forms.map((form) => (
                <FormCardWrapper key={form.id} form={form} />
              ))}
            </div>
          ) : (
            <div className="p-12 text-center border bg-white rounded-sm">
              <p className="text-muted-foreground">No forms created yet.</p>
            </div>
          )}
        </section>

      </div>
    </div>
  )
}

export default Forms