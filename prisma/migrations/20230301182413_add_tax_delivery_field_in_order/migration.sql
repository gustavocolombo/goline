/*
  Warnings:

  - Added the required column `tax_delivery` to the `order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "order" ADD COLUMN     "tax_delivery" DOUBLE PRECISION NOT NULL;
