import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

export const maxDuration = 30;

export async function POST(req) {
  const { messages, selectedPet, selectedDiet, diets } = await req.json();

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

  const result = streamText({
    model: openai('gpt-4o'),
    messages,
    system: systemPrompt
  });

  return result.toDataStreamResponse();
}
