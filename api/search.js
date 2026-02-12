// ============================================================
// Sovra API Search Endpoint (Public, NFIE‑compliant)
// ============================================================

const ZERO_SUM_TERMS = [
  "take from",
  "steal",
  "replace",
  "erase",
  "dilute",
  "threaten",
  "reverse discrimination",
  "they are taking",
  "they're taking",
  "our jobs",
  "our schools",
  "our culture"
];

function detectZeroSum(inputText) {
  const lower = inputText.toLowerCase();
  const matches = ZERO_SUM_TERMS.filter(term => lower.includes(term));
  return {
    detected: matches.length > 0,
    matches,
    score: matches.length / ZERO_SUM_TERMS.length
  };
}

function runZSEStandalone(inputText) {
  const zs = detectZeroSum(inputText);
  if (!zs.detected) return { detected: false };
  return {
    detected: true,
    score: zs.score,
    matches: zs.matches.map(term => ({ term }))
  };
}

export default async function handler(req, res) {
 const query = String(req.query.q || "")
  .normalize("NFKC")
  .replace(/[“”]/g, '"')
  .replace(/[‘’]/g, "'")
  .trim();
  const query_token = Buffer.from(query).toString("base64").slice(0, 16);
  const zseOn = req.query.zse === "1";
  const raw = req.query.raw === "true";
  const apiKey = process.env.SERPAPI_KEY;

  if (!query) {
    res.status(400).json({ error: "Missing query" });
    return;
  }

  const endpoint =
    `https://serpapi.com/search.json?q=${encodeURIComponent(query)}` +
    `&engine=google&api_key=${apiKey}`;

  const controller = new AbortController();
  const timeoutMs = 8000;
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(endpoint, {
      signal: controller.signal,
      headers: {
        "user-agent": "Sovra/1.0 (public-runtime)"
      }
    });

    clearTimeout(timeout);

    const data = await response.json();

    const organic_results = Array.isArray(data.organic_results)
      ? data.organic_results.map(r => ({
          title: r.title || "",
          link: r.link || "",
          snippet: r.snippet || "",
          confidence: 0.5,
          relevance: 0.5,
          sensitivity: 0.5,
          mirrors: 0
        }))
      : [];

    const zse = zseOn ? runZSEStandalone(query) : null;

    res.status(200).json({
      query_token,
      organic_results,
      zse
    });

  } catch (error) {
    clearTimeout(timeout);

    if (error.name === "AbortError") {
      res.status(200).json({
        query_token,
        organic_results: [],
        zse: zseOn ? runZSEStandalone(query) : null,
        timeout: true
      });
      return;
    }

    res.status(500).json({
      error: "Sovra proxy error: " + error.message
    });
  }
}

