/*
  Warnings:

  - Added the required column `position` to the `Activity` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Activity" ADD COLUMN     "position" INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX "Activity_dayId_position_idx" ON "Activity"("dayId", "position");
