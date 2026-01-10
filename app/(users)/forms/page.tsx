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

  // Access user data from the session object
  // session.user contains: id, name, email, emailVerified, image, etc.
  const user = session.user

  return (
    <div>
      <h1>Dashboard</h1>
      <div>
        <h2>User Data:</h2>
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
        <p>Email Verified: {user.emailVerified ? "Yes" : "No"}</p>
        {user.image && <p>Profile Image: {user.image}</p>}
      </div>

    </div>
  )
}

export default Forms