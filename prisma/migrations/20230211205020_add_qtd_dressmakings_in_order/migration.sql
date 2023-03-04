/*
  Warnings:

  - Added the required column `qtd_dressmakings` to the `order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "order" ADD COLUMN     "qtd_dressmakings" INTEGER NOT NULL;
