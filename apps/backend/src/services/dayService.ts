import { AppError } from "../errors/AppError"
import { prisma } from "../db/prisma"
import { handlePrismaError } from "../utils/prismaErrorHandler"

export async function createDay(tripId: string, title?: string) {
  try {
    return await prisma.$transaction(async (tx) => {
      const trip = await tx.trip.findUnique({ where: { id: tripId } })

      if (!trip) {
        throw new AppError("Trip not found", 404)
      }

      const lastDay = await tx.day.findFirst({
        where: { tripId },
        orderBy: { index: "desc" },
      })

      const nextIndex = lastDay ? lastDay.index + 1 : 1

      return tx.day.create({ data: { tripId, index: nextIndex, title } })
    })
  } catch (error) {
    // This will convert known Prisma errors into AppError, otherwise re-throws
    throw handlePrismaError(error, `Trip ${tripId}`)
  }
}

export async function updateDay(dayId: string, title?: string) {
  try {
    return await prisma.day.update({
      where: { id: dayId },
      data: { title },
    })
  } catch (error) {
    throw handlePrismaError(error, `Day ${dayId}`)
  }
}

export async function deleteDay(dayId: string) {
  if (!dayId) throw new AppError("Day ID is required", 400);
  try {
    return await prisma.day.delete({ where: { id: dayId } });
  } catch (error) {
    throw handlePrismaError(error, `Day ${dayId}`);
  }
}
