import { auth } from "@/app/auth";
import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const session = await auth()
    const userRoles = session?.roles;
    if (userRoles && userRoles.includes("admin")) {
        const emails = await prisma.broadcastNotification.findMany({
            take: 5,
            skip: 0,
            orderBy: {
                createdAt: "desc"
            },
            select: {
                id: true,
                title: true,
                createdAt: true,
                user: {
                    select: {
                        name: true
                    }
                }
            }
        });
        return NextResponse.json(emails, { status: 200 });      
    }
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  } catch (error: any) {
    console.error("Error occurred", error);
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
