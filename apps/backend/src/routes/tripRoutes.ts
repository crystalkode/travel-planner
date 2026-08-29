import express from "express";
import * as tripService from "../services/tripService";
import { AppError } from "../errors/AppError";
import { asyncHandler } from "../middleware/asyncHandler";
import { updateTripSchema } from "../schemas/tripSchema";

const router = express.Router();

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const trips = await tripService.getTrips();

    res.json(trips);
  }),
);

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const { name, startDate, endDate, userId } = req.body;

    //TEMP: hack in the backend to keep the flow close to the authenticated version
    // if (!userId || typeof userId !== "string") {
    //   throw new AppError("User ID required", 400);
    // }
    if (!name || typeof name !== "string") {
      throw new AppError("Trip title is required", 400);
    }

    const trip = await tripService.createTrip({
      name,
      startDate,
      endDate,
      // userId
      userId: process.env.DEV_USER_ID!,
    });

    res.status(201).json(trip);
  }),
);

router.patch(
  "/:tripId",
  asyncHandler(async (req, res) => {
    const result = updateTripSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        error: result.error,
      });
    }
    const trip = await tripService.updateTrip(
      req.params.tripId as string,
      result.data,
    );
    res.status(200).json(trip);
  }),
);

export default router;
