import { auth } from "@/app/auth";
import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const session = await auth();
    const userRoles = session?.roles;

    if (userRoles && userRoles.includes("admin")) {
      // Znajdź datę ostatniego raportu
      const lastReport = await prisma.dailyStatistics.findFirst({
        orderBy: {
          date: 'desc',
        },
      });

      const startDate = lastReport ? lastReport.date : new Date();
      const endDate = new Date();
      endDate.setUTCHours(23, 59, 59, 999);

      // Oblicz statystyki od ostatniego raportu
      const newUsers = await prisma.user.count({
        where: {
          createdAt: {
            gte: startDate,
            lt: endDate,
          },
        },
      });

      const newCalculators = await prisma.calculator.count({
        where: {
          createdAt: {
            gte: startDate,
            lt: endDate,
          },
        },
      });

      const dailyStats = await prisma.dailyStatistics.upsert({
        where: {
          date: startDate,
        },
        update: {
          newUsers,
          newCalculators,
        },
        create: {
          date: startDate,
          newUsers,
          newCalculators,
        },
      });

      // Pobierz statystyki z ostatnich 7 dni
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
