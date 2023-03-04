-- CreateTable
CREATE TABLE "userstoken" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "used" BOOLEAN NOT NULL DEFAULT false,
    "used_in" TIMESTAMP(3) NOT NULL,
    "expires_in" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "users_id" TEXT NOT NULL,

    CONSTRAINT "userstoken_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "userstoken" ADD CONSTRAINT "userstoken_users_id_fkey" FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
