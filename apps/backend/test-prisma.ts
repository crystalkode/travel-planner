import { prisma } from "./src/db/prisma"

async function main() {
  const user = await prisma.user.create({
    data: { email: "test@example.com" },
  })

  console.log(user)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())