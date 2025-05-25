import OpenAI from 'openai';
import { streamText } from "ai";
import prisma from "../../../../libs/db";
import { currentUser } from "@clerk/nextjs/server";

export const maxDuration = 30;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

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

    let systemPrompt = "Eres un asistente de mascotas amigable. Proporciona información sobre cuidado animal, comportamiento y tenencia responsable. Sé conciso y claro. Al final de tu respuesta, incluye un título corto y descriptivo para la conversación en el siguiente formato: [TÍTULO: tu título aquí]";
    
    if (selectedPet) {
      systemPrompt += `\n\nAsistiendo al dueño de ${selectedPet.name}, ${selectedPet.type || 'mascota'} de ${selectedPet.age || '?'} años. Raza: ${selectedPet.breed || 'No especificada'}. Peso: ${selectedPet.weight || '?'} kg.`;
      
      if (selectedDiet) {
        systemPrompt += ` Dieta actual: ${selectedDiet.name || 'No especificada'} (${selectedDiet.type || 'Tipo no especificado'}).`;
      }
      
      systemPrompt += ` Ajusta tus respuestas a estos datos específicos. Sé breve y claro.`;
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4.1",
      messages: [
        { role: "system", content: systemPrompt },
        ...messages
      ],
    });

    const completion = response.choices[0].message.content;
    const titleMatch = completion.match(/\[TÍTULO: (.*?)\]/);
    const title = titleMatch ? titleMatch[1].trim() : "Conversación General";
    const cleanCompletion = completion.replace(/\[TÍTULO: .*?\]/, "").trim();

    // Store in database
    await prisma.chatHistory.create({
      data: {
        userId: existingUser.id,
        petId: selectedPet?.id ? BigInt(selectedPet.id) : null,
        message: {
          title: title,
          content: cleanCompletion
        },
        category: "Preguntas_Generales"
      }
    });

    return new Response(cleanCompletion, {
      headers: { "Content-Type": "text/plain" },
    });
  } catch (error) {
    console.error("Error en el chat general:", error);
    return new Response(
      JSON.stringify({ error: "Error al procesar tu solicitud" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
