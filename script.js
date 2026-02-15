/* ============================================================
   Sovra Public Runtime (NFIE-compliant)
   Version: 1.0
   Purpose: Search UI + evidence handling + one-way telemetry
   Non-goals: No enforcement, no interpretive mandates, no collapse control
   ============================================================ */

"use strict";
// Trifold Mirror Protocol — Sovra Diagnostic Overlay
// Version: 1.3 | Includes Contradiction Artifact Flag

const TrifoldMirrorProtocol = {
  evaluateClaim: function(claim) {
    const rigidity = this.checkRigidity(claim);
    const constraint = this.checkConstraint(claim);
    const inspiration = this.checkInspiration(claim);

    const contradictionScore = [rigidity, constraint, inspiration].filter(Boolean).length;

    const isContradictionArtifact = contradictionScore >= 2.5;

    return {
      diagnostics: {
        rigidity,
        constraint,
        inspiration
      },
      metrics: {
        contradictionScore,
        isContradictionArtifact
      }
    };
  },

  checkRigidity: function(claim) {
    return /always|never|unchanging|eternal|absolute/.test(claim.toLowerCase());
  },

  checkConstraint: function(claim) {
    return /must|cannot|only|forbidden|no exceptions/.test(claim.toLowerCase());
  },

  checkInspiration: function(claim) {
    return /no new|final word|unchallengeable|closed/.test(claim.toLowerCase());
  }
};

// Example usage:
const claim = "This is the eternal truth and must never be questioned.";
const result = TrifoldMirrorProtocol.evaluateClaim(claim);
console.log("Trifold Mirror Diagnostic:", result.diagnostics);
console.log("Contradiction Score:", result.metrics.contradictionScore);
console.log("Contradiction Artifact Flag:", result.metrics.isContradictionArtifact);



/* ================================================================
SOVRA GATE SURFACE (Public, inertial, read-only)
================================================================ */
const SOVRA_GATES = Object.freeze({
  welsingFuller: () => !!document.getElementById("modWelsingFuller")?.checked,
  contraCollapse: () => !!document.getElementById("modContraCollapse")?.checked,
  zeroSum: () => !!document.getElementById("modZeroSum")?.checked,
  driftMatrix: () => !!document.getElementById("modDriftMatrix")?.checked,
  rawData: () => !!document.getElementById("toggleRaw")?.checked,
  voice: () => !!document.getElementById("toggleVoice")?.checked
});
const CONTEXT_FRAME_VISIBILITY = {
  ZSE: true,
  DRIFT: true,
  CONTRA: true,
  VOICE: true
};
const ZERO_SUM_TERMS = [
  "take from", "steal", "replace", "erase", "dilute", "threaten", "lose ground",
  "reverse discrimination", "they’re taking", "our jobs", "our schools", "our culture",
  "zero-sum", "finite", "limited", "scarce", "only one", "either/or", "us vs them"
];

function detectZeroSum(inputText) {
  const lowerInput = inputText.toLowerCase();
  const matches = ZERO_SUM_TERMS.filter(term => lowerInput.includes(term));
  return {
    detected: matches.length > 0,
    matches,
    score: matches.length / ZERO_SUM_TERMS.length
  };
}
const ZSE_PAYLOADS = {
  "reverse discrimination": {
    inversion: "Reframes equity as oppression",
    logic: "Encodes zero-sum scarcity (us vs them)",
    camouflage: "Uses fairness language to obscure structural power",
    legalVector: {
      statute: "Title VII, Civil Rights Act (1964)",
      case: "Ames v. Ohio DYS (2025)",
      impact: "Removes evidentiary barrier for majority-group discrimination claims"
    },
    diagnosticNotes: [
      "Flags narrative inversion of historical power asymmetry",
      "Signals contradiction between stated fairness and structural inequity",
      "Functions as a semantic weapon in the white supremacy program"
    ]
  }
};
function runZSEStandalone(inputText) {
  const zs = detectZeroSum(inputText);

  if (!zs.detected) {
    return { detected: false };
  }

  const enriched = zs.matches.map(term => ({
    term,
    payload: ZSE_PAYLOADS[term] || null
  }));

  return {
    detected: true,
    score: zs.score,
    matches: enriched
  };
}

