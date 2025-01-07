import { auth } from "@/app/auth";
import prisma from "@/app/lib/prisma";
import { createRecipeSchema } from "@/app/lib/zod";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
    try {
        const body = await req.json();
        const parsedData = createRecipeSchema.parse(body);
        const user = await auth();
        if (!user || !user.roles.includes("admin")) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        console.log('Form Data:', body);

        const recipe = await prisma.recipe.create({
            data: {
              name: parsedData.title,
              description: parsedData.description,
              tags: parsedData.tags.map(tag => tag.toLowerCase()),
              image: parsedData.image,
              instructions: parsedData.preparation.split("\n"),
              userId: body.userId,
              ingredients: {
                create: parsedData.products.map((product) => ({
                  name: product.name,
                  quantity: product.quantity,
                  metric: product.metric,
                })),
              },
            },
          });

        return NextResponse.json({ message: "Notifications sent" }, { status: 200 });
    } catch (error: any) {
        console.error("Error creating recipe:", error); 
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}


export async function PUT(req: Request) {
    try {
      const body = await req.json();
      const parsedData = createRecipeSchema.parse(body);
  
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
  
