import { prisma } from "../db/prisma";
import { handlePrismaError } from "../utils/prismaErrorHandler";
import { AppError } from "../errors/AppError";

type CreateActivityInput = {
  title: string;
  description?: string;
};

export async function createActivity(dayId: string, data: CreateActivityInput) {
  if (!dayId) throw new AppError("Day ID is required", 400);
  if (!data.title) throw new AppError("Activity title is required", 400);

  try {
    return await prisma.$transaction(async (tx) => {
      // Verify day exists
      const day = await tx.day.findUnique({ where: { id: dayId } });
      if (!day) throw new AppError("Day not found", 404);

      // Find last activity
      const lastActivity = await tx.activity.findFirst({
        where: { dayId },
        orderBy: { position: "desc" },
        select: { position: true },
      });

      const nextPosition = lastActivity ? lastActivity.position + 1 : 0;

      return tx.activity.create({
        data: {
          dayId,
          position: nextPosition,
          ...data,
        },
      });
    });
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw handlePrismaError(error, `Activity for Day ${dayId}`);
  }
}

export async function getActivities(dayId: string) {
  // return prisma.activity.findMany(); //returns all activities
  if (!dayId) throw new AppError("Day ID is required", 400);

  try {
    return await prisma.activity.findMany({
      where: { dayId },
    });
  } catch (error) {
    throw handlePrismaError(error, `Activities for Day ${dayId}`);
  }
}