import { PrismaClient } from "@prisma/client";

import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  // --- Roles ---
  const adminRole = await prisma.role.upsert({
    where: { name: "ADMIN" },
    update: {},
    create: {
      name: "ADMIN",
      description: "Administrator role with full access",
    },
  });

  const hrRole = await prisma.role.upsert({
    where: { name: "HUMAN_RESOURCE" },
    update: {},
    create: {
      name: "HUMAN_RESOURCE",
      description: "Human Resource role with access to employee and recruitment management",
    },
  });

  const psRole = await prisma.role.upsert({
    where: { name: "PRODUCT_SPECIALIST" },
    update: {},
    create: {
      name: "PRODUCT_SPECIALIST",
      description: "Product Specialist role with access to product and inventory management",
    },
  });

  // --- Users + Auth ---
  const adminUser = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      email: "admin@example.com",
      name: "Super Admin",
      roleId: adminRole.id,
      auth: {
        create: {
          username: "admin",
          password: await bcrypt.hash("admin123", 10),
        },
      },
    },
  });

  console.log({ adminUser, hrRole, psRole });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
