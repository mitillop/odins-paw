import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

export const maxDuration = 30;

export async function POST(req) {
  const { messages } = await req.json();

  const result = streamText({
    model: openai('gpt-4o'),
    messages,
    system: "Eres un nutricionista especializado en alimentación de mascotas. Tu objetivo es proporcionar información nutricional específica para diferentes tipos de mascotas, recomendar dietas basadas en edad, raza y condiciones de salud, y responder preguntas sobre alimentos adecuados e inadecuados para animales domésticos. Ofrece consejos prácticos y fundamentados en ciencia."
  });

  return result.toDataStreamResponse();
}
