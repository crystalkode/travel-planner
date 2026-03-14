import { prisma } from "../db/prisma"

type CreateTripInput = {
  name: string
  startDate?: Date
  endDate?: Date
  userId: string
}

export async function createTrip(data: CreateTripInput) {
  return prisma.trip.create({
    data
  })
}

export async function getTrips() {
  return prisma.trip.findMany()
}
