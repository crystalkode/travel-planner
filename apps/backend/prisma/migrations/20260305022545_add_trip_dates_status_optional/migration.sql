-- CreateEnum
CREATE TYPE "TripStatus" AS ENUM ('DRAFT', 'IN_PROGRESS', 'COMPLETED');

-- AlterTable
ALTER TABLE "Trip" ADD COLUMN     "endDate" TIMESTAMP(3),
ADD COLUMN     "startDate" TIMESTAMP(3),
ADD COLUMN     "status" "TripStatus" NOT NULL DEFAULT 'DRAFT';