function toggleSemanticIndicators(show) {
  const panel = document.getElementById("semantic-indicators");
  if (!panel) return;

  panel.classList.toggle("hidden", !show);
  panel.setAttribute("aria-hidden", String(!show));
}



/* ============================================================
   CDLM UI Sink (DESCRIPTIVE ONLY)
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {
  window.addEventListener("cdlm:scores", (ev) => {
    const s = ev.detail;

    setText("score-collapse", s.collapse);
    setText("score-contradiction", s.contradiction);
    setText("score-zero-sum", s.zeroSum);

    document
      .getElementById("semantic-indicators")
      ?.classList.remove("hidden");
  });
});

function synthesizeCDLMScores({ zse, trifold, enginesFired }) {
  // Zero‑Sum: 0–3
  const zsMatches = zse?.matches?.length || 0;
  const zeroSum =
    zsMatches >= 6 ? 3 :
    zsMatches >= 3 ? 2 :
    zsMatches >= 1 ? 1 : 0;

  // Contradiction: 0–10 (Trifold signals)
  const tfCount = [trifold?.rigidity, trifold?.constraint, trifold?.inspiration]
    .filter(Boolean).length;

  const contradiction =
    tfCount === 3 ? 10 :
    tfCount === 2 ? 7 :
    tfCount === 1 ? 4 : 0;

  // Collapse: stacking pressure
  const engineCount = Object.values(enginesFired || {}).filter(Boolean).length;

  const collapse = Math.min(
    10,
    engineCount + Math.round(contradiction / 3) + zeroSum
  );

  return { collapse, contradiction, zeroSum };
}

function emitCDLMScores(scores) {
  if (!SOVRA_GATES.contraCollapse()) {
    toggleSemanticIndicators(false);
    return;
  }

  window.dispatchEvent(
    new CustomEvent("cdlm:scores", { detail: scores })
  );
}


/* ============================================================
   CDLM 9×9 CANONICAL MAP (NFIE non-force, inert topology)
   ============================================================ */

const CDLM_MAP_9x9 = Object.freeze({
  version: "0.1",
  shape: Object.freeze({ rows: 9, cols: 9 }),

  rows: Object.freeze([
    "Economics",
    "Education",
    "Entertainment",
    "Labor",
    "Law",
    "Politics",
    "Religion",
    "Sex",
    "War"
  ]),

  cols: Object.freeze([
    "BranchingPattern",
    "ConnectionDensity",
    "RoutingTopology",
    "FlowBehavior",
    "OutputSymptom",
    "DefensiveReaction",
    "MemeReplication",
    "CulturalEvolutionPressure",
    "NetworkContagionDynamics"
  ]),

  grid: Object.freeze(
    Array.from({ length: 9 }, () =>
      Object.freeze(Array.from({ length: 9 }, () => Object.freeze({})))
    )
  )
});

/* ============================================================
   CDLM SCANNER STUBS (PRE-STAGED, READ-ONLY)
   ============================================================ */

const CDLM_SCANNERS = Object.freeze({
  BranchingPattern: scanBranchingPattern,
  ConnectionDensity: scanConnectionDensity,
  RoutingTopology: scanRoutingTopology,
  FlowBehavior: scanFlowBehavior,
  OutputSymptom: scanOutputSymptom,
  DefensiveReaction: scanDefensiveReaction,
  MemeReplication: scanMemeReplication,
  CulturalEvolutionPressure: scanCulturalEvolutionPressure,
  NetworkContagionDynamics: scanNetworkContagionDynamics
});
function scanBranchingPattern(_text, _map) {
  return { count: 0 };
}

function scanConnectionDensity(_text, _map) {
  return { count: 0 };
}

function scanRoutingTopology(_text, _map) {
  return { count: 0 };
}

function scanFlowBehavior(_text, _map) {
  return { count: 0 };
}

function scanOutputSymptom(_text, _map) {
  return { count: 0 };
}

function scanDefensiveReaction(_text, _map) {
  return { count: 0 };
}

function scanMemeReplication(_text, _map) {
  return { count: 0 };
}

function scanCulturalEvolutionPressure(_text, _map) {
  return { count: 0 };
}

