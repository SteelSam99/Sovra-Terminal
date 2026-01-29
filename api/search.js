export default async function handler(req, res) {
  const query = req.query.q;
  const apiKey = process.env.SERPAPI_KEY;

  const endpoint = `https://serpapi.com/search.json?q=${encodeURIComponent(query)}&engine=google&api_key=${apiKey}`;

  try {
    const response = await fetch(endpoint);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Sovra proxy error: " + error.message });
  }
}

