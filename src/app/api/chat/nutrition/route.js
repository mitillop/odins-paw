import OpenAI from 'openai';
import { streamText } from 'ai';
import prisma from "../../../../libs/db";
import { currentUser } from "@clerk/nextjs/server";
import { openai } from '@ai-sdk/openai';

export const maxDuration = 30;

export async function POST(req) {
  const { messages, selectedPet, selectedDiet, diets } = await req.json();

  try {
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

    let systemPrompt = "Eres un nutricionista de mascotas. Da consejos basados en ciencia sobre alimentación adecuada según tipo, edad, raza y salud del animal. Sé conciso y claro.";
  
    if (selectedPet) {
      systemPrompt += `\n\nAsesorando a ${selectedPet.name}, ${selectedPet.type || 'mascota'} de ${selectedPet.age || '?'} años. Raza: ${selectedPet.breed || 'No especificada'}. Peso: ${selectedPet.weight || '?'} kg. Condiciones médicas: ${selectedPet.medicalConditions || 'Ninguna'}.`;
      if (selectedDiet) {
        let formattedPortionSizes = 'No especificadas';
        if (selectedDiet.portion_sizes) {
          try {
            const portionData = typeof selectedDiet.portion_sizes === 'string' 
              ? JSON.parse(selectedDiet.portion_sizes) 
              : selectedDiet.portion_sizes;
            
            if (portionData.data && Array.isArray(portionData.data)) {
              formattedPortionSizes = portionData.data
                .map(portion => `${portion.name}: ${portion.value}g`)
                .join(', ');
            }
          } catch (error) {
            console.error('Error parsing portion sizes:', error);
          }
        }
        
        systemPrompt += ` Dieta actual: ${selectedDiet.name || 'No especificada'} (${selectedDiet.type || 'Tipo no especificado'}) Alimentos recomendados: ${selectedDiet.recommendedFoods || 'Ninguno'} Porciones: ${formattedPortionSizes}. Gramos totales: ${selectedDiet.grams || 'No especificados'}. Calorias totales: ${selectedDiet.calorie_intake || 'No especificadas'}. Dieta: ${selectedDiet.description || 'No especificada'}.`;
      }
      if (diets && diets.length > 0) {
        systemPrompt += ` Dietas disponibles: ${diets.map(diet => `${diet.name} (${diet.type})`).join(', ')}.`;
      }
      
      systemPrompt += ` Adapta tus recomendaciones a estos datos. Sé breve y claro.`;
    }

    const result = await streamText({
      model: openai('gpt-4o-mini'),
      messages: [
        { role: "system", content: systemPrompt },
        ...messages
      ],
      onFinish: async (completion) => {
        try {
          const fullContent = completion.text;
          // Generate a simple title based on the first message or content
          const userMessage = messages[messages.length - 1]?.content || "Conversación de Nutrición";
          const title = userMessage.length > 50 
            ? userMessage.substring(0, 47) + "..." 
            : userMessage;

          // Store in database
          await prisma.chatHistory.create({
            data: {
              userId: existingUser.id,
              petId: selectedPet?.id ? BigInt(selectedPet.id) : null,
              message: {
                title: title,
                content: fullContent
              },
              category: "Alimentacion"
            }
          });
        } catch (error) {
          console.error("Error storing chat history:", error);
        }
      }
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error("Error en el chat de nutrición:", error);
    return new Response(
      JSON.stringify({ error: "Error al procesar tu solicitud" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