function scanNetworkContagionDynamics(_text, _map) {
  return { count: 0 };
}


/* ============================================================
   CDLM GROUP ENTRY (PRE-STAGED, READ-ONLY)
   - Collects scanner observations only
   - No aggregation, no scoring, no UI, no side effects
   ============================================================ */

function runCDLMGroup(inputText, map9x9, caller = "core_diagnostic_map") {
  if (!caller) return null;

  const text = String(inputText || "");
  const map = map9x9 || null;

  const observations = {};
  for (const [colName, scannerFn] of Object.entries(CDLM_SCANNERS)) {
    try {
      observations[colName] = scannerFn(text, map);
    } catch (_) {
      observations[colName] = { count: 0 };
    }
  }

  return Object.freeze({
    caller,
    observations
  });
}

/* ============================================================
   CDLM FIRST TRAVERSAL (READ-ONLY, MANUAL INVOCATION)
   ============================================================ */

function traverseCDLM(text, caller = "core_diagnostic_map") {
  return runCDLMGroup(text, CDLM_MAP_9x9, caller);
}

/* ============================================================
   CDLM ROW-AWARE TRAVERSAL (READ-ONLY)
   - Walks 9×9 coordinates
   - No aggregation, no scoring, no UI
   ============================================================ */

function traverseCDLMGrid(text, caller = "core_diagnostic_map") {
  const map = CDLM_MAP_9x9;
  const results = [];

  for (let r = 0; r < map.rows.length; r++) {
    const rowName = map.rows[r];

    for (let c = 0; c < map.cols.length; c++) {
      const colName = map.cols[c];
      const scanner = CDLM_SCANNERS[colName];

      let observation = { count: 0 };
      try {
        observation = scanner(text, map);
      } catch (_) {}

      results.push({
        row: rowName,
        col: colName,
        observation
      });
    }
  }

  return Object.freeze({
    caller,
    grid: Object.freeze(results)
  });
}
/* ============================================================
   CDLM ROW-AWARE TRAVERSAL (READ-ONLY)
   - Walks 9×9 coordinates
   - No aggregation, no scoring, no UI
   ============================================================ */

function traverseCDLMGrid(text, caller = "core_diagnostic_map") {
  const map = CDLM_MAP_9x9;
  const results = [];

  for (let r = 0; r < map.rows.length; r++) {
    const rowName = map.rows[r];

    for (let c = 0; c < map.cols.length; c++) {
      const colName = map.cols[c];
      const scanner = CDLM_SCANNERS[colName];

      let observation = { count: 0 };
      try {
        observation = scanner(text, map);
      } catch (_) {}

      results.push({
        row: rowName,
        col: colName,
        observation
      });
    }
  }

  return Object.freeze({
    caller,
    grid: Object.freeze(results)
  });
}

/* ============================================================
   0) Public memory (local, non-authoritative)
   ============================================================ */
const sovraMemory = [];

/* ============================================================
   1) One-way telemetry channel (Public → Core)
   - Public can send signals/logs upward.
   - Public cannot receive directives that alter runtime behavior.
   ============================================================ */
const SovraSyncTrigger = Object.freeze({
  send(signal) {
    try {
      // Replace with your real endpoint if you want
      // fetch("/api/sync", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(signal) });
      console.log("[SYNC → CORE]", signal);
    } catch (_) {
      // telemetry failure is non-fatal in public runtime
    }
  }
});

/* ============================================================
   2) Safety utilities
   ============================================================ */
function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
function escapeAttr(s) {
  return escapeHtml(s);
}

/* ============================================================
   3) Minimal deterministic drift logger (LOGGING ONLY)
   - No overrides, no enforcement, no thresholds that change behavior.
   ============================================================ */
