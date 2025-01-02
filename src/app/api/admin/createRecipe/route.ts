import { auth } from "@/app/auth";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
    try {
        const body = await req.json();
        const user = await auth();
        if (!user || !user.roles.includes("admin")) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        console.log('Form Data:', body);
        return NextResponse.json({ message: "Notifications sent" }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
