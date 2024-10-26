import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { registerSchema } from "@/app/lib/zod";


export async function POST(request: Request) {
    console.log("Request received");
    try{
    let user = null;
    const req =  await request.json();
    console.log(req);
    
    const { email, password, name } = req;
    const data = {
        emailReg: email,
        passwordReg: password,
        nameReg: name,
        confirm_passwordReg: password,
    }
    const parsedData = registerSchema.safeParse(data);
    if (!parsedData.success) {
        return NextResponse.json(parsedData.error.errors, { status: 400 });
    }
    user = await prisma.user.findFirst({ where: { email: data.emailReg } });
    if (user) {
        return NextResponse.json("User already exists.", { status: 400 });
    }    
    const hashedPassword = await bcrypt.hash(data.passwordReg, 10);
    user = await prisma.user.create({
        data: {
            email: data.emailReg,
            password: hashedPassword,
            name : data.nameReg,
        },
    });
    return NextResponse.json("User has been created.", { status: 201 });
    } catch (error) {
        console.log(error);
        return NextResponse.json(error, { status: 500 });
    }
}
