import { prisma } from "../db/prisma"
import { handlePrismaError } from "../utils/prismaErrorHandler";
import { AppError } from "../errors/AppError";

type CreateTripInput = {
  name: string
  startDate?: Date
  endDate?: Date
  userId: string
}

export async function createTrip(data: CreateTripInput) {
  if (!data.name) throw new AppError("Trip name is required", 400);
  
  return prisma.trip.create({
    data
  })
}

export async function getTrips() {
  return prisma.trip.findMany()
}
