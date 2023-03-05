-- CreateEnum
CREATE TYPE "StatusUser" AS ENUM ('ACTIVE', 'INACTIVE', 'DELETED');

-- CreateEnum
CREATE TYPE "RolesUser" AS ENUM ('USER', 'DRESSMAKER');

-- CreateEnum
CREATE TYPE "TagsDressmaking" AS ENUM ('DRESSMAKING', 'NEEDLEWORK', 'ADJUSTMENT', 'REPAIR', 'OTHERS');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "height" DOUBLE PRECISION NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "cellphone" TEXT NOT NULL,
    "status" "StatusUser" NOT NULL DEFAULT 'ACTIVE',
    "roles" "RolesUser" NOT NULL DEFAULT 'USER',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "dressmaker" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "expertise" TEXT[],
    "cellphone" TEXT NOT NULL,
    "status" "StatusUser" NOT NULL DEFAULT 'ACTIVE',
    "roles" "RolesUser" NOT NULL DEFAULT 'DRESSMAKER',
    "image_profile" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "dressmaker_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dressmaking" (
    "id" TEXT NOT NULL,
    "name_service" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "grabbed" BOOLEAN NOT NULL DEFAULT false,
    "tag" "TagsDressmaking" DEFAULT 'DRESSMAKING',
    "description" TEXT NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "dressmaker_id" TEXT,
    "user_id" TEXT,

    CONSTRAINT "dressmaking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "address" (
    "id" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "neighborhoud" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "street" TEXT NOT NULL,
    "lat" DOUBLE PRECISION NOT NULL,
    "lng" DOUBLE PRECISION NOT NULL,
    "users_id" TEXT,
    "dressmaker_id" TEXT,

    CONSTRAINT "address_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_id_key" ON "users"("id");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "dressmaker_email_key" ON "dressmaker"("email");

-- AddForeignKey
ALTER TABLE "dressmaking" ADD CONSTRAINT "dressmaking_dressmaker_id_fkey" FOREIGN KEY ("dressmaker_id") REFERENCES "dressmaker"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dressmaking" ADD CONSTRAINT "dressmaking_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "address" ADD CONSTRAINT "address_users_id_fkey" FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "address" ADD CONSTRAINT "address_dressmaker_id_fkey" FOREIGN KEY ("dressmaker_id") REFERENCES "dressmaker"("id") ON DELETE SET NULL ON UPDATE CASCADE;
