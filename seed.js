import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash("password123", 10);
  const adminPassword = await bcrypt.hash("admin123", 10);

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

  for (let i = 1; i <= 35; i++) {
    await prisma.user.upsert({
      where: { email: `user${i}@example.com` },
      update: {},
      create: {
        name: `User ${i}`,
        email: `user${i}@example.com`,
        password,
        image: null,
        active: true,
        description: `This is user number ${i}.`,
        notifications: true,
        ads: i % 2 === 0, // Every second user has ads enabled
        roles: ["user"],
      },
    });
  }

  console.log("Admin and 35 users seeded.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
