import express from "express";
import tripRoutes from "./routes/tripRoutes"
import userRoutes from "./routes/usersRoutes"
import dayRoutes from "./routes/dayRoutes"
import activityRoutes from "./routes/activityRoutes"
import { errorHandler } from "./middleware/errorHandler"
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json())

app.get("/health", (_req, res) => {
  res.status(200).json({
    status: "ok",
  });
});

// Routes
app.use("/trips", tripRoutes)
app.use("/users", userRoutes)
app.use(dayRoutes)
app.use(activityRoutes)

// Middleware
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
