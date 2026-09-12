import express from "express";
import * as dayService from "../services/dayService";
import { AppError } from "../errors/AppError";
import { asyncHandler } from "../middleware/asyncHandler";
import { dayIdParamSchema } from "../schemas/daySchema";

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

router.patch(
  "/days/:dayId",
  asyncHandler(async (req, res) => {
    const params = dayIdParamSchema.safeParse(req.params);
    if (!params.success) {
      return res.status(400).json({ error: params.error });
    }
    const { dayId } = params.data;

    const { title } = req.body;

    const day = await dayService.updateDay(dayId, title);

    res.json(day);
  })
);

router.delete(
  "/days/:dayId",
  asyncHandler(async (req, res) => {
    const params = dayIdParamSchema.safeParse(req.params);
    if (!params.success) {
      return res.status(400).json({ error: params.error });
    }
    const { dayId } = params.data;

    await dayService.deleteDay(dayId);
    res.status(204).send();
  })
);

export default router;
