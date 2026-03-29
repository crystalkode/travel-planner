import { Router, Request, Response } from "express";
import { prisma } from "../db/prisma";
import { AppError } from "../errors/AppError";
import { asyncHandler } from "../middleware/asyncHandler";

const router = Router();

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const { email } = req.body;
    if (!email) {
      throw new AppError("Email is required", 400);
    }

    if (!email || typeof email !== "string") {
      throw new AppError("Valid email is required", 400);
    }

    const user = await prisma.user.create({
      data: { email: req.body.email },
    });

    res.json(user);
  })
);

router.get(
  "/:userId",
  asyncHandler(async (req, res) => {
    const userId = req.params.userId as string;

    if (!userId) {
      throw new AppError("User ID required", 400);
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new AppError("User not found", 404);
    }

    res.json(user);
  })
);

export default router;
