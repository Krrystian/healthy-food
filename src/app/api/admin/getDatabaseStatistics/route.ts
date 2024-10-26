import { auth } from "@/app/auth";
import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const session = await auth()
    const userRoles = session?.roles;
    if (userRoles && userRoles.includes("admin")) {
        let statistics = [];
        const today = new Date().toISOString().split('T')[0];
        console.log(today);
        const users = await prisma.user.count({
            where: {
                createdAt: {
                    gte: new Date(today)
                }
            }
        });
        console.log(users);
        return NextResponse.json("", { status: 200 });      
    }
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  } catch (error: any) {
    console.error("Error occurred", error);
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