window.Sovra = window.Sovra || {};
Sovra.drift = (function () {
  let seed = 1;

  function setSeed(s) {
    seed = s | 0;
  }

  function hashStr(s) {
    let h = seed || 2166136261;
    for (let i = 0; i < s.length; i++) {
      h = (h ^ s.charCodeAt(i)) * 16777619;
      h |= 0;
    }
    return Math.abs(h);
  }

  function logVector(vector, context = { domain: "default", source: "" }) {
    const vectorHash = hashStr(JSON.stringify(vector || []));
    const rec = { type: "drift_log", seed, context, vectorHash, t: Date.now() };
    (Sovra.audit = Sovra.audit || []).push(rec);
    SovraSyncTrigger.send({ kind: "DRIFT_LOG", ...rec });
    return rec;
  }

  return Object.freeze({ setSeed, logVector });
})();

/* ============================================================
   4) Evidence parsing helpers (DESCRIPTIVE ONLY)
   ============================================================ */
function mapPowerStructure(_url) {
  return "UNMAPPED";
}
function detectFramingSyntax(_text) {
  return [];
}

function parseLegalText(text) {
  const exclusionPatterns = [
    /negro|colored|mulatto|non-white|nonwhite/gi,
    /undesirable|unfit|incorrigible|delinquent/gi,
    /moral turpitude|immoral conduct|indecent/gi,
    /segregated|separate but equal|racial integrity/gi,
    /custody preference|family preservation|traditional values/gi
  ];

  const findings = exclusionPatterns
    .map((pattern, index) => {
      const matches = text.match(pattern);
      return matches
        ? `Pattern ${index + 1}: ${matches.length} match(es) → ${pattern}`
        : null;
    })
    .filter(Boolean);

  return findings.length ? findings.join("\n") : "No exclusion patterns detected.";
}

function classifyActivity(text) {
  const categories = {
    LAW: ["court", "legal", "statute", "justice", "discrimination", "civil rights", "housing law"]
  };

  const t = (text || "").toLowerCase();
  for (const category in categories) {
    for (const kw of categories[category]) {
      if (t.includes(kw)) return category;
    }
  }
  return "OTHER";
}

function detectBias(_text) {
  // Descriptive placeholder. Must not enforce an interpretive lens in public runtime.
  return ["unspecified"];
}

function compareNarratives(sourceA, sourceB) {
  const extract = (r) => ({
    title: r.title,
    snippet: r.snippet || "No snippet",
    link: r.link,
    domain: classifyActivity(`${r.title} ${r.snippet}`),
    bias: detectBias(`${r.title} ${r.snippet}`),
    power: mapPowerStructure(r.link),
    syntax: detectFramingSyntax(`${r.title} ${r.snippet}`)
  });

  const a = extract(sourceA);
  const b = extract(sourceB);

  return (
    `Narrative Comparator:\n\n` +
    `Source A: ${a.title}\nDomain: ${a.domain}\nBias: ${a.bias.join(", ") || "None"}\nPower: ${a.power}\nSyntax: ${a.syntax.join(", ") || "None"}\n\n` +
    `Source B: ${b.title}\nDomain: ${b.domain}\nBias: ${b.bias.join(", ") || "None"}\nPower: ${b.power}\nSyntax: ${b.syntax.join(", ") || "None"}\n`
  );
}

function compareDocuments() {
  const doc1 = document.getElementById("doc1")?.value || "";
  const doc2 = document.getElementById("doc2")?.value || "";
  const results = document.getElementById("results");
  if (!results) return;

  const findings1 = parseLegalText(doc1).split("\n");
  const findings2 = parseLegalText(doc2).split("\n");
  const sharedPatterns = findings1.filter((f) => findings2.includes(f));

  results.innerText =
    `Document 1 Findings:\n${findings1.join("\n")}\n\n` +
    `Document 2 Findings:\n${findings2.join("\n")}\n\n` +
    (sharedPatterns.length
      ? `Shared Patterns Detected:\n${sharedPatterns.join("\n")}`
      : "No shared exclusion patterns found.");
}

window.compareDocuments = compareDocuments;
document.getElementById("toggleVoice").addEventListener("change", () => {
  NFIE.registerUserAction("toggleVoice");
});

/* ============================================================
   5) UI behavior: provenance toggle + hash copy (deduped)
   ============================================================ */
document.addEventListener("click", (e) => {
const provBtn = e.target.closest
  ? e.target.closest(".expand-provenance")
  : null;
  if (provBtn) {
    const panel = document.getElementById(provBtn.getAttribute("aria-controls"));
    const expanded = provBtn.getAttribute("aria-expanded") === "true";
    provBtn.setAttribute("aria-expanded", String(!expanded));
    if (panel) panel.hidden = expanded;
    return;
  }

  const hashBtn = e.target.closest
  ? e.target.closest(".hash-btn")
  : null;
  if (hashBtn) {
    const hash = hashBtn.dataset.hash || "";
    if (navigator.clipboard && hash) {
      navigator.clipboard.writeText(hash).then(
        () => {
          const prev = hashBtn.textContent;
          hashBtn.textContent = "Copied";
          setTimeout(() => {
            hashBtn.textContent = prev;
          }, 1200);
        },
        () => {
          const prev = hashBtn.textContent;
          hashBtn.textContent = "Copied";
          setTimeout(() => {
            hashBtn.textContent = prev;
          }, 1200);
        }
      );
    }
  }
});

function renderZSEStandalone(result) {
  if (!result.detected) return;

  const container = document.querySelector(".results-left");
  if (!container) return;

  const block = document.createElement("section");
  block.className = "zse-block";


  block.innerHTML = `
    <h3>Zero‑Sum Narrative Detected</h3>
    ${result.matches.map(m => `
      <div class="zse-term">
        <strong>${m.term}</strong>
        ${m.payload ? `
          <ul>
            <li>${m.payload.inversion}</li>
            <li>${m.payload.logic}</li>
            <li>${m.payload.camouflage}</li>
          </ul>
        ` : ""}
      </div>
    `).join("")}
  `;

  container.prepend(block);
}
/* ============================================================
   Structural expectation baseline (DESCRIPTIVE ONLY)
   ============================================================ */
const EXPECTED_STRUCTURAL_CLASSES = Object.freeze([
  "systemic",
  "historical",
  "legal",
  "economic",
  "mechanistic"
]);

/* ============================================================
   Visibility Diagnostics Unit (VDU)
   VAP + PCA + TUUR — Public Runtime (NFIE-safe)
   ============================================================ */

const VDU = (function () {

  function inferStructuralClasses(results) {
    const found = new Set();

    results.forEach(r => {
      const text = `${r.title || ""} ${r.snippet || ""}`.toLowerCase();

      if (text.includes("system") || text.includes("structure")) found.add("systemic");
      if (text.includes("history") || text.includes("historical")) found.add("historical");
      if (text.includes("law") || text.includes("legal") || text.includes("court")) found.add("legal");
      if (text.includes("econom") || text.includes("market")) found.add("economic");
      if (text.includes("mechanism") || text.includes("process")) found.add("mechanistic");
    });

    return Array.from(found);
  }

  function computePCA(expected, surfaced) {
    const missing = expected.filter(e => !surfaced.includes(e));
    const score = expected.length
      ? missing.length / expected.length
      : 0;

    return {
      expected,
      surfaced,
      missing,
      score
    };
  }

  function render(pca) {
    if (!pca.missing.length) return null;

    const block = document.createElement("section");
    block.className = "vdu-block";

    block.innerHTML = `
      <h3>Visibility Diagnostic</h3>
      <p>
        Several structurally relevant explanations did not appear in the surfaced results.
      </p>
      <p>
        Perceptual Complement Analysis indicates a ${
          pca.score > 0.66 ? "high" :
          pca.score > 0.33 ? "moderate" : "low"
        } omission pattern at this resolution.
      </p>
      <p>
        This observation is consistent with visibility attenuation, a stability‑preserving behavior
        where encounter probability can be reduced without suppression.
      </p>
      <p class="vdu-context">
        Such patterns are commonly associated with homeostatic coherence preservation in complex systems.
      </p>
    `;

    return block;
  }

  return {
    run(results) {
      const expected = EXPECTED_STRUCTURAL_CLASSES;
      const surfaced = inferStructuralClasses(results);
      const pca = computePCA(expected, surfaced);
      return render(pca);
    }
  };

})();

/* ============================================================
   Welsing–Fuller Query Rewrite (METHOD-LEVEL, IMMUTABLE)
   ============================================================ */

