import prisma from '@/app/lib/prisma';
import { auth } from '@/app/auth';
import { NextResponse } from 'next/server';
import { format } from "date-fns";

export async function GET(req: Request) {
    let userId;
    try {
        const session = await auth();
        userId = session?.user.id;
    } catch (error) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }

    try {
        const types = ["BMI", "BMR", "TDEE"];
        const promises = types.map((type) =>
            prisma.calculator.findMany({
                where: {
                    userId: userId,
                    type: type,
                },
                orderBy: {
                    createdAt: 'desc',
                },
                take: 5,
                select: {
                    type: true,
                    result: true,
                    weight: true,
                    createdAt: true,
                },
            })
        );

        const results = await Promise.all(promises);

        const formattedStats = results.flat().map((stat) => ({
            ...stat,
            createdAt: format(stat.createdAt, "dd.MM.yyyy HH:mm"),
        }));

        return NextResponse.json(formattedStats, { status: 200 });
    } catch (error) {
        console.error("Error fetching calculator stats:", error);
        return NextResponse.json({ message: "Error" }, { status: 500 });
    }
}
