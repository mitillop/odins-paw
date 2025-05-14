/*
  Warnings:

  - You are about to drop the column `type` on the `diet` table. All the data in the column will be lost.
  - You are about to drop the `food_portion` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `description` to the `diet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `grams` to the `diet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `diet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `portion_sizes` to the `diet` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "food_portion" DROP CONSTRAINT "food_portion_pet_id_fkey";

-- AlterTable
ALTER TABLE "diet" DROP COLUMN "type",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "grams" INTEGER NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "portion_sizes" TEXT NOT NULL;

-- DropTable
DROP TABLE "food_portion";

-- DropEnum
DROP TYPE "DietType";
