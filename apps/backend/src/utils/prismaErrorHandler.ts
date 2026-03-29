import { Prisma } from "@prisma/client";
import { AppError } from "../errors/AppError";

export function handlePrismaError(error: unknown, contextMessage?: string) {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P2002": // Unique constraint failed
        const target = (error.meta as any)?.target;
        return new AppError(
          `${contextMessage || "Resource"} already exists${
            target ? `: ${target}` : ""
          }`,
          409
        );

      case "P2003": // Foreign key constraint failed
        const fieldName = (error.meta as any)?.field_name;
        return new AppError(
          `${contextMessage || "Related resource"} not found${
            fieldName ? `: ${fieldName}` : ""
          }`,
          404
        );

      case "P2007": //invalid input syntax for type uuid
        const uuid = (error.meta as any)?.field_name;

                return new AppError(
          `${contextMessage || "Related resource"} not found${
            uuid ? `: ${uuid}` : ""
          }`,
          400
        );

      // add more Prisma codes here if needed
    }

    if (error instanceof Prisma.PrismaClientValidationError) {
      return new AppError(`${contextMessage || "Invalid input"}`, 400);
    }
  }

  // If it’s not a known Prisma error, just rethrow
  return error;
}
