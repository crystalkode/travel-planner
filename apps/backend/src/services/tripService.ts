import { prisma } from "../db/prisma";
import { handlePrismaError } from "../utils/prismaErrorHandler";
import { AppError } from "../errors/AppError";
import * as z from "zod";
import {updateTripSchema} from "../schemas/tripSchema"

type CreateTripInput = {
  name: string;
  startDate?: Date;
  endDate?: Date;
  userId: string;
};

export async function createTrip(data: CreateTripInput) {
  if (!data.name) throw new AppError("Trip name is required", 400);

  return prisma.trip.create({
    data,
  });
}

type UpdateTripInput = z.infer<typeof updateTripSchema>;

export async function updateTrip(tripId: string, input: UpdateTripInput) {
  if (!tripId) throw new AppError("Trip Id is required", 400);

  try {
    return prisma.trip.update({
      where: { id: tripId },
      data: input,
    });
  } catch (error) {
    throw handlePrismaError(error, `Trip ${tripId}`);
  }
}

export async function getTrips() {
  return prisma.trip.findMany();
}
