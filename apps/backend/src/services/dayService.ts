import { prisma } from "../db/prisma"

export async function createDay(tripId: string, title?: string) {
  const lastDay = await prisma.day.findFirst({
    where: { tripId },
    orderBy: { index: "desc" },
  })

  const nextIndex = lastDay ? lastDay.index + 1 : 1

  return prisma.day.create({
    data: {
      tripId,
      index: nextIndex,
      title,
    },
  })
}