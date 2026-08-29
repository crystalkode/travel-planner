import * as z from "zod";
import { TripStatus } from "@prisma/client";

export const updateTripSchema = z
  .object({
    name: z.string().min(1).optional(),
    startDate: z.coerce.date().nullable().optional(),
    endDate: z.coerce.date().nullable().optional(),
    status: z.enum(TripStatus).optional(),
  })
  .refine(
    (data) => Object.keys(data).length > 0,
    {
      error: "Provide at least one field to update",
    },
  );

  export const tripIdParamSchema = z.object({
    tripId: z.uuid(),
  });
