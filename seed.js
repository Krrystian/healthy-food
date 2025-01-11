import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash("Password123!", 10);
  const adminPassword = await bcrypt.hash("Administrator123!", 10);

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
  }
  console.log("100 users -- done");
  const calculators = ["bmi", "bmr", "tdee"];
  const activityLevels = [1.2, 1.375, 1.55, 1.725, 1.9];

  for (let i = 0; i < 5; i++) {
    for (const calculator of calculators) {
      const weight = Math.floor(Math.random() * 50) + 50; 
      const height = Math.floor(Math.random() * 50) + 150; 
      const age = Math.floor(Math.random() * 50) + 20; 
      const activityLevel = activityLevels[Math.floor(Math.random() * activityLevels.length)];
      const result = Math.floor(Math.random() * 1000) + 1500; 

      await prisma.calculator.create({
        data: {
          userId: admin.id,
          type: calculator,
          weight,
          height,
          age,
          gender: "male",
          activityLevel,
          result,
        },      
      });
    }
  }
  console.log("calculators for admin -- done");
  for (let i = 1; i <= 100; i++) {
    const user = await prisma.user.findUnique({
      where: { email: `user${i}@example.com` },
    });

    for (let j = 0; j < 5; j++) {
      for (const calculator of calculators) {
        const weight = Math.floor(Math.random() * 50) + 50; 
        const height = Math.floor(Math.random() * 50) + 150; 
        const age = Math.floor(Math.random() * 50) + 20; 
        const activityLevel = activityLevels[Math.floor(Math.random() * activityLevels.length)];
        const result = Math.floor(Math.random() * 1000) + 1500; 

        await prisma.calculator.create({
          data: {
            userId: user.id,
            type: calculator,
            weight,
            height,
            age,
            gender: "male",
            activityLevel,
            result,
          },      
        });
      }
    }
  }
  console.log("calculators for user -- done");

  const notifications = [
    {
      title: "Welcome to Healthy Food!",
      message: "Thank you for joining Healthy Food. We hope you enjoy our services.",
      sendTo: ["admin@example.com", ...Array.from({ length: 100 }, (_, i) => `user${i + 1}@example.com`)],
    },
    {
      title: "New Features Released",
      message: "Check out the new features we have added to Healthy Food.",
      sendTo: ["admin@example.com", ...Array.from({ length: 100 }, (_, i) => `user${i + 1}@example.com`)],
    },
  ];

  for (const notification of notifications) {
    await prisma.broadcastNotification.create({
      data: {
        title: notification.title,
        message: notification.message,
        sendTo: notification.sendTo,
        userId: admin.id,
      },
    });
  }
  console.log("notifications -- done");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
