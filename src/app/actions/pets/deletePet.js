"use server";
import prisma from "../../../libs/db";
import { currentUser } from "@clerk/nextjs/server";

export async function deletePet(data) {
  const user = await currentUser();
  if (!user) {
    throw new Error("No se encontró el usuario actual.");
  }

  const existingUser = await prisma.user.findUnique({
    where: { clerkId: user.id },
    include: {
      pets: {
        select: {
          name: true,
        },
      },
    },
  });

  if (!existingUser) {
    throw new Error("Usuario no encontrado en la base de datos.");
  }
  const petExists = existingUser.pets.some(
    (pet) => pet.name.toLowerCase() === data.name.toLowerCase()
  );
  if (!petExists) {
    throw new Error(`No tienes una mascota con el nombre "${data.name}"`);
  }
  const deletedPet = await prisma.pet.delete({
    where: {
      id: data.id,
    },
  });
  const serializedPet = {
    ...deletedPet,
    id: Number(deletedPet.id),
    userId: Number(deletedPet.userId),
    weight: Number(deletedPet.weight),
    createdAt: deletedPet.createdAt.toISOString(),
    updatedAt: deletedPet.updatedAt.toISOString(),
  };
  return serializedPet;
}
