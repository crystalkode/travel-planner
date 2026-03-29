import express from "express";
import tripRoutes from "./routes/tripRoutes"
import userRoutes from "./routes/usersRoutes"
import dayRoutes from "./routes/dayRoutes"
import activityRoutes from "./routes/activityRoutes"
import { errorHandler } from "./middleware/errorHandler"

const app = express();
const PORT = 3000;

app.use(express.json())

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
