import express from "express";
import * as activityService from "../services/activityService";
import { asyncHandler } from "../middleware/asyncHandler";

const router = express.Router();

router.get(
  "/days/:dayId/activities",
  asyncHandler(async (req, res) => {
    const activities = await activityService.getActivities(req.params.dayId as string);
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

router.patch(
  "/activities/:activityId",
  asyncHandler(async (req, res) => {
    const activity = await activityService.updateActivity(req.params.activityId as string, req.body);
    res.json(activity);
  })
);

export default router;
