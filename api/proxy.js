export default async function handler(req, res) {
  // Достаем параметры из ссылки
  const { model, key } = req.query;
  
  const targetUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`;

  try {
    // Делаем чистый запрос из США
    const response = await fetch(targetUrl, { 
      method: "POST", 
      headers: {
        "Content-Type": "application/json"
      }, 
      // Vercel сам парсит JSON, поэтому собираем его обратно в строку
      body: JSON.stringify(req.body) 
    });

    // Получаем ответ от Google и отдаем боту
    const data = await response.json();
    return res.status(response.status).json(data);
    
  } catch (error) {
    return res.status(500).json({ error: "Ошибка прокси-сервера" });
  }
}