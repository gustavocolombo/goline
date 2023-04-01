-- AlterTable
ALTER TABLE "dressmaker" ADD COLUMN     "followers" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "posts" (
    "id" TEXT NOT NULL,
    "dressmaking_id" TEXT NOT NULL,
    "dressmaker_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "image" TEXT,
    "stars" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "posts_dressmaking_id_key" ON "posts"("dressmaking_id");

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_dressmaking_id_fkey" FOREIGN KEY ("dressmaking_id") REFERENCES "dressmaking"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_dressmaker_id_fkey" FOREIGN KEY ("dressmaker_id") REFERENCES "dressmaker"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
