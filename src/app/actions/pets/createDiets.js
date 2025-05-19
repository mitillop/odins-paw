"use server";
import OpenAI from "openai";
import prisma from "../../../libs/db";
import { currentUser } from "@clerk/nextjs/server";

export async function createPetDiet(data) {
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
      userId: existingUser.id,
      name: data.name,
    },
  });

  if (!pet) {
    throw new Error(
      `No se encontró la mascota "${data.name}" para este usuario.`
    );
  }

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const completion = await openai.chat.completions.create({
    model: "gpt-4.1",
    messages: [
      {
        role: "system",
        content:
          "Eres un veterinario mexicano especializado en nutrición animal, experto en diseñar dietas balanceadas según especie, peso, edad y nivel de actividad de la mascota. Tu tarea es crear dietas personalizadas para perros y gatos, considerando sus necesidades nutricionales específicas. Proporciona información clara y concisa, evitando jerga técnica innecesaria.",
      },
      {
        role: "user",
        content: `
Dado el siguiente perfil de mascota:
- Tipo: ${data.type}
- Especie: ${data.species}
- Sexo: ${data.sex}
- Raza: ${data.breed}
- Edad: ${data.age} años
- Peso: ${data.weight} kg
- Nivel de actividad: ${data.activityLevel}
- Condiciones médicas: ${data.medicalConditions}

Necesito que generes una dieta con los siguientes campos (en formato JSON):

- name: nombre corto de la dieta (ej. "Croquetas", "BARF", "Hipoalergénica", "Mixta", etc.)
- description: descripción general de la dieta
- calorie_intake: calorías aproximadas por día
- recommended_foods: alimentos recomendados (puede ser una lista separada por comas)
- grams: total de gramos de comida diaria recomendados
- portion_sizes: una representación JSON con las porciones distribuidas en mañana, tarde y noche, ejemplo de formato que debes seguir estrictamente:
  {
    "data": [
      { "name": "Mañana", "value": 120 },
      { "name": "Tarde", "value": 180 },
      { "name": "Noche", "value": 200 }
    ]
  }

Responde con un arreglo de 5 objetos JSON, donde el primero corresponde a la dieta de croquetas tradicionales, despues cada uno representando una dieta distinta.
`,
      },
    ],
  });  const dietResponse = completion.choices[0].message.content;
  
  const jsonContent = dietResponse.replace(/```json|```/g, '').trim();
  const dietData = JSON.parse(jsonContent);

  const petDiets = await Promise.all(
    dietData.map(diet => 
      prisma.Diet.create({
        data: {
          name: diet.name,
          description: diet.description,
          calorie_intake: diet.calorie_intake,
          recommended_foods: diet.recommended_foods,
          grams: diet.grams,
          portion_sizes: JSON.stringify(diet.portion_sizes),
          petId: pet.id,
        },
      })
    )
  );

  return petDiets;
}