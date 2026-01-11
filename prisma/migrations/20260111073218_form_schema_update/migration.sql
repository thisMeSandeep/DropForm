/*
  Warnings:

  - The `status` column on the `form` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "FormStatus" AS ENUM ('draft', 'published');

-- AlterTable
ALTER TABLE "form" ADD COLUMN     "logoAlignment" TEXT NOT NULL DEFAULT 'left',
ADD COLUMN     "version" INTEGER NOT NULL DEFAULT 1,
DROP COLUMN "status",
ADD COLUMN     "status" "FormStatus" NOT NULL DEFAULT 'draft';
