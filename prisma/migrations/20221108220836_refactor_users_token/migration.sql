-- AlterTable
ALTER TABLE "userstoken" ALTER COLUMN "used_in" DROP NOT NULL,
ALTER COLUMN "expires_in" DROP NOT NULL;
