import { openai } from '@ai-sdk/openai';

export async function POST(req) {
  try {
    const { messages } = await req.json();
    
    console.log('Testing OpenAI API with model: gpt-4.1');
    console.log('Messages:', JSON.stringify(messages));
    
    const completion = await openai('gpt-4.1').chat({
      messages: [
        { role: 'system', content: 'Eres un asistente amigable.' },
        ...messages
      ]
    });
    
    console.log('Response:', completion);
    
    return Response.json({ 
      success: true, 
      response: completion.choices[0].message.content 
    });
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    return Response.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}
