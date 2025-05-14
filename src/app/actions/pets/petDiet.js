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
          "Eres un veterinario especializado en nutrición animal, experto en diseñar dietas balanceadas según especie, peso, edad y nivel de actividad de la mascota.",
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

- name: nombre corto de la dieta (ej. "Alta en proteína", "Baja en carbohidratos")
- description: descripción general de la dieta
- calorie_intake: calorías aproximadas por día
- recommended_foods: alimentos recomendados (puede ser una lista separada por comas)
- grams: total de gramos de comida diaria recomendados
- portion_sizes: una representación JSON con las porciones distribuidas en mañana, tarde y noche, ejemplo:
  {
    "data": [
      { "name": "Mañana", "value": 120 },
      { "name": "Tarde", "value": 180 },
      { "name": "Noche", "value": 200 }
    ],
    "colors": ["#0088FE", "#00C49F", "#FFBB28"]
  }

Responde con un arreglo de 5 objetos JSON, donde el primero corresponde a la dieta de croquetas tradicionales, despues cada uno representando una dieta distinta.
`,
      },
    ],
  });
  const dietResponse = completion.choices[0].message.content;
  const dietData = JSON.parse(dietResponse);
  // const dietData = [
  //   {
  //     name: "Croquetas Tradicionales Premium",
  //     description:
  //       "Dieta basada en alimento seco premium de alta calidad, formulado específicamente para perros de razas grandes y muy activos. Contiene un balance adecuado de proteína animal, grasas y carbohidratos complejos para soportar el alto nivel de actividad del Husky Golden.",
  //     calorie_intake: 1800,
  //     recommended_foods:
  //       "Croquetas secas premium para razas grandes, agua fresca",
  //     grams: 460,
  //     portion_sizes: { data: [Array], colors: [Array] },
  //   },
  //   {
  //     name: "Alta en Proteína Natural",
  //     description:
  //       "Dieta casera basada en fuentes frescas y magras de proteína animal, diseñada para potenciar la masa muscular y resistencia en perros atléticos y de trabajo. Se complementa con carbohidratos complejos y vegetales ricos en fibra.",
  //     calorie_intake: 1800,
  //     recommended_foods:
  //       "Pechuga de pollo cocida sin hueso, carne magra de res, pescado blanco, arroz integral, zanahoria cocida, calabaza, brócoli, aceite de salmón",
  //     grams: 520,
  //     portion_sizes: { data: [Array], colors: [Array] },
  //   },
  //   {
  //     name: "Alta en Energía con Carbohidratos Complejos",
  //     description:
  //       "Dieta mixta con énfasis en fuentes de carbohidratos complejos y fibra, ideal para perros muy activos que requieren energía sostenida durante todo el día.",
  //     calorie_intake: 1850,
  //     recommended_foods:
  //       "Pasta integral cocida, camote cocido, avena, pechuga de pollo, huevo cocido, espinaca, zanahoria, aceite de coco",
  //     grams: 540,
  //     portion_sizes: { data: [Array], colors: [Array] },
  //   },
  //   {
  //     name: "BARF Equilibrada",
  //     description:
  //       "Alimentación cruda biológicamente apropiada. Incluye carnes magras crudas, huesos carnosos y vegetales, adaptada para perros de gran tamaño y alta energía.",
  //     calorie_intake: 1800,
  //     recommended_foods:
  //       "Carne magra molida (pollo, res, pavo), huesos carnosos triturados, vísceras (hígado, riñón), verduras ralladas (zanahoria, col, calabaza), frutas (manzana, arándanos), aceite de pescado",
  //     grams: 900,
  //     portion_sizes: { data: [Array], colors: [Array] },
  //   },
  //   {
  //     name: "Hipoalergénica Balanceada",
  //     description:
  //       "Dieta ideal para prevenir o controlar alergias alimentarias, con proteína alternativa y carbohidratos de bajo índice glucémico. Adecuada incluso en perros sanos para variar la fuente proteica.",
  //     calorie_intake: 1800,
  //     recommended_foods:
  //       "Cordero cocido, arroz blanco, batata, chayote, zanahoria cocida, aceite de oliva, yogurt natural sin azúcar",
  //     grams: 500,
  //     portion_sizes: { data: [Array], colors: [Array] },
  //   },
  // ];

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