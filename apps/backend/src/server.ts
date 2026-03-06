import dotenv from "dotenv"
import express from "express";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client"

dotenv.config()
const app = express();
const PORT = 3000;

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

console.log("DATABASE_URL:", process.env.DATABASE_URL)

export const prisma = new PrismaClient({ adapter });

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/trips", async (req, res) => {
  try {
    const trips = await prisma.trip.findMany()
    res.json(trips)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Something went wrong" })
  }
})


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
