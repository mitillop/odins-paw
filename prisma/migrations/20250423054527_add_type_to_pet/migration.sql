/*
  Warnings:

  - The values [Male,Female] on the enum `Sex` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `type` to the `pet` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PetType" AS ENUM ('Gato', 'Perro');

-- AlterEnum
BEGIN;
CREATE TYPE "Sex_new" AS ENUM ('Macho', 'Hembra');
ALTER TABLE "pet" ALTER COLUMN "sex" TYPE "Sex_new" USING ("sex"::text::"Sex_new");
ALTER TYPE "Sex" RENAME TO "Sex_old";
ALTER TYPE "Sex_new" RENAME TO "Sex";
DROP TYPE "Sex_old";
COMMIT;

-- AlterTable
ALTER TABLE "pet" ADD COLUMN     "type" "PetType" NOT NULL;
