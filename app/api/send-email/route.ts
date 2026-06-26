import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, requirement } = await req.json();

    const data = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Thank You for Contacting Us",
      html: `
        <div style="font-family: Arial; padding:20px;">
          <h2>Hello ${name} 👋</h2>

          <p>Thank you for contacting us.</p>

          <p><strong>Your Requirement:</strong></p>

          <p>${requirement}</p>

          <br>

          <a href="https://google.com"
          style="
          background:#2563eb;
          color:white;
          padding:12px 20px;
          border-radius:8px;
          text-decoration:none;">
          Learn More
          </a>

          <br><br>

          Regards,<br>

          Lead Management Team
        </div>
      `,
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error },
      { status: 500 }
    );
  }
}