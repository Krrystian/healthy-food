import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash("Password123!", 10);
  const adminPassword = await bcrypt.hash("Administrator123!", 10);

  // Tworzenie administratora
  const admin = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      name: "Admin User",
      email: "admin@example.com",
      password: adminPassword,
      image: null,
      active: true,
      description: "This is an admin user.",
      notifications: true,
      ads: true,
      roles: ["admin", "user"],
    },
  });

  console.log("Admin user seeded.");

  // Tworzenie użytkowników
  for (let i = 1; i <= 100; i++) {
    const user = await prisma.user.upsert({
      where: { email: `user${i}@example.com` },
      update: {},
      create: {
        name: `User ${i}`,
        email: `user${i}@example.com`,
        password,
        image: null,
        active: true,
        description: `This is user number ${i}.`,
        notifications: i % 2 === 0,
        ads: i % 3 === 0,
        roles: ["user"],
      },
    });

    // Dodawanie kalkulatorów dla użytkownika
    for (let j = 1; j <= 5; j++) {
      await prisma.calculator.create({
        data: {
          type: `Calculator Type ${j}`,
          result: Math.random() * 100,
          weight: Math.random() * 100,
          height: Math.random() * 200,
          gender: j % 2 === 0 ? "Male" : "Female",
          age: Math.floor(Math.random() * 60) + 18,
          activityLevel: Math.random(),
          userId: user.id,
        },
      });
    }

  }

  console.log("100 users, their calculators");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
