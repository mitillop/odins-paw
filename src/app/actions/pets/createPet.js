import prisma from "../../../libs/db";

export async function createPet(data, user) {
  const existingUser = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
    include: {
      pets: {
        select: {
          name: true,
        },
      },
    },
  });
  const petExists = existingUser.pets.some(
    (pet) => pet.name.toLowerCase() === data.name.toLowerCase()
  );

  if (petExists) {
    throw new Error(`Ya tienes una mascota con el nombre "${data.name}"`);
  }

  const newPet = await prisma.pet.create({
    data: {
      ...data,
      userId: user.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  return newPet;
}
