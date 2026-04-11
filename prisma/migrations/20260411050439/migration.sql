/*
  Warnings:

  - You are about to drop the column `secondaryCategry` on the `Category` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[primaryCategory,secondaryCategory]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `secondaryCategory` to the `Category` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Category_primaryCategory_secondaryCategry_key";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "secondaryCategry",
ADD COLUMN     "secondaryCategory" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Category_primaryCategory_secondaryCategory_key" ON "Category"("primaryCategory", "secondaryCategory");
