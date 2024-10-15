import prisma from "@/app/lib/prisma";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  console.log("GET request received");
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const pageSize = 7;
    const searchById = searchParams.get("id");
    const searchByEmail = searchParams.get("email");
    const activeFilter = searchParams.get("active");

    console.log("Parsed query parameters", { page, searchById, searchByEmail, activeFilter });

    const user = await getToken({ req, secret: process.env.AUTH_SECRET } as any);
    console.log("Authenticated user", user);

    const userRoles = user?.roles;
    console.log("User roles", userRoles);

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

      console.log("Constructed where clause", whereClause);

      const totalUsers = await prisma.user.count({
        where: whereClause,
      });
      console.log("Total users count", totalUsers);

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
      console.log("Fetched users", users);

      return NextResponse.json({
        users,
        totalPages: Math.ceil(totalUsers / pageSize),
        currentPage: page,
      });
    }
    console.log("Unauthorized access attempt");
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  } catch (error: any) {
    console.error("Error occurred", error);
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
