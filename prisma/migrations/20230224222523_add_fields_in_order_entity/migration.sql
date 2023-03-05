-- CreateEnum
CREATE TYPE "StatusOder" AS ENUM ('CANCELED', 'DELIVERED', 'IN_COURSE', 'PAYED', 'AWAITING_PAYMENT');

-- AlterTable
ALTER TABLE "order" ADD COLUMN     "delivery_date" TIMESTAMP(3),
ADD COLUMN     "status" "StatusOder" DEFAULT 'AWAITING_PAYMENT';
