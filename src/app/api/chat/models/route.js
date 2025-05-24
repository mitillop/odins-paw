import { openai } from '@ai-sdk/openai';

export async function GET() {
  try {
    // Intentar obtener información sobre modelos disponibles
    const models = [
      { name: 'gpt-4.1', available: false, error: null },
      { name: 'gpt-4o', available: false, error: null },
    ];
    
    // Verificar cada modelo
    for (const model of models) {
      try {
        // Intentar hacer una llamada simple para verificar si el modelo está disponible
        const completion = await openai(model.name).chat({
          messages: [
            { role: 'system', content: 'Responde con la palabra "OK".' },
            { role: 'user', content: '¿Estás disponible?' }
          ]
        });
        
        model.available = true;
        model.response = completion.choices[0]?.message?.content || 'Sin respuesta';
      } catch (modelError) {
        model.error = modelError.message;
      }
    }
    
    // Obtener información de configuración
    const config = {
      apiKey: process.env.OPENAI_API_KEY ? 'Configurada' : 'No configurada',
      baseURL: process.env.OPENAI_BASE_URL || 'Default',
      models
    };
    
    return Response.json({ success: true, config });
  } catch (error) {
    console.error('Error al verificar modelos:', error);
    return Response.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}
