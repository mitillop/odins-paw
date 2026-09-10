"use server";

import prisma from "../../../libs/db";
import { revalidatePath } from "next/cache";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";

const s3Client = new S3Client({
  region: process.env.AWS_REGION || "us-east-2",
  endpoint: process.env.AWS_ENDPOINT_URL_S3,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
  forcePathStyle: true,
});

async function uploadToS3(file) {
  let buffer;
  let originalName = "unknown";
  let mimeType = "application/octet-stream";

  if (file instanceof File || (file.name && file.type && file.size !== undefined)) {
    const arrayBuffer = await file.arrayBuffer();
    buffer = Buffer.from(arrayBuffer);
    originalName = file.name || originalName;
    mimeType = file.type || mimeType;
  } else if (file.buffer || file.data) {
    buffer = file.buffer || file.data;
    originalName = file.originalname || file.name || originalName;
    mimeType = file.mimetype || file.type || mimeType;
  } else if (typeof file === "string" && file.startsWith("data:")) {
    const base64Data = file.split(",")[1];
    buffer = Buffer.from(base64Data, "base64");
    mimeType = file.split(";")[0].split(":")[1] || mimeType;
  } else {
    throw new Error("Unsupported file format");
  }

  const fileExtension = originalName.split(".").pop() || "jpg";
  const key = `${uuidv4()}.${fileExtension}`;

  await s3Client.send(
    new PutObjectCommand({
      Bucket: "pet-images",
      Key: key,
      Body: buffer,
      ContentType: mimeType,
    })
  );

  return `${process.env.AWS_ENDPOINT_URL_S3}/pet-images/${key}`;
}

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
      imgUrl = await uploadToS3(photo);
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
