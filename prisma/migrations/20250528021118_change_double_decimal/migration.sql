/*
  Warnings:

  - You are about to alter the column `age` on the `pet` table. The data in that column could be lost. The data in that column will be cast from `Decimal(3,1)` to `Decimal(3,2)`.

*/
-- AlterTable
ALTER TABLE "pet" ALTER COLUMN "age" SET DATA TYPE DECIMAL(3,2);
