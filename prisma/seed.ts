import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      password: 'secret',
      isAdmin: true,
      isVerified: true,
    },
  });
  await prisma.user.upsert({
    where: { username: 'johndoe' },
    update: {},
    create: {
      username: 'johndoe',
      password: 'changeme',
    },
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
