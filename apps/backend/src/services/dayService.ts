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
