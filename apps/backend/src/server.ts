import express from "express";
import tripRoutes from "./routes/tripRoutes"
import userRoutes from "./routes/usersRoutes"
import dayRoutes from "./routes/dayRoutes"
import activityRoutes from "./routes/activityRoutes"

const app = express();
const PORT = 3000;

app.use(express.json())
app.use("/trips", tripRoutes)
app.use("/users", userRoutes)
app.use(dayRoutes)
app.use(activityRoutes)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
