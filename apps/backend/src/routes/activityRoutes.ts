import express from "express";
import * as activityService from "../services/activityService";
import { asyncHandler } from "../middleware/asyncHandler";

const router = express.Router();

router.get(
  "/days/:dayId/activities",
  asyncHandler(async (req, res) => {
    const activities = await activityService.getActivities();
    res.json(activities);
  })
);

router.post(
  "/days/:dayId/activities",
  asyncHandler(async (req, res) => {
    const activity = await activityService.createActivity(
      req.params.dayId as string,
      req.body
    );

    res.status(201).json(activity);
  })
);

export default router;
