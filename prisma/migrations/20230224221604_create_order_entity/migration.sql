-- CreateTable
CREATE TABLE "order" (
    "id" TEXT NOT NULL,
    "final_price" DOUBLE PRECISION NOT NULL,
    "tag" "TagsDressmaking" DEFAULT 'DRESSMAKING',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,
    "dressmaking_id" TEXT NOT NULL,

    CONSTRAINT "order_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_dressmaking_id_fkey" FOREIGN KEY ("dressmaking_id") REFERENCES "dressmaking"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
