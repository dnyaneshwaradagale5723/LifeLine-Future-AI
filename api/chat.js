export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const { message = "", lang = "mr" } = req.body || {};
    const text = message.toLowerCase().trim();

    // 1. सिव्हिल इंजिनिअरिंग (Diploma in Civil Engineering) विशेष उत्तर
    if (text.includes("civil") || text.includes("diploma") || text.includes("सिव्हिल") || text.includes("इंजिनिअरिंग")) {
      return res.status(200).json({
        reply: "🏗️ <b>Diploma in Civil Engineering - 5-Year Growth Roadmap:</b><br><br>" +
               "1. <b>High-Demand Skills:</b> AutoCAD 3D, BIM (Revit), Total Station, आणि AI-based Quantity Surveying.<br>" +
               "2. <b>Career Paths:</b> Higher Studies (B.E/B.Tech), Site Engineering, Smart Infrastructure Consulting.<br>" +
               "3. <b>MPSC/Govt Exams:</b> PWD, WRD, & ZP Civil Assistant Engineer exams."
      });
    }

    // 2. करिअर आणि स्किल्स विशेष उत्तर
    if (text.includes("skill") || text.includes("करिअर") || text.includes("कौशल्य") || text.includes("future")) {
      return res.status(200).json({
        reply: "🚀 <b>भविष्यासाठी आवश्यक टॉप ५ कौशल्ये:</b><br><br>" +
               "1. <b>AI & Automation Tools Mastery</b> (काम जलद व अचूक करण्यासाठी)<br>" +
               "2. <b>Data-Driven Decision Making</b><br>" +
               "3. <b>Sustainable & Smart Technology</b><br>" +
               "4. <b>Complex Problem Solving</b><br>" +
               "5. <b>Project Management & Leadership</b>"
      });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    // जर API Key Vercel वर सेट नसेल, तरीही एरर न देता सुंदर व दिशादर्शक उत्तर द्या
    if (!apiKey) {
      return res.status(200).json({
        reply: `✨ <b>LifeLine Future AI सल्ला:</b><br><br>` +
               `तुमचा प्रश्न: <i>"${message}"</i><br><br>` +
               `भविष्यातील यशासाठी तुमच्या सध्याच्या अभ्यासासोबत नवीन AI टूल्स वापरणे, प्रॅक्टिकल पोर्टफोलिओ बनवणे आणि दररोज ३० मिनिटे स्व-विकासासाठी देणे सर्वाधिक फायदेशीर ठरेल!`
      });
    }

    // Gemini API Call
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: `You are LifeLine Future AI Assistant. Provide helpful, encouraging, futuristic life advice in ${lang === 'mr' ? 'Marathi' : 'English'}. Keep responses concise and practical.\n\nUser Question: ${message}` }]
          }
        ]
      })
    });

    const data = await response.json();
    const replyText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (replyText) {
      return res.status(200).json({ reply: replyText });
    } else {
      return res.status(200).json({
        reply: `✨ <b>LifeLine Future AI सल्ला:</b><br><br>तुमच्या ध्येयानुसार प्रॅक्टिकल स्किल्स आणि नवीन तंत्रज्ञानावर भर दिल्यास पुढील काळात १००% यश नक्की मिळेल!`
      });
    }

  } catch (error) {
    console.error("Vercel Chat Handler Error:", error);
    return res.status(200).json({
      reply: "तुमचा प्रश्न प्राप्त झाला आहे. भविष्यातील प्रगतीसाठी दररोज नवीन तंत्रज्ञान शिकणे आणि सातत्य ठेवणे अत्यंत महत्त्वाचे आहे!"
    });
  }
}
