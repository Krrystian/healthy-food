import { auth } from "@/app/auth";
import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const pageSize = 7;
    const searchById = searchParams.get("id");
    const searchByEmail = searchParams.get("email");
    const activeFilter = searchParams.get("active");

    const session = await auth()
    const userRoles = session?.roles;
    
    if (userRoles && userRoles.includes("admin")) {
      const whereClause: any = {};
      if (searchById) {
        whereClause.id = parseInt(searchById, 10);
      }
      if (searchByEmail) {
        whereClause.email = {
          contains: searchByEmail, 
          mode: "insensitive",
        };
      }

      if (activeFilter === "true") {
        whereClause.active = true;
      } else if (activeFilter === "false") {
        whereClause.active = false;
      }


      const totalUsers = await prisma.user.count({
        where: whereClause,
      });

      const users = await prisma.user.findMany({
        where: whereClause,
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
  } catch (error: any) {
    console.error("Error occurred", error);
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
