export default async function handler(request, response) {
  const { city } = request.query;
  const API_KEY = process.env.API_KEY; 

  if (!API_KEY) {
    return response.status(500).json({ error: "API_KEY is not defined in the environment" });
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    if (res.ok) {
      return response.status(200).json(data);
    } else {
      return response.status(res.status).json(data);
    }
  } catch (error) {
    return response.status(500).json({ error: "Failed to fetch weather" });
  }
}