import express from "express"
import * as tripService from "../services/tripService"
import { AppError } from "../errors/AppError"
import { asyncHandler } from "../middleware/asyncHandler";

const router = express.Router()

router.get("/", asyncHandler(async (req, res) => {
  const trips = await tripService.getTrips()
  
  res.json(trips)
}))

router.post("/", asyncHandler(async (req, res) => {

    const { name, startDate, endDate, userId } = req.body

    if (!userId || typeof userId !== "string") {
      throw new AppError("User ID required", 400);
    }
    if (!name || typeof name !== "string") {
      throw new AppError("Trip title is required", 400);
    }

    const trip = await tripService.createTrip({
      name,
      startDate,
      endDate,
      userId
    })

    res.status(201).json(trip)
}))



export default router