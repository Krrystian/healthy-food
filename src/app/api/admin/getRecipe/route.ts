import { auth } from "@/app/auth";
import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const pageSize = 7;
    const searchByName = searchParams.get("name");
    const searchByTag = searchParams.get("tag");
    const whereClause: any = {};
    console.log(searchByName, searchByTag);
    if (searchByName) {
        whereClause.name = {
          contains: searchByName,
          mode: "insensitive",
        };  
    }
    if (searchByTag) {
        whereClause.tags = {
          hasSome: searchByTag.split(",").map(tag => tag.trim().toLowerCase()),
        };
    }

      const totalRecipes = await prisma.recipe.count({
        where: whereClause,
      });

      const recipes = await prisma.recipe.findMany({
        where: whereClause,
        skip: (page - 1) * pageSize,
        take: pageSize,
        include: {
          ingredients: true,
        },
      });

    return NextResponse.json({
        recipes,
        totalPages: Math.ceil(totalRecipes / pageSize),
        currentPage: page,
    });
} catch (error: any) {
    console.error("Error occurred", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
