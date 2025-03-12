// src/lib/serverActions.ts

"use server";
import { sendMail, compileWelcomeTemplate } from "@/lib/mail";

export const sendEmail = async () => {
  await sendMail({
    to: "stapartments23@gmail.com",
    name: "Satellite Apartments & Shortlet Homes Website",
    subject: "New Submission at  Satellite Apartments,",
    body: compileWelcomeTemplate(
      "Admin",
      "https://your-website.vercel.app/admin/dashboard",
      
    ),
  });
};
