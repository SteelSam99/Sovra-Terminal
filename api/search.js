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
// === ZSE MODULE ===
const ZERO_SUM_TERMS = [
  "take from", "steal", "replace", "erase", "dilute", "threaten", "lose ground",
  "reverse discrimination", "they’re taking", "our jobs", "our schools", "our culture",
  "zero-sum", "finite", "limited", "scarce", "only one", "either/or", "us vs them"
];

const AUTHORIZED_CALLERS = new Set(["cdlm", "cpm", "mutation_drift", "pws_tracker", "sdm_core"]);

function detectZeroSum(inputText, caller = null) {
  if (caller && !AUTHORIZED_CALLERS.has(caller)) {
    throw new Error(`ZSE Access Denied: Unauthorized caller '${caller}'`);
  }
  const lowerInput = inputText.toLowerCase();
  const matches = ZERO_SUM_TERMS.filter(term => lowerInput.includes(term));
  return {
    detected: matches.length > 0,
    matches,
    score: matches.length / ZERO_SUM_TERMS.length
  };
}

// === CDLM MODULE ===
const CDLM = {
  id: "module-cdlm",
  authorizedCallers: new Set(["core_diagnostic_map", "mutation_drift"]),
  LEXICON: {
    Economics: ["money", "capital", "wealth", "poverty", "market", "trade"],
    Education: ["school", "curriculum", "history", "knowledge", "teach", "learn"],
    Entertainment: ["film", "music", "celebrity", "media", "narrative", "spectacle"],
    Labor: ["job", "work", "employment", "union", "wage", "exploitation"],
    Law: ["justice", "crime", "court", "legal", "punishment", "rights"],
    Politics: ["government", "policy", "election", "power", "state", "ideology"],
    Religion: ["church", "faith", "morality", "sin", "ritual", "god"],
    Sex: ["desire", "fetish", "porn", "gender", "intimacy", "taboo"],
    "War/Counter-War": ["military", "violence", "resistance", "conflict", "colonialism"],
    Race: ["racism", "white", "black", "color", "supremacy", "discrimination"]
  },
  parseInput: function(userInput, caller = "cdlm") {
    if (!this.authorizedCallers.has(caller)) {
      throw new Error(`CDLM Access Denied: Unauthorized caller '${caller}'`);
    }
    const domainHits = {};
    for (const [domain, keywords] of Object.entries(this.LEXICON)) {
      for (const word of keywords) {
        if (userInput.toLowerCase().includes(word)) {
          domainHits[domain] = (domainHits[domain] || 0) + 1;
        }
      }
    }
    return domainHits;
  },
  generateMap: function(domainHits) {
    const activeDomains = Object.keys(domainHits);
    console.log("\n[CDLM] Active Domains Detected:");
    activeDomains.forEach(d => console.log(` - ${d} (${domainHits[d]} hits)`));
    console.log("\n[CDLM] Domain Intersection Matrix:");
    for (let i = 0; i < activeDomains.length; i++) {
      for (let j = i + 1; j < activeDomains.length; j++) {
        console.log(` - ${activeDomains[i]} × ${activeDomains[j]}`);
      }
    }
  },
  scoreContradiction: function(domains) {
    return domains.length >= 2 ? domains.length + 3 : domains.length;
  },
  runZSEifNeeded: function(inputText, contradictionScore, caller = "cdlm", threshold = 5) {
    if (contradictionScore >= threshold) {
      try {
        const zs = detectZeroSum(inputText, caller);
        console.log(`\n[ZSE] Zero-Sum Detected: ${zs.detected}`);
        if (zs.detected) {
          console.log(`[ZSE] Matches: ${zs.matches.join(", ")}`);
          console.log(`[ZSE] Score: ${zs.score.toFixed(2)}`);
        }
        return zs;
      } catch (err) {
        console.error(`[ZSE] Access Error: ${err.message}`);
      }
    }
    return null;
  }
};
// === CPM MODULE ===
const CPM = {
  id: "module-cpm",
  authorizedCallers: new Set(["core_diagnostic_map", "mutation_drift"]),
  MATRIX: {
    ["Economics", "Labor"]: 4,
    ["Economics", "Sex"]: 5,
    ["Law", "Sex"]: 5,
    ["Religion", "Sex"]: 5,
    ["Politics", "Entertainment"]: 4,
    ["Education", "Law"]: 3,
    ["War/Counter-War", "Economics"]: 4,
    ["Religion", "Politics"]: 3,
    ["Entertainment", "Race"]: 4,
    ["Law", "Race"]: 5,
    ["Education", "Race"]: 4,
    ["Sex", "Race"]: 5,
    ["Politics", "Race"]: 5,
    ["Religion", "Race"]: 4,
    ["War/Counter-War", "Race"]: 5
  },
  scoreContradiction: function(domains, caller = "cpm") {
    if (!this.authorizedCallers.has(caller)) {
      throw new Error(`CPM Access Denied: Unauthorized caller '${caller}'`);
    }
    let score = 0;
    for (let i = 0; i < domains.length; i++) {
      for (let j = i + 1; j < domains.length; j++) {
        const pair = [domains[i], domains[j]];
        const reverse = [domains[j], domains[i]];
        score += this.MATRIX[pair] || this.MATRIX[reverse] || 0;
      }
    }
    return score;
  }
};

// === PWS TRACKER MODULE ===
const PWSTracker = {
  id: "module-pws_tracker",
  authorizedCallers: new Set(["core_diagnostic_map"]),
  detectPhase: function(systemIndicators, caller = "pws_tracker") {
    if (!this.authorizedCallers.has(caller)) {
      throw new Error(`PWS Tracker Access Denied: Unauthorized caller '${caller}'`);
    }
    const phaseOrder = ["inception", "implementation", "enforcement", "domination", "maintenance"];
    for (const phase of phaseOrder) {
      if (systemIndicators[phase]) return phase;
    }
    return "undetermined";
  }
};

// === SDM CORE MODULE ===
const SDMCore = {
  id: "module-sdm_core",
  authorizedCallers: new Set(["core_diagnostic_map"]),
  weights: {
    foundational_alignment: 0.25,
    institutional_access: 0.20,
    narrative_control: 0.15,
    violence_modality: 0.15,
    entropy_flow: 0.15,
    symbolic_capital: 0.10
  },
  calculateScore: function(systemProfile, caller = "sdm_core") {
    if (!this.authorizedCallers.has(caller)) {
      throw new Error(`SDM Core Access Denied: Unauthorized caller '${caller}'`);
    }
    let score = 0.0;
    for (const [key, weight] of Object.entries(this.weights)) {
      const value = systemProfile[key] || 0.0;
      score += value * weight;
    }
    return parseFloat(score.toFixed(3));
  }
};

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
  zse,
  cdlm: cdlmTelemetry
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
