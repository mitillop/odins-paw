import OpenAI from 'openai';
import { streamText } from 'ai';
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

    let systemPrompt = "Eres un veterinario experto. Da consejos sobre salud preventiva, higiene y bienestar de mascotas. Sé conciso. Al final de tu respuesta, incluye un título corto y descriptivo para la conversación en el siguiente formato: [TÍTULO: tu título aquí]";

    if (selectedPet) {
      systemPrompt += `\n\nAsesorando sobre ${selectedPet.name}, ${selectedPet.type || 'mascota'} de ${selectedPet.age || '?'} años. Raza: ${selectedPet.breed || 'No especificada'}. Peso: ${selectedPet.weight || '?'} kg. Condiciones médicas: ${selectedPet.medicalConditions || 'Ninguna'}.`;
      
      if (selectedDiet) {
        systemPrompt += ` Dieta actual: ${selectedDiet.name || 'No especificada'} (${selectedDiet.type || 'Tipo no especificado'}).`;
      }
      
      systemPrompt += ` Adapta tus consejos a estos datos. Sé breve y claro.`;
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
    const title = titleMatch ? titleMatch[1].trim() : "Conversación de Cuidados";
    const cleanCompletion = completion.replace(/\[TÍTULO: .*?\]/, "").trim();

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

    return new Response(cleanCompletion, {
      headers: { "Content-Type": "text/plain" },
    });
  } catch (error) {
    console.error("Error en el chat de cuidados:", error);
    return new Response(
      JSON.stringify({ error: "Error al procesar tu solicitud" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
