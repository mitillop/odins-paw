import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

export const maxDuration = 30;

export async function POST(req) {
  const { messages, selectedPet, selectedDiet } = await req.json();
  
  try {
    let systemPrompt = "Eres un asistente de mascotas amigable. Proporciona información sobre cuidado animal, comportamiento y tenencia responsable. Sé conciso y claro.";
    
    if (selectedPet) {
      systemPrompt += `\n\nAsistiendo al dueño de ${selectedPet.name}, ${selectedPet.type || 'mascota'} de ${selectedPet.age || '?'} años. Raza: ${selectedPet.breed || 'No especificada'}. Peso: ${selectedPet.weight || '?'} kg.`;
      
      if (selectedDiet) {
        systemPrompt += ` Dieta actual: ${selectedDiet.name || 'No especificada'} (${selectedDiet.type || 'Tipo no especificado'}).`;
      }
      
      systemPrompt += ` Ajusta tus respuestas a estos datos específicos. Sé breve y claro.`;
    }
    
    const result = streamText({
      model: openai('gpt-4.1'),
      messages,
      system: systemPrompt,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error("Error en el chat general:", error);
    return new Response(
      JSON.stringify({ error: "Error al procesar tu solicitud" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
