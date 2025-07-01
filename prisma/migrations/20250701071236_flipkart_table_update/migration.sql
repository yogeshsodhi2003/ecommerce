/*
  Warnings:

  - You are about to drop the column `categories` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `currency` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `sourceUrl` on the `Product` table. All the data in the column will be lost.
  - Added the required column `categorie` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "categories",
DROP COLUMN "currency",
DROP COLUMN "image",
DROP COLUMN "sourceUrl",
ADD COLUMN     "categorie" TEXT NOT NULL,
ADD COLUMN     "seller" TEXT;
