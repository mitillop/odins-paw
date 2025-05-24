import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

export const maxDuration = 30;

export async function POST(req) {
  const { messages } = await req.json();
  
  try {
    // Usar comillas simples como en los otros endpoints que funcionan
    const result = streamText({
      model: openai('gpt-4.1'),
      messages,
      system:
        "Eres un asistente amigable especializado en mascotas. Tu objetivo es proporcionar información general sobre el cuidado de mascotas, responder preguntas sobre comportamiento animal y ofrecer consejos generales sobre la tenencia responsable de mascotas. Mantén un tono conversacional y amable.",
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
