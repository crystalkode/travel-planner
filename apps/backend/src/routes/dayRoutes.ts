import express from "express";
import * as dayService from "../services/dayService";
import { AppError } from "../errors/AppError";
import { asyncHandler } from "../middleware/asyncHandler";

const router = express.Router();

router.post(
  "/trips/:tripId/days",
  asyncHandler(async (req, res) => {
    const tripId = req.params.tripId as string;

    if (!tripId || typeof tripId !== "string") {
      throw new AppError("Trip ID required", 400);
    }

    const { title } = req.body;

    const day = await dayService.createDay(tripId, title);

    res.json(day);
  })
);

export default router;
