import { prisma } from "../src/db/prisma";

if (!process.env.DEV_USER_ID) {
  throw new Error("DEV_USER_ID is not configured");
}

async function main() {
  await prisma.user.upsert({
    where: {
      id: process.env.DEV_USER_ID,
    },
    update: {},
    create: {
      id: process.env.DEV_USER_ID,
      email: "dev@example.com",
    },
  });
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });