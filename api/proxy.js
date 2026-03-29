// Жестко привязываем выполнение только к серверу в Вашингтоне (США)
export const config = {
  regions: ['iad1'],
};

export default async function handler(req, res) {
  // Маршрут для проверки в браузере (Health Check)
  if (req.method === 'GET') {
    return res.status(200).json({ status: "Шлюз Vercel работает! Локация: США (iad1)" });
  }

  // Основная логика проксирования для бота
  const { model, key } = req.query;
  const targetUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`;

  try {
    const response = await fetch(targetUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(req.body) // Отправляем чистый JSON без исходных IP
    });

    const data = await response.json();
    return res.status(response.status).json(data);
  } catch (error) {
    return res.status(500).json({ error: "Ошибка прокси-сервера" });
  }
}