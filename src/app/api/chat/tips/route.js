import OpenAI from 'openai';
import { streamText } from 'ai';
import prisma from "../../../../libs/db";
import { currentUser } from "@clerk/nextjs/server";
import { openai } from '@ai-sdk/openai';

export const maxDuration = 30;

export async function POST(req) {
  const { messages, selectedPet, selectedDiet } = await req.json();

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

    let systemPrompt = "Eres un veterinario experto. Da consejos sobre salud preventiva, higiene y bienestar de mascotas. Sé conciso. Al final de tu respuesta, incluye un título corto y descriptivo para la conversación en el siguiente formato: [TÍTULO: tu título aquí]";

    if (selectedPet) {
      systemPrompt += `\n\nAsesorando sobre ${selectedPet.name}, ${selectedPet.type || 'mascota'} de ${selectedPet.age || '?'} años. Raza: ${selectedPet.breed || 'No especificada'}. Peso: ${selectedPet.weight || '?'} kg. Condiciones médicas: ${selectedPet.medicalConditions || 'Ninguna'}.`;
      
      if (selectedDiet) {
        systemPrompt += ` Dieta actual: ${selectedDiet.name || 'No especificada'} (${selectedDiet.type || 'Tipo no especificado'}).`;
      }
      
      systemPrompt += ` Adapta tus consejos a estos datos. Sé breve y claro.`;
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
          const titleMatch = fullContent.match(/\[TÍTULO: (.*?)\]/);
          const title = titleMatch ? titleMatch[1].trim() : "Conversación de Cuidados";
          const cleanCompletion = fullContent.replace(/\[TÍTULO: .*?\]/, "").trim();

          // Store in database
          await prisma.chatHistory.create({
            data: {
              userId: existingUser.id,
              petId: selectedPet?.id ? BigInt(selectedPet.id) : null,
              message: {
                title: title,
                content: cleanCompletion
              },
              category: "Cuidados"
            }
          });
        } catch (error) {
          console.error("Error storing chat history:", error);
        }
      }
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error("Error en el chat de cuidados:", error);
    return new Response(
      JSON.stringify({ error: "Error al procesar tu solicitud" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
