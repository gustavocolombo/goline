/*
  Warnings:

  - You are about to drop the column `selected` on the `address` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "address" DROP COLUMN "selected",
ADD COLUMN     "current_address" BOOLEAN NOT NULL DEFAULT true;
