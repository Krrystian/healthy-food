import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Seed roles
  const userRole = await prisma.role.upsert({
    where: { name: "user" },
    update: {},
    create: {
      name: "user",
      description: "Default role for regular users",
    },
  });

  const adminRole = await prisma.role.upsert({
    where: { name: "admin" },
    update: {},
    create: {
      name: "admin",
      description: "Admin role with all permissions",
    },
  });

  console.log("Roles seeded:", { userRole, adminRole });

  // Seed users
  const user1 = await prisma.user.upsert({
    where: { email: "user@example.com" },
    update: {},
    create: {
      name: "User One",
      email: "user@example.com",
      password: "$2a$10$VqOjQUl5jHzPKp7G8D9Z3.1Nfb4Uby8qJyzXLo3BQdy1O2fCtvkaG", // 'password123'
      roleId: userRole.id,
    },
  });

  const admin = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      name: "Admin User",
      email: "admin@example.com",
      password: "$2a$10$4ZCnSg/RtIyaN5G4K5y8/.1lk6rH9Kf6VRy37rAcHfAGloK.N7E6i", // 'admin123'
      roleId: adminRole.id,
    },
  });

  console.log("Users seeded:", { user1, admin });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
