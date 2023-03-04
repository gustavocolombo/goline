-- CreateTable
CREATE TABLE "order" (
    "id" TEXT NOT NULL,
    "final_price" DOUBLE PRECISION NOT NULL,
    "final_date_delivery" TIMESTAMP(3),
    "address_id" TEXT NOT NULL,
    "users_id" TEXT NOT NULL,
    "dressmaking_id" TEXT NOT NULL,

    CONSTRAINT "order_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_users_id_fkey" FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_dressmaking_id_fkey" FOREIGN KEY ("dressmaking_id") REFERENCES "dressmaking"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
