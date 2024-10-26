import { auth } from "@/app/auth";
import { EmailTemplate } from "@/app/components/email-template";
import { NextResponse } from "next/server";
import { Resend } from 'resend';
import prisma from "@/app/lib/prisma";
const resend = new Resend(process.env.NEXT_RESEND_API_KEY);

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const user = await auth();
        if (!user || !user.roles.includes("admin")) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        if (!body.title || !body.body) {
            return NextResponse.json({ message: "Title and body are required" }, { status: 400 });
        }

        const usersWithNotifications = await prisma.user.findMany({
            where: 
            {
                notifications: true
            },
            select: {
                email: true
            }
        });
        try {
            await resend.emails.send({
                from: 'healthy-support@krystiancichorz.xyz',
                to: ['healthy-support@krystiancichorz.xyz'],
                bcc: usersWithNotifications.map(user => user.email),
                subject: body.title,
                react: EmailTemplate({
                    title: body.title,
                    htmlContent: body.body,
                    button: true
                }),
            });
        } catch (error) {
            return NextResponse.json({ message: 'Error sending emails' }, { status: 500 });
        }
        await prisma.broadcastNotification.create({
            data: 
            {
                title: body.title,
                message: body.body,
                sendTo: usersWithNotifications.map(user => user.email),
                user: {
                    connect: 
                    {
                        id: user.user.id,
                    }
                }
            }
        });
        return NextResponse.json({ message: "Notifications sent" }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
