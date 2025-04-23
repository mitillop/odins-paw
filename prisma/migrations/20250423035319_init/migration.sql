-- CreateEnum
CREATE TYPE "Sex" AS ENUM ('Male', 'Female');

-- CreateEnum
CREATE TYPE "ChatCategory" AS ENUM ('Alimentacion', 'Cuidados', 'Preguntas_Generales');

-- CreateEnum
CREATE TYPE "DietType" AS ENUM ('PRINCIPAL', 'ALTERNATIVA');

-- CreateTable
CREATE TABLE "user" (
    "id" BIGSERIAL NOT NULL,
    "clerk_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "image_url" TEXT,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pet" (
    "id" BIGSERIAL NOT NULL,
    "user_id" BIGINT NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "weight" DECIMAL(65,30) NOT NULL,
    "breed" TEXT NOT NULL,
    "sex" "Sex" NOT NULL,
    "activity_level" TEXT NOT NULL,
    "medical_conditions" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "image_url" TEXT,

    CONSTRAINT "pet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "medical_condition" (
    "id" BIGSERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "medical_condition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chat_history" (
    "id" BIGSERIAL NOT NULL,
    "user_id" BIGINT NOT NULL,
    "pet_id" BIGINT,
    "message" TEXT NOT NULL,
    "category" "ChatCategory" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "chat_history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "care_recommendation" (
    "id" BIGSERIAL NOT NULL,
    "breed" TEXT NOT NULL,
    "care_tips" TEXT NOT NULL,

    CONSTRAINT "care_recommendation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "food_portion" (
    "id" BIGSERIAL NOT NULL,
    "pet_id" BIGINT NOT NULL,
    "portion_size" DECIMAL(65,30) NOT NULL,
    "visual_representation" TEXT NOT NULL,
    "grams" INTEGER NOT NULL,

    CONSTRAINT "food_portion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "diet" (
    "id" BIGSERIAL NOT NULL,
    "pet_id" BIGINT NOT NULL,
    "calorie_intake" INTEGER NOT NULL,
    "recommended_foods" TEXT NOT NULL,
    "type" "DietType" NOT NULL,

    CONSTRAINT "diet_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_clerk_id_key" ON "user"("clerk_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- AddForeignKey
ALTER TABLE "pet" ADD CONSTRAINT "pet_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat_history" ADD CONSTRAINT "chat_history_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat_history" ADD CONSTRAINT "chat_history_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "pet"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "food_portion" ADD CONSTRAINT "food_portion_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "pet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "diet" ADD CONSTRAINT "diet_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "pet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
