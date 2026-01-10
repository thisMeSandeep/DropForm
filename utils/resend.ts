// Not using this 

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail({
  to,
  subject,
  text,
}: {
  to: string;
  subject: string;
  text: string;
}) {
  try {
    await resend.emails.send({
      from: "Drop Form <onboarding@drop-form.com>",
      to,
      subject,
      html: `<p>${text}</p>`, // Convert text to HTML
    });
  } catch (error) {
    console.error("Failed to send email:", error);
  }
}
