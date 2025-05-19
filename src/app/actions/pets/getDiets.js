"use server";

import prisma from "../../../libs/db";
import { currentUser } from "@clerk/nextjs/server";

export async function getDiets(petId) {
  if (!petId) {
    return [];
  }
  
  const user = await currentUser();
  if (!user) {
    throw new Error("No se encontró el usuario actual.");
  }

  const existingUser = await prisma.user.findUnique({
    where: { clerkId: user.id },
  });

  if (!existingUser) {
    throw new Error("Usuario no encontrado en la base de datos.");
  }

  const pet = await prisma.pet.findFirst({
    where: {
      id: petId,
      userId: existingUser.id,
    },
  });

  if (!pet) {
    throw new Error("No se encontró la mascota o no pertenece a este usuario.");
  }

  const diets = await prisma.diet.findMany({
    where: {
      petId: petId,
    },
  });
  return diets.map(diet => ({
    ...diet,
    id: String(diet.id),
    petId: String(diet.petId),
    portion_sizes: JSON.parse(diet.portion_sizes)
  }));
}
