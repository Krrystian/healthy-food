import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";


export async function POST(request: Request) {
    let user = null;
    const { email, password, name } = await request.json();
    
    user = await prisma.user.findFirst({ where: { email } });
    if (user) {
        return NextResponse.redirect("/login");
    }        

    const hashedPassword = await bcrypt.hash(password, 10);
    user = await prisma.user.create({
        data: {
            email,
            password: hashedPassword,
            name,
        },
    });
    return NextResponse.json("User has been created.", { status: 201 });
}
