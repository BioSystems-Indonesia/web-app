import { PrismaClient } from "@prisma/client";

import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  function iconFor(name: string) {
    return (
      name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "") + ".svg"
    );
  }

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

  const dgRole = await prisma.role.upsert({
    where: { name: "DG" },
    update: {},
    create: {
      name: "DG",
      description: "Desain Grafis (Graphic Designer) role",
    },
  });

  // --- Users + Auth ---
  const adminUser = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      email: "admin@example.com",
      name: "Widad Al Fajri",
      roleId: adminRole.id,
      auth: {
        create: {
          username: "admin",
          password: await bcrypt.hash("plmokn123", 10),
        },
      },
    },
  });

  // Additional categories extracted from list
  const pancreatic = await prisma.productCategory.upsert({
    where: { category: "Pancreatic" },
    update: {},
    create: { category: "Pancreatic", categoryType: "CLINICAL", icon: iconFor("Pancreatic") },
  });

  const fertility = await prisma.productCategory.upsert({
    where: { category: "Fertility" },
    update: {},
    create: { category: "Fertility", categoryType: "CLINICAL", icon: iconFor("Fertility") },
  });

  const immune = await prisma.productCategory.upsert({
    where: { category: "Immune" },
    update: {},
    create: { category: "Immune", categoryType: "CLINICAL", icon: iconFor("Immune") },
  });

  const infectious = await prisma.productCategory.upsert({
    where: { category: "Infectious" },
    update: {},
    create: { category: "Infectious", categoryType: "CLINICAL", icon: iconFor("Infectious") },
  });

  const liver = await prisma.productCategory.upsert({
    where: { category: "Liver" },
    update: {},
    create: { category: "Liver", categoryType: "CLINICAL", icon: iconFor("Liver") },
  });

  const cardiac = await prisma.productCategory.upsert({
    where: { category: "Cardiac" },
    update: {},
    create: { category: "Cardiac", categoryType: "CLINICAL", icon: iconFor("Cardiac") },
  });

  const diabetes = await prisma.productCategory.upsert({
    where: { category: "Diabetes" },
    update: {},
    create: { category: "Diabetes", categoryType: "CLINICAL", icon: iconFor("Diabetes") },
  });

  const renal = await prisma.productCategory.upsert({
    where: { category: "Renal" },
    update: {},
    create: { category: "Renal", categoryType: "CLINICAL", icon: iconFor("Renal") },
  });

  const ions = await prisma.productCategory.upsert({
    where: { category: "Ions" },
    update: {},
    create: { category: "Ions", categoryType: "CLINICAL", icon: iconFor("Ions") },
  });

  const lipid = await prisma.productCategory.upsert({
    where: { category: "Lipid" },
    update: {},
    create: { category: "Lipid", categoryType: "CLINICAL", icon: iconFor("Lipid") },
  });

  const hemostasis = await prisma.productCategory.upsert({
    where: { category: "Hemostasis" },
    update: {},
    create: { category: "Hemostasis", categoryType: "CLINICAL", icon: iconFor("Hemostasis") },
  });

  const gastric = await prisma.productCategory.upsert({
    where: { category: "Gastric" },
    update: {},
    create: { category: "Gastric", categoryType: "CLINICAL", icon: iconFor("Gastric") },
  });

  const anemia = await prisma.productCategory.upsert({
    where: { category: "Anemia" },
    update: {},
    create: { category: "Anemia", categoryType: "CLINICAL", icon: iconFor("Anemia") },
  });

  console.log({
    adminUser,
    hrRole,
    psRole,
    dgRole,
    pancreatic,
    fertility,
    immune,
    infectious,
    liver,
    cardiac,
    diabetes,
    renal,
    ions,
    lipid,
    hemostasis,
    gastric,
    anemia,
  });
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
