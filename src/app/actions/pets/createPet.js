'use server'
import prisma from "../../../libs/db";
import { currentUser } from "@clerk/nextjs/server";

export async function createPet(data) {
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

  if (petExists) {
    throw new Error(`Ya tienes una mascota con el nombre "${data.name}"`);
  }

  const petDataForDb = {
    name: data.name,
    sex: data.sex,
    type: data.type,
    breed: data.breed,
    age: Number(data.age),
    weight: Number(data.weight),
    activityLevel: data.activityLevel,
    medicalConditions: data.medicalConditions || "Ninguno",
    imageUrl: data.imageUrl || null,
    userId: existingUser.id,
    createdAt: new Date(data.createdAt) || new Date(),
    updatedAt: new Date(data.updatedAt) || new Date(),
  };

  const newPet = await prisma.pet.create({
    data: petDataForDb,
  });

  const serializedPet = {
    ...newPet,
    id: Number(newPet.id),
    userId: Number(newPet.userId),
    age: Number(newPet.age),
    weight: Number(newPet.weight),
    createdAt: newPet.createdAt.toISOString(),
    updatedAt: newPet.updatedAt.toISOString(),
  };

  return serializedPet;
}
