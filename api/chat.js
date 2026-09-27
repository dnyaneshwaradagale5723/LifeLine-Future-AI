export default async function handler(req, res) {
  // CORS Headers allow
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST requests allowed' });
  }

  try {
    const { message, lang = 'mr' } = req.body || {};
    if (!message) {
      return res.status(400).json({ error: 'Message query is required' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ 
        error: 'API key is missing in Vercel Environment Variables. Please set GEMINI_API_KEY in Vercel Dashboard.' 
      });
    }

    const promptLanguage = lang === 'mr' ? 'Marathi' : 'English';
    const systemPrompt = `You are LifeLine Future AI Assistant, an empathetic career, health, and life counselor.
Provide a clear, inspiring, practical and futuristic response in ${promptLanguage}. Keep it actionable and concise.`;

    // Google Gemini REST API Call
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: `${systemPrompt}\n\nUser Question: ${message}` }]
          }
        ]
      })
    });

    const data = await response.json();

    if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
      const botReply = data.candidates[0].content.parts[0].text;
      return res.status(200).json({ reply: botReply });
    } else {
      console.error('Gemini API Payload Error:', data);
      return res.status(500).json({ error: 'Invalid response from AI Model', details: data });
    }

  } catch (error) {
    console.error('Gemini API Error:', error);
    return res.status(500).json({ error: 'Internal server error while processing AI chat' });
  }
}
