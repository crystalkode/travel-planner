import express from "express"
import * as activityService from "../services/activityService"

const router = express.Router()

router.post("/days/:dayId/activities", async (req, res) => {
  try {
    const activity = await activityService.createActivity(req.params.dayId, req.body)
    
    res.status(201).json(activity)
    
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Failed to create activity" })
  }
})

export default router