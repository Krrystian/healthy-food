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
              tags: parsedData.tags,
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


export async function GET(req: Request) {
    try {
      const recipes = await prisma.recipe.findMany({
        include: { ingredients: true },
      });
      return NextResponse.json(recipes);
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
}


export async function PUT(req: Request) {
    try {
      const body = await req.json();
      const parsedData = createRecipeSchema.parse(body);
  
      const updatedRecipe = await prisma.recipe.update({
        where: { id: body.id }, /** o to może być jakieś złe */
        data: {
          name: parsedData.title,
          description: parsedData.description,
          tags: parsedData.tags,
          instructions: parsedData.preparation.split("\n"),
          ingredients: {
            deleteMany: {}, 
            create: parsedData.products.map((product) => ({
              name: product.name,
              quantity: product.quantity,
            })),
          },
        },
      });
  
      return NextResponse.json(updatedRecipe);
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
  

export async function DELETE(req: Request) {
    try {
      const { id } = await req.json();
  
      await prisma.recipe.delete({ where: { id } });
  
      return NextResponse.json({ message: "Recipe deleted" });
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
  
