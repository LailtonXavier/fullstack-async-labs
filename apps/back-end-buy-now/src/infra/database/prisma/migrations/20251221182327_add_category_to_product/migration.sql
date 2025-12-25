/*
  Warnings:

  - Added the required column `category` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Categories" AS ENUM ('Featured', 'Chairs', 'Armchairs', 'TableLamp', 'CeilingLight', 'Decors', 'Rugs', 'Cushions');

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "category" "Categories" NOT NULL;
