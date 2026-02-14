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

function generateZSEExplanation(zseResult) {
  if (!zseResult?.detected) return null;
  return {
    engine: "ZSE",
    framing: "zero-sum",
    explanation:
      "This material relies on a zero‑sum framing, treating rights or opportunities as finite resources. Such framing implies that gains for one group necessarily result in losses for another, a common narrative structure in scarcity‑based arguments."
  };
}

export default async function handler(req, res) {
  const query = String(req.query.q || "")
    .normalize("NFKC")
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .trim();

  if (!query) {
    res.status(400).json({ error: "Missing query" });
    return;
  }

  const query_token = Buffer.from(query).toString("base64").slice(0, 16);
  const zseOn = req.query.zse === "1";
  const apiKey = process.env.SERPAPI_KEY;

  const endpoint =
    `https://serpapi.com/search.json?q=${encodeURIComponent(query)}` +
    `&engine=google&api_key=${apiKey}`;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  try {
    const response = await fetch(endpoint, {
      signal: controller.signal,
      headers: { "user-agent": "Sovra/1.0 (public-runtime)" }
    });

    clearTimeout(timeout);

    const contentType = response.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      const text = await response.text();
      res.status(502).json({
        error: "Upstream returned non-JSON",
        preview: text.slice(0, 120)
      });
      return;
    }

    const data = await response.json();

    // Normalize results
    let organic_results = Array.isArray(data.organic_results)
      ? data.organic_results.map(r => ({
          title: r.title || "",
          link: r.link || "",
          snippet: r.snippet || "",
          confidence: 0.5,
          relevance: 0.5,
          sensitivity: 0.5,
          mirrors: 0,
          predicate: []
        }))
      : [];
// ============================================================
// CORE DIAGNOSTIC PIPELINE (SERVER-SIDE ONLY)
// ============================================================

let cdlmTelemetry = null;

try {
  // 1) Domain parsing
  const domainHits = CDLM.parseInput(query, "core_diagnostic_map");
  const activeDomains = Object.keys(domainHits);

  // 2) Contradiction scoring
  const contradictionScore = CPM.scoreContradiction(activeDomains, "core_diagnostic_map");

  // 3) Zero-sum escalation (authoritative)
  const zseCore = CDLM.runZSEifNeeded(
    query,
    contradictionScore,
    "core_diagnostic_map"
  );

  // 4) Phase detection (optional, future-facing)
  const phase = PWSTracker.detectPhase(
    { implementation: contradictionScore > 4 },
    "core_diagnostic_map"
  );

  // 5) Structural dominance score (SDM)
  const sdmScore = SDMCore.calculateScore(
    {
      foundational_alignment: contradictionScore / 10,
      narrative_control: zseCore?.score || 0,
      entropy_flow: activeDomains.length / 9
    },
    "core_diagnostic_map"
  );

  // 6) Telemetry projection (bounded, descriptive)
  cdlmTelemetry = {
    collapse: Math.min(10, contradictionScore),
    contradiction: Math.min(10, contradictionScore),
    zeroSum: zseCore?.detected ? Math.min(3, Math.ceil(zseCore.score * 3)) : 0,
    phase,
    sdm: sdmScore
  };

} catch (err) {
  console.error("[CDLM CORE ERROR]", err.message);
}

    // Run ZSE once
    const zse = zseOn ? runZSEStandalone(query) : null;
    const zseContext = zse?.detected ? generateZSEExplanation(zse) : null;

    // Attach ZSE context
    if (zseContext) {
      organic_results = organic_results.map(r => ({
        ...r,
        predicate: [...r.predicate, zseContext]
      }));
    }

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
