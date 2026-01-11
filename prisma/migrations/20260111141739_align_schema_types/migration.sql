/*
  Warnings:

  - The `logoAlignment` column on the `form` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "LogoAlignment" AS ENUM ('left', 'center', 'right');

-- AlterTable
ALTER TABLE "form" ALTER COLUMN "fieldSchema" SET DEFAULT '{"version": 1, "fields": []}',
DROP COLUMN "logoAlignment",
ADD COLUMN     "logoAlignment" "LogoAlignment" NOT NULL DEFAULT 'left';
