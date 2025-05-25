import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

export const maxDuration = 30;

export async function POST(req) {
  const { messages, selectedPet, selectedDiet } = await req.json();

  let systemPrompt = "Eres un veterinario experto. Da consejos sobre salud preventiva, higiene y bienestar de mascotas. Sé conciso.";

  if (selectedPet) {
    systemPrompt += `\n\nAsesorando sobre ${selectedPet.name}, ${selectedPet.type || 'mascota'} de ${selectedPet.age || '?'} años. Raza: ${selectedPet.breed || 'No especificada'}. Peso: ${selectedPet.weight || '?'} kg. Condiciones médicas: ${selectedPet.medicalConditions || 'Ninguna'}.`;
    
    if (selectedDiet) {
      systemPrompt += ` Dieta actual: ${selectedDiet.name || 'No especificada'} (${selectedDiet.type || 'Tipo no especificado'}).`;
    }
    
    systemPrompt += ` Adapta tus consejos a estos datos. Sé breve y claro.`;
  }

  const result = streamText({
    model: openai('gpt-4o'),
    messages,
    system: systemPrompt
  });

  return result.toDataStreamResponse();
}