function applyWFEQueryRewrite(originalQuery) {
  // Core query remains intact
  const core = originalQuery;

  // Functional index expansion (library drawer widening)
  const functionalScopes = [
    "power systems",
    "dominance maintenance",
    "structural control",
    "resource allocation",
    "population management"
  ];

  // Cross-index traversal (misfiled cards)
  const crossDomains = [
    "law",
    "economics",
    "education",
    "criminal justice",
    "housing policy",
    "language policy"
  ];

  // Language normalization (dominant-code bypass)
  const functionalEquivalents = [
    "structural racism",
    "systemic inequality",
    "institutional power",
    "racial hierarchy",
    "policy outcomes"
  ];

  return {
    rewrittenQuery: [
      core,
      ...functionalScopes,
      ...crossDomains,
      ...functionalEquivalents
    ].join(" | "),
    meta: {
      method: "Welsing–Fuller",
      scope: "expanded",
      depth: "full-drawer",
      languageMode: "functional"
    }
  };
}

/* ============================================================
   6) Public search runtime (NO interpretive enforcement)
   ============================================================ */
window.searchSovra = async function () {
  const results = document.querySelector(".results-left");

  try {
 let query = (document.getElementById("query")?.value || "").trim();
const compareRaw = document.getElementById("toggleRaw")?.checked || false;

if (!results) return;

if (!query) {
  results.innerText = "Sovra requires a query to proceed.";
  return;
}

let wfeMeta = null;

if (SOVRA_GATES.welsingFuller()) {
  const rewritten = applyWFEQueryRewrite(query);
  query = rewritten.rewrittenQuery;
  wfeMeta = rewritten.meta;
}


    // Local, non-authoritative memory (for UI continuity only)
    sovraMemory.push({
      query,
      timestamp: new Date().toISOString(),
      domains: [],
      biasFlags: [],
      powerTags: [],
      syntaxFlags: []
    });

    // One-way telemetry (public → core)
    SovraSyncTrigger.send({
      kind: "QUERY",
      query,
      raw: compareRaw,
      ts: new Date().toISOString()
    });

    const zeroSumOn = SOVRA_GATES.zeroSum() ? "1" : "0";

const wfeOn = SOVRA_GATES.welsingFuller() ? "1" : "0";

const endpoint =
  `/api/search?q=${encodeURIComponent(query)}&raw=${compareRaw}&zse=${zeroSumOn}&wfe=${wfeOn}`;


    const response = await fetch(endpoint);
  const contentType = response.headers.get("content-type") || "";

if (!contentType.includes("application/json")) {
  const text = await response.text();
  throw new Error("Upstream returned non-JSON: " + text.slice(0, 120));
}

const data = await response.json();

const diagnostics = {
  zse: data.zse || null,
  trifold: TrifoldMirrorProtocol.evaluateClaim(query).diagnostics,
  enginesFired: {
    zse: SOVRA_GATES.zeroSum(),
    contra: SOVRA_GATES.contraCollapse(),
    drift: SOVRA_GATES.driftMatrix(),
    welsing: SOVRA_GATES.welsingFuller(),
    voice: SOVRA_GATES.voice()
  }
};

const scores = synthesizeCDLMScores(diagnostics);
emitCDLMScores(scores);


    // Render Zero‑Sum block once per query
    if (SOVRA_GATES.zeroSum() && data.zse) {
      renderZSEStandalone(data.zse);
    }

    results.innerHTML = `<div class="section-label">Search results</div>`;

    const list = Array.isArray(data.organic_results) ? data.organic_results : [];
    if (!list.length) {
      results.innerHTML += `<div class="empty">No results found.</div>`;
      SovraSyncTrigger.send({ kind: "NO_RESULTS", query });
      return;
    }
const vduBlock = VDU.run(list);
if (vduBlock) results.appendChild(vduBlock);

    list.forEach((r, i) => {
      const card = document.createElement("article");
      card.className = "sovra-card";

      const provId = `prov-${i + 1}`;
      const titleId = `card-title-${i + 1}`;
      const hash = r.hash || ("0x" + String(r.link || "").slice(-6));

      let host = "unknown";
      try {
        host = r.link ? new URL(r.link).hostname : "unknown";
      } catch (_) {
        host = "unknown";
      }

      const excerptText =
        r.full_text ||
        r.rich_snippet ||
        r.snippet ||
        "";

      card.innerHTML = `
        <header class="card-head">
          <h3 id="${titleId}" class="card-title">${escapeHtml(r.title)}</h3>
          <div class="card-meta">
            <time class="card-ts" datetime="${new Date().toISOString()}">${new Date().toISOString()}</time>
            <button class="hash-btn" aria-label="Copy canonical hash" data-hash="${escapeAttr(hash)}">
              ${escapeHtml(hash.slice(0, 6))}…
            </button>
          </div>
        </header>

        <section class="card-body">
          <div class="source-id">Source — ${escapeHtml(host)}</div>
         ${Array.isArray(r.predicate) ? r.predicate
  .filter(p => CONTEXT_FRAME_VISIBILITY[p.engine] !== false)
  .map(p => `
    <div class="predicate-context" data-engine="${escapeAttr(p.engine)}">
      <strong>${escapeHtml(p.engine)} Context</strong>
      <p>${escapeHtml(p.explanation)}</p>
    </div>
  `).join("") : ""}

          <pre class="raw-excerpt" tabindex="0">${escapeHtml(excerptText)}</pre>

        <footer class="card-foot">
          <div class="mirrors">
            Mirrors: <span class="mirrors-count">${escapeHtml(String(r.mirrors || 0))}</span>
          </div>
          <div class="tamper-flag" aria-live="polite" role="status">OK</div>
          <button class="expand-provenance" aria-expanded="false" aria-controls="${provId}">
            Provenance
          </button>
        </footer>

        <div id="${provId}" class="provenance-panel" hidden>
          <pre class="signed-manifest">${escapeHtml(
            JSON.stringify({
              query_token: data.query_token || "",
              retrieval_predicate: r.predicate || "",
              signature: r.signature || ""
            })
          )}</pre>
          <details>
            <summary>Retrieval predicate</summary>
            <code>${escapeHtml(r.predicate || "predicate: unknown")}</code>
          </details>
          <a class="card-link" href="${escapeAttr(r.link)}" target="_blank" rel="noopener">
            View Source
          </a>
        </div>
      `;

      if (SOVRA_GATES.voice()) {
        NFIE.validateStateTransition("SovraVoice");
        const excerpt = card.querySelector(".raw-excerpt");
        if (excerpt) {
          excerpt.textContent = applySovraVoice(excerpt.textContent);
          card.classList.add("voice-enabled");
        }
      }

      results.appendChild(card);
    });
const provPanel = document.querySelector(".provenance-panel");
if (provPanel && vduBlock) {
  provPanel.prepend(vduBlock);
}

    // Optional comparator (descriptive)
    if (list.length >= 2) {
      const comparison = compareNarratives(list[0], list[1]);
      SovraSyncTrigger.send({ kind: "COMPARISON", query, comparison });
    }

    // Optional drift log (pure telemetry)
    Sovra.drift.logVector([list.length, Number(list[0]?.confidence || 0)], {
      domain: "retrieval",
      source: "public_search"
    });

    SovraSyncTrigger.send({
      kind: "SEARCH_OK",
      query,
      count: list.length
    });

  } catch (error) {
    if (results) {
      results.innerText = "Search error.";
    }
    console.error("Sovra fetch error:", error);
    SovraSyncTrigger.send({
      kind: "FETCH_ERROR",
      query: String(error?.query || ""),
      error: String(error)
    });
  }
};

console.log("searchSovra() loaded (NFIE public runtime).");
document.addEventListener("DOMContentLoaded", () => {
  const contextFrameList = document.querySelector(".context-frame-list");
  if (!contextFrameList) return;

  Object.keys(CONTEXT_FRAME_VISIBILITY).forEach(engine => {
    const label = document.createElement("label");
    label.className = "context-frame-toggle";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = CONTEXT_FRAME_VISIBILITY[engine];

    checkbox.addEventListener("change", () => {
      CONTEXT_FRAME_VISIBILITY[engine] = checkbox.checked;
      searchSovra(); // re-render via existing pipeline
    });

    label.appendChild(checkbox);
    label.append(` ${engine}`);
    contextFrameList.appendChild(label);
  });
});
