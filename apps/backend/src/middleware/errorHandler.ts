import { Request, Response, NextFunction } from "express";
import { Prisma } from "@prisma/client";
import { AppError } from "../errors/AppError";

export function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(err);

  if (err instanceof AppError) {
    return res.status(err.status).json({ error: err.message });
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    switch (err.code) {
      case "P2002":
        return res.status(400).json({ error: "Unique constraint failed" });
      case "P2003":
        return res.status(400).json({ error: "Foreign key constraint failed" });
      case "P2007":
        return res
          .status(400)
          .json({ error: "invalid input syntax for type uuid" });
      default:
        break;
    }
  }

  return res.status(500).json({ error: "Internal server error" });
}
