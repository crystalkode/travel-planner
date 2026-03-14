import { Router } from "express"
import { prisma } from "../db/prisma"
import { Prisma } from "@prisma/client"

const router = Router()

router.post("/", async (req, res) => {
  try {
    const user = await prisma.user.create({
      data: {
        email: req.body.email,
      },
    })

    res.json(user)
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return res.status(400).json({ error: "Email already exists" })
    }
    res.status(500).json({ error: "Failed to create user" })
  }
})

export default router

