"use server";

import prisma from "../../../libs/db";
import { revalidatePath } from "next/cache";
import { uploadFile } from "../files/uploadFile";

export async function updatePet(petData) {
  try {
    const {
      id,
      name,
      sex,
      type,
      breed,
      age,
      weight,
      activityLevel,
      medicalConditions,
      photo,
    } = petData;

    const existingPet = await prisma.pet.findUnique({
      where: { id },
    });

    if (!existingPet) {
      throw new Error("Mascota no encontrada");
    }

    let imgUrl = undefined;
    if (photo) {
      imgUrl = await uploadFile(photo);
    }

    const updatedPet = await prisma.pet.update({
      where: { 
        id: existingPet.id,
      },
      data: {
        name,
        sex,
        type,
        breed,
        age: parseFloat(age),
        weight: parseFloat(weight),
        activityLevel,
        medicalConditions,
        ...(imgUrl && { imageUrl: imgUrl }),
        updatedAt: new Date(),
      },
    });

    revalidatePath("/dashboard");
    const serializedPet = {
      id: updatedPet.id.toString(),
      name: updatedPet.name,
      sex: updatedPet.sex,
      type: updatedPet.type,
      breed: updatedPet.breed,
      age: updatedPet.age,
      weight: updatedPet.weight
        ? parseFloat(updatedPet.weight.toString())
        : null,
      activityLevel: updatedPet.activityLevel,
      medicalConditions: updatedPet.medicalConditions,
      imageUrl: updatedPet.imageUrl,
      createdAt: updatedPet.createdAt.toISOString(),
      updatedAt: updatedPet.updatedAt.toISOString(),
    };
    return serializedPet;
  } catch (error) {
    console.error("Error updating pet:", error);
    if (error.code === "P2025") {
      throw new Error("Mascota no encontrada");
    }
    throw new Error("No se pudo actualizar la mascota: " + error.message);
  }
}
