-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "users_id" TEXT;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_users_id_fkey" FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
