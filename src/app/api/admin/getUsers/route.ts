import prisma from "@/app/lib/prisma";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
      const { searchParams } = new URL(req.url);
      const page = parseInt(searchParams.get("page") || "1", 10);
      const pageSize = 7; // Number of users per page
  
      const user = await getToken({ req, secret: process.env.AUTH_SECRET } as any);
      const userRoles = user?.roles;
  
      if (userRoles && userRoles.includes("admin")) {
        const totalUsers = await prisma.user.count();
        const users = await prisma.user.findMany({
          skip: (page - 1) * pageSize,
          take: pageSize,
          select: {
            id: true,
            name: true,
            email: true,
            active: true,
            roles: true,
          },
        });
  
        return NextResponse.json({
          users,
          totalPages: Math.ceil(totalUsers / pageSize),
          currentPage: page,
        });
      }
  
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    } catch (error:any) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }
  }
  