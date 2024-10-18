import { auth } from "@/app/auth";
import prisma from "@/app/lib/prisma";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json()
  console.log(body)
  const data = [body.age, ...body.dietGoal, ...body.foodIntolerances, ...body.optionalDiseases, ...body.foodAvoidance]
  console.log(data)
  return NextResponse.json({ message: "Unauthorized" }, { status: 200 });
}
