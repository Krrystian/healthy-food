import { auth } from "@/app/auth";
import { EmailTemplate } from "@/app/components/email-template";
import { NextResponse } from "next/server";
import { Resend } from 'resend';


const resend = new Resend(process.env.NEXT_RESEND_API_KEY);

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const user = await auth();

        if (!user) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        if (!body.title || !body.body) {
            return NextResponse.json({ message: "Title and body are required" }, { status: 400 });
        }

        const { data, error } = await resend.emails.send({
            from: 'healthy-support@krystiancichorz.xyz',
            to: ['krystiancichorz708@gmail.com'],
            subject: body.title,
            react: EmailTemplate({
                title: body.title,
                children: body.body,
                button: true
            }),
        });
        if (error) {
            return NextResponse.json({ error }, { status: 500 });
        }

        return NextResponse.json({ message: "Notification sent", data }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
