import { PrismaClient } from '@prisma/client'

import * as bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  // --- Roles ---
  const adminRole = await prisma.role.upsert({
    where: { name: 'ADMIN' },
    update: {},
    create: {
      name: 'ADMIN',
      description: 'Administrator role with full access',
    },
  })

  const userRole = await prisma.role.upsert({
    where: { name: 'USER' },
    update: {},
    create: {
      name: 'USER',
      description: 'Regular user role',
    },
  })

  // --- Users + Auth ---
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      name: 'Super Admin',
      roleId: adminRole.id,
      auth: {
        create: {
          username: 'admin',
          password: await bcrypt.hash('admin123', 10),
        },
      },
    },
  })

  const normalUser = await prisma.user.upsert({
    where: { email: 'user@example.com' },
    update: {},
    create: {
      email: 'user@example.com',
      name: 'John Doe',
      roleId: userRole.id,
      auth: {
        create: {
          username: 'johndoe',
          password: await bcrypt.hash('user123', 10),
        },
      },
      posts: {
        create: [
          {
            title: 'My first post',
            content: 'Hello, this is my first post!',
            published: true,
          },
          {
            title: 'Draft post',
            content: 'This is still a draft...',
            published: false,
          },
        ],
      },
    },
  })

  console.log({ adminUser, normalUser })
}


main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })