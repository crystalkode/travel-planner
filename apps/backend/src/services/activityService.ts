import { prisma } from "../db/prisma";

type CreateActivityInput = {
  title: string;
  description?: string;
};

export async function createActivity(dayId: string, data: CreateActivityInput) {
  //Verify that the day exists
  const day = await prisma.day.findUnique({ where: { id: dayId } });
  if (!day) {
    throw new Error("Day not found");
  }

  //Find the last activity added to the day
  const lastActivity = await prisma.activity.findFirst({
    where: { dayId },
    orderBy: { position: "desc" },
    select: { position: true },
  });

  const nextPosition = lastActivity ? lastActivity.position + 1 : 0;

  return prisma.activity.create({
    data: {
      dayId,
      position: nextPosition,
      ...data
    },
  });
}
