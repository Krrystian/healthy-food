import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import { bmiSchema, bmrSchema, tdeeSchema } from "@/app/lib/zod";

export async function POST(request: Request) {
    try{
        const req =  await request.json();
        console.log(req)
        let calcData;

        switch( req.type){
            case "BMI":
                calcData = await bmiSchema.parseAsync(req);
                break;
            case "BMR":
                calcData = await bmrSchema.parseAsync(req);
                break;
            case "TDEE":
                calcData = await tdeeSchema.parseAsync(req);
                break;
            default:
                return NextResponse.json({ error: "Invalid calculator type" }, { status: 400 });
        }

        const age = 'age' in calcData ? calcData.age : null;
        const gender = 'gender' in calcData ? calcData.gender : null;
        const activityLevel = 'activityLevel' in calcData ? calcData.activityLevel : null;

        const calculator = await prisma.calculator.create({
            data: {
                userId: req.userId,
                type: req.type,
                weight: Number(calcData.weight),
                height: Number(calcData.height),
                age: Number(age),
                gender: String(gender),
                activityLevel: Number(activityLevel),
                result: req.result,
            },
        });
        return NextResponse.json({ message: "Calculator has been saved." }, { status: 201 });
    } catch(error){
        console.log(error)
        return NextResponse.json(error, { status: 500 });
    }

}