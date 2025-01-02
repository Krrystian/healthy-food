import { auth } from "@/app/auth";
import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const session = await auth();
    const userRoles = session?.roles;

    if (userRoles && userRoles.includes("admin")) {  
      const startOfToday = new Date();
      startOfToday.setUTCHours(0, 0, 0, 0);
      
      const endOfToday = new Date();
      endOfToday.setUTCHours(23, 59, 59, 999);

      const lastReport = await prisma.dailyStatistics.findFirst({
        where: {
          date: {
            gte: startOfToday,
            lte: endOfToday,
          },
        },
        orderBy: {
          date: 'desc',
        },
      });
      const newUsers = await prisma.user.count({
        where: {
          createdAt: {
            gte: startOfToday,
            lt: endOfToday,
          },
        },
      });

      const newCalculators = await prisma.calculator.count({
        where: {
          createdAt: {
            gte: startOfToday,
            lt: endOfToday,
          },
        },
      });

      await prisma.dailyStatistics.upsert({
        where: {
          date: startOfToday,
        },
        update: {
          newUsers,
          newCalculators,
        },
        create: {
          date: startOfToday,
          newUsers,
          newCalculators,
        },
      });

      const last7DaysStats = await prisma.dailyStatistics.findMany({
        where: {
          date: {
            gte: new Date(new Date().setDate(new Date().getDate() - 7)),
          },
        },
        orderBy: {
          date: 'asc',
        },
      });
      const formattedStats = last7DaysStats.map((stat) => ({
        ...stat,
        date: new Date(stat.date).toLocaleDateString("pl-PL", {
          day: "2-digit",
          month: "2-digit",
        }),
      }));
      return NextResponse.json(formattedStats, { status: 200 });
    }

    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  } catch (error: any) {
    console.error("Error occurred", error);
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
