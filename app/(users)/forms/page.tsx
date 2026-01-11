
import FormHeader from "@/components/custom/FormHeader";
import { TemplateThumbnail } from "@/components/custom/TemplateThumbnail";
import { templates } from "@/data/formData";
import { auth } from "@/utils/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

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
  
// If no session, redirect to login
  if (!session) {
    redirect("/login")
  }

  const user = session.user

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

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">

            {/* Create Blank Card */}
            <div className="flex flex-col gap-3 group w-full cursor-pointer">
              <div className="relative w-full aspect-4/3 bg-white border border-dashed border-zinc-300 rounded-xl overflow-hidden group-hover:border-primary group-hover:bg-primary/5 transition-all duration-300 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                </div>
              </div>
              <div className="flex flex-col gap-0.5">
                <h3 className="text-[14px] font-semibold text-zinc-900 leading-tight">Blank Form</h3>
                <span className="text-[11px] font-medium text-zinc-500">Start from scratch</span>
              </div>
            </div>


            {/* Template Cards */}
            {templates.map((template, idx) => (
              <div key={idx} className="cursor-pointer">
                <TemplateThumbnail template={template} />
              </div>
            ))}
          </div>
        </section>

        {/* Saved Forms Section (Placeholder) */}
        <section>
          <h2 className="text-xl font-semibold text-zinc-900 tracking-tight mb-6">Recent forms</h2>
          <div className="p-12 text-center border bg-white rounded-xl">
            <p className="text-muted-foreground">No forms created yet.</p>
          </div>
        </section>

      </div>
    </div>
  )
}

export default Forms