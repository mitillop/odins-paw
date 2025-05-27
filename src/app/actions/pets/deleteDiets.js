"use server";

import prisma from "../../../libs/db";

export async function deleteDiets(petId) {
  try {
    await prisma.diet.deleteMany({
      where: {
        petId: petId
      }
    });
    return { success: true };
  } catch (error) {
    console.error("Error deleting diets:", error);
    throw new Error("Failed to delete diets");
  }
} 