// مثال Node.js بسيط: POST /api/chat
// تثبيت: npm install express node-fetch
const express = require('express');
const fetch = require('node-fetch'); // أو استخدم مكتبة OpenAI الرسمية
const app = express();
app.use(express.json());

const OPENAI_KEY = process.env.OPENAI_API_KEY;
if(!OPENAI_KEY){
  console.warn('OPENAI_API_KEY not set. AI mode will fail.');
}

app.post('/api/chat', async (req, res) => {
  const { message, lang='en' } = req.body || {};
  if(!message) return res.status(400).json({error:'No message'});
  try {
    // مثال استدعاء OpenAI Chat completions (تعديل حسب واجهة المكتبة لديك)
    const prompt = (lang === 'ar')
      ? `أجِب بالعربية: ${message}`
      : `Answer in English: ${message}`;
    const r = await fetch('https://api.openai.com/v1/chat/completions', {
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        'Authorization': `Bearer ${OPENAI_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 400
      })
    });
    const j = await r.json();
    const reply = j?.choices?.[0]?.message?.content || (lang==='ar'? 'لم أستطع الحصول على رد' : 'No reply');
    res.json({reply});
  } catch(err){
    console.error(err);
    res.status(500).json({error: 'server error'});
  }
});

app.use(express.static('public')); // قدم ملفات الواجهة (ضع مشروعك داخل public)

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> console.log('Server listening on', PORT));
