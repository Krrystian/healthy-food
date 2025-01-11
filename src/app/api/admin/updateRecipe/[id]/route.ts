
import { auth } from "@/app/auth";
import prisma from "@/app/lib/prisma";
import { createRecipeSchema } from "@/app/lib/zod";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
    try {
      const body = await req.json();
      console.log(body.id);
      const parsedData = createRecipeSchema.parse(body);

      const user = await auth();
      if (!user || !user.roles.includes("admin")) {
          return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
      }
      const updatedRecipe = await prisma.recipe.update({
        where: { id: body.id },
        data: {
          name: parsedData.title,
          description: parsedData.description,
          tags: parsedData.tags.map(tag => tag.toLowerCase()),
          instructions: parsedData.preparation.split("\n"),
          ingredients: {
        deleteMany: {}, 
        create: parsedData.products.map((product) => ({
          name: product.name,
          quantity: product.quantity,
          metric: product.metric,
        })),
          },
        },
      });
  
      return NextResponse.json(updatedRecipe);
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
}