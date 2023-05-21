/*
  Warnings:

  - You are about to drop the column `image` on the `Flashcard` table. All the data in the column will be lost.
  - You are about to drop the column `isDone` on the `Flashcard` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Flashcard" DROP COLUMN "image",
DROP COLUMN "isDone";
