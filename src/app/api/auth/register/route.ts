import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { registerSchema } from "@/app/lib/zod";


export async function POST(request: Request) {
    try{
    let user = null;
    const req =  await request.json();
    const {email, password, name} = await registerSchema.parseAsync(req);
    user = await prisma.user.findFirst({ where: { email } });
    if (user) {
        return NextResponse.json("User already exists.", { status: 400 });
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
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}
