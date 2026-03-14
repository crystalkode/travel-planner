import express from "express"
import * as tripService from "../services/tripService"

const router = express.Router()

router.get("/", async (req, res) => {
  try {
    const trips = await tripService.getTrips()
    res.json(trips)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Failed to fetch trips" })
  }
})

router.post("/", async (req, res) => {
  try {
    const { name, startDate, endDate, userId } = req.body

    const trip = await tripService.createTrip({
      name,
      startDate,
      endDate,
      userId
    })

    res.status(201).json(trip)

  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Failed to create trip" })
  }
})

export default router