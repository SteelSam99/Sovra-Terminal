export default async function handler(req, res) {
  const query = String(req.query.q || "").trim();
  const raw = req.query.raw === "true";
  const apiKey = process.env.SERPAPI_KEY;

  if (!query) {
    res.status(400).json({ error: "Missing query" });
    return;
  }

  const endpoint =
    `https://serpapi.com/search.json` +
    `?q=${encodeURIComponent(query)}` +
    `&engine=google` +
    `&api_key=${apiKey}`;

  const controller = new AbortController();
  const timeoutMs = 8000; // 8 seconds — safely under platform limits
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(endpoint, {
      signal: controller.signal,
      headers: {
        "user-agent": "Sovra/1.0 (public-runtime)"
      }
    });

    const data = await response.json();

    const organic = Array.isArray(data.organic_results)
      ? data.organic_results.map((r) => ({
          title: r.title || "",
          link: r.link || "",
          snippet: r.snippet || "",
          confidence: 0,
          relevance: 0,
          sensitivity: 0,
          mirrors: 0,
          predicate: "serpapi:organic",
          signature: r.position ? `pos-${r.position}` : ""
        }))
      : [];

    res.status(200).json({
      query_token: data.search_metadata?.id || "",
      organic_results: organic,
      raw: raw ? data : null
    });
  } catch (error) {
    const message =
      error.name === "AbortError"
        ? "Upstream search exceeded time budget"
        : error.message || "Unknown upstream error";

    res.status(504).json({
      error: "Sovra proxy error: " + message
    });
  } finally {
    clearTimeout(timeout);
  }
}

