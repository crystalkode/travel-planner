import express from "express"
import * as dayService from "../services/dayService"

const router = express.Router()

router.post("/trips/:tripId/days", async (req, res) => {
  try {
    const tripId = req.params.tripId
    const { title } = req.body

    const day = await dayService.createDay(tripId, title)

    res.json(day)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Failed to create day" })
  }
})

export default router