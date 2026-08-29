import * as z from "zod";

export const updateDaySchema = z
  .object({
    title: z.string().min(1).nullable().optional(),
  })
  .refine(
    (data) => Object.keys(data).length > 0,
    {
      error: "Provide at least one field to update",
    },
  );

  export const dayIdParamSchema = z.object({
    dayId: z.uuid(),
  });
