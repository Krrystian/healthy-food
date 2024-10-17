import prisma from "@/app/lib/prisma";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
    try {
        const body = await req.json();
        const user = await getToken({ req, secret: process.env.AUTH_SECRET } as any);
        const userRoles = user?.roles;
        console.log(body, userRoles);
        if (userRoles && userRoles.includes("admin")) {
            const userToUpdate = await prisma.user.findUnique({
                where: {
                    id: body.id,
                },
            });

            if (userToUpdate) {
                await prisma.user.update({
                    where: {
                        id: body.id,
                    },
                    data: {
                        active: !userToUpdate.active,
                    },
                });
            }
            return NextResponse.json({ message: "User suspended" });
        }
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 400 });
    }
}
