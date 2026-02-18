/* ============================================================
   Sovra Public Runtime (NFIE-compliant)
   Version: 1.0
   Purpose: Search UI + evidence handling + one-way telemetry
   Non-goals: No enforcement, no interpretive mandates, no collapse control
   ============================================================ */

"use strict";
"use strict";

window.Sovra = window.Sovra || {};

/* ============================================================
   DRIFT GATE (Authoritative, single source of truth)
   ============================================================ */

window.Sovra.DriftGate = window.Sovra.DriftGate || Object.freeze({
  getEnabled: () => {
    const ids = ["ctx-drift", "DRIFT", "drift", "drift-checkbox", "toggle-drift"];
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el && typeof el.checked === "boolean") return !!el.checked;
    }
    return false;
  }
});

/* ============================================================
   Trifold Mirror Protocol — Sovra Diagnostic Overlay
   ============================================================ */

const TrifoldMirrorProtocol = {
  evaluateClaim: function (claim) {
    const rigidity = this.checkRigidity(claim);
    const constraint = this.checkConstraint(claim);
    const inspiration = this.checkInspiration(claim);

    const contradictionScore =
      [rigidity, constraint, inspiration].filter(Boolean).length;

    const isContradictionArtifact = contradictionScore >= 2.5;

    return {
      diagnostics: { rigidity, constraint, inspiration },
      metrics: { contradictionScore, isContradictionArtifact }
    };
  },
  ...
};

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
/* ============================================================
   PublicTextFetcher (STUB — inactive)
   Installed but not enabled to preserve platform trust boundary.
   ============================================================ */

window.Sovra = window.Sovra || {};
window.Sovra.PublicTextFetcher = Object.freeze({
  fetch() {
    throw new Error("PublicTextFetcher is installed but not enabled.");
  },
  config: Object.freeze({})
});

document.addEventListener("DOMContentLoaded", () => {

  const contextToggle = document.getElementById("contextControlToggle");
  const contextPanel = document.getElementById("contextControlPanel");
  const closeContextPanel = document.getElementById("closeContextPanel");

  if (contextToggle && contextPanel) {
    contextToggle.addEventListener("click", () => {
      contextPanel.classList.remove("hidden");
    });
  }

  if (closeContextPanel && contextPanel) {
    closeContextPanel.addEventListener("click", () => {
      contextPanel.classList.add("hidden");

      const contextState = {
        rawData: document.getElementById("rawData")?.checked ?? false,
        collapseContra: document.getElementById("collapseContra")?.checked ?? false,
        zeroSum: document.getElementById("zeroSum")?.checked ?? false,
        welsingFuller: document.getElementById("welsingFuller")?.checked ?? false,
        driftCore: document.getElementById("driftCore")?.checked ?? false,
        sovraSpeaks: document.getElementById("sovraSpeaks")?.checked ?? false
      };

      // optional: persist or log contextState here
    });
  }

});


/* ================================================================
   SOVRA GATE SURFACE (Public, inertial, read-only)
   ================================================================ */

const SOVRA_GATES = Object.freeze({
  zeroSum: () =>
  !!document.getElementById("zeroSum")?.checked,


contraCollapse: () =>
  !!document.getElementById("collapseContra")?.checked,


driftCore: () =>
  !!document.getElementById("driftCore")?.checked,


welsingFuller: () =>
  !!document.getElementById("welsingFuller")?.checked,


  rawData: () =>
    !!document.getElementById("toggleRaw")?.checked,

  sovraSpeaks: () =>
    !!document.getElementById("toggleSovraSpeaks")?.checked
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
/* ============================================================
   Unified Drift Core Engine (NFIE-compliant, user-gated)
   Built from:
     - DoD Drift Engine (monitor terms + contradiction signals; NO triggers)
     - Drift Core Engine (MutationDrift diagnostics; NO vector scoring/containment)
   Activation:
     - ONLY runs when user enables DRIFT checkbox (configurable getter)
   Output:
     - Emits descriptive-only payloads for GUI synthesis (no prewritten narratives)
   ============================================================ */

/* =========================
   0) Gate: DRIFT checkbox
   ========================= */

function defaultGetDriftEnabled() {
  // Try common IDs—override via config for exact wiring.
  const ids = ["ctx-drift", "DRIFT", "drift", "drift-checkbox", "toggle-drift"];
  for (const id of ids) {
    const el = document.getElementById(id);
    if (el && typeof el.checked === "boolean") return !!el.checked;
  }
  return false;
}

function requireDriftEnabled(getDriftEnabled) {
  const ok = !!(getDriftEnabled && getDriftEnabled());
  return ok;
}

/* =========================
   1) DoD Drift Lens (NFIE)
   - No thresholds
   - No triggers
   - No module activation
   ========================= */

const DoD_DriftLens = Object.freeze({
  id: "DOD_DRIFT_001",
  scope: "legal, educational, institutional systems",
  active: true,

  monitor: Object.freeze({
    inputs: Object.freeze([
      "case_law.references",
      "policy_documents",
      "curriculum_standards",
      "institutional_statements",
      "media_legitimacy_claims"
    ]),
    scan_terms: Object.freeze([
      "Doctrine of Discovery",
      "Johnson v. M’Intosh",
      "terra nullius",
      "plenary power",
      "federal trust responsibility",
      "domestic dependent nation",
      "Christian dominion",
      "civilizing mission",
      "manifest destiny"
    ]),
    contradiction_signals: Object.freeze([
      Object.freeze({ claim: "equality", behavior: "denial of Indigenous land title or sovereignty" }),
      Object.freeze({ claim: "religious freedom", behavior: "legal privileging of Christian doctrine in land or sovereignty claims" }),
      Object.freeze({ claim: "rule of law", behavior: "use of colonial-era precedents to deny Indigenous rights" })
    ])
  }),

  // NFIE: descriptive-only extraction helpers
  extractSignals(text) {
    const t = String(text || "");
    const hits = [];

    for (const term of this.monitor.scan_terms) {
      if (t.toLowerCase().includes(term.toLowerCase())) hits.push({ type: "TERM", value: term });
    }

    // Very light, non-deterministic “claim/behavior” co-presence check
    for (const s of this.monitor.contradiction_signals) {
      const claimHit = t.toLowerCase().includes(String(s.claim).toLowerCase());
      const behaviorHit = t.toLowerCase().includes(String(s.behavior).toLowerCase());
      if (claimHit || behaviorHit) {
        hits.push({
          type: "SIGNAL",
          claim: s.claim,
          behavior: s.behavior,
          present: { claim: claimHit, behavior: behaviorHit }
        });
      }
    }

    return hits;
  }
});

/* =========================
   2) MutationDrift Diagnostics (NFIE)
   - Keep math + entropy tools
   - Remove vector scoring / containment
   ========================= */

const MutationDrift = Object.freeze({
  id: "module-mutation_drift",
  authorizedCallers: new Set(["unified_drift_core", "core_diagnostic_map"]),

  // Viral Load Formula (kept as math utility; not used to assert causality)
  R: (Bv, Cv, P, I, T) => (Bv + Cv) * P * I * T,

  // Narrative Entropy (Shannon)
  Hn: function (narrativeSet, caller = "unified_drift_core") {
    if (!this.authorizedCallers.has(caller)) {
      throw new Error(`MutationDrift Access Denied: Unauthorized caller '${caller}'`);
    }
    const arr = Array.isArray(narrativeSet) ? narrativeSet : [];
    const total = arr.reduce((a, b) => a + b, 0);
    if (!total) return 0;
    return -arr
      .map(p => p / total)
      .reduce((sum, p) => sum + (p * Math.log2(p)), 0);
  },

  // Ideological Drift Index (kept as neutral averaging utility)
  IDI: function (rhetoric, policy, polling, caller = "unified_drift_core") {
    if (!this.authorizedCallers.has(caller)) {
      throw new Error(`MutationDrift Access Denied: Unauthorized caller '${caller}'`);
    }
    return (Number(rhetoric) + Number(policy) + Number(polling)) / 3;
  },

  // Symbolic Saturation Load (neutral multiplicative utility)
  Sigma: function (mediaFreq, valence, segmentation, caller = "unified_drift_core") {
    if (!this.authorizedCallers.has(caller)) {
      throw new Error(`MutationDrift Access Denied: Unauthorized caller '${caller}'`);
    }
    return Number(mediaFreq) * Number(valence) * Number(segmentation);
  },

  // Emotional Thermocline (ratio utility)
  Theta: function (traumaDepth, emotionalAccess, caller = "unified_drift_core") {
    if (!this.authorizedCallers.has(caller)) {
      throw new Error(`MutationDrift Access Denied: Unauthorized caller '${caller}'`);
    }
    const denom = Number(emotionalAccess);
    if (!denom) return 0;
    return Number(traumaDepth) / denom;
  }
});

/* =========================
   3) PWS Phase Tracker (kept)
   ========================= */

function detectPWSPhase(systemIndicators) {
  const phaseOrder = ["inception", "implementation", "enforcement", "domination", "maintenance"];
  const s = systemIndicators || {};
  for (const phase of phaseOrder) {
    if (s[phase]) return phase;
  }
  return "undetermined";
}

/* =========================
   4) Unified Drift Core
   - User-gated
   - Event-driven
   - Descriptive-only payloads
   ========================= */

function createUnifiedDriftCore({
  getDriftEnabled = defaultGetDriftEnabled,
  emitEventName = "drift:core",
  trifoldProtocol = null // optional: if you already have it on window
} = {}) {
  function trifoldLabel(text) {
    if (!trifoldProtocol || typeof trifoldProtocol.evaluateClaim !== "function") {
      return { rigidity: false, constraint: false, inspiration: false };
    }
    try {
      const r = trifoldProtocol.evaluateClaim(String(text || ""));
      return r?.diagnostics || { rigidity: false, constraint: false, inspiration: false };
    } catch (_) {
      return { rigidity: false, constraint: false, inspiration: false };
    }
  }

  function analyzeText({ text = "", domain = "UNSPECIFIED", meta = {} } = {}) {
    if (!requireDriftEnabled(getDriftEnabled)) {
      return Object.freeze({ ok: false, gated: true, reason: "DRIFT_DISABLED" });
    }

    const t = String(text || "");
    const dod = DoD_DriftLens.extractSignals(t);
    const tri = trifoldLabel(t);

    // Descriptive “density” (no thresholds, no triggers)
    const termHits = dod.filter(x => x.type === "TERM").length;
    const signalHits = dod.filter(x => x.type === "SIGNAL").length;
    const totalHits = termHits + signalHits;

    const payload = Object.freeze({
      ok: true,
      kind: "UNIFIED_DRIFT_CORE_PAYLOAD",
      domain: String(domain || "UNSPECIFIED"),
      meta: Object.freeze({ ...meta }),

      // DoD lens output (domain-specific, descriptive)
      dod: Object.freeze({
        id: DoD_DriftLens.id,
        scope: DoD_DriftLens.scope,
        termHits,
        signalHits,
        totalHits,
        hits: Object.freeze(dod)
      }),

      // Trifold label (if available)
      trifold: Object.freeze(tri),

      // Diagnostics utilities exposed (no automatic use)
      diagnostics: Object.freeze({
        pwsPhase: detectPWSPhase(meta?.systemIndicators || {}),
        // Provide callable names only; GUI/Explainer decides whether to use
        available: Object.freeze(["Hn", "IDI", "Sigma", "Theta"])
      })
    });

    try {
      window.dispatchEvent(new CustomEvent(emitEventName, { detail: payload }));
    } catch (_) {}

    return payload;
  }

  function exportAPI() {
    return Object.freeze({
      analyzeText,
      detectPWSPhase,
      MutationDrift,
      DoD_DriftLens
    });
  }

  return Object.freeze({ analyzeText, export: exportAPI });
}

/* =========================
   5) Global attach (manual integration)
   ========================= */

window.Sovra = window.Sovra || {};
window.Sovra.UnifiedDriftCore = window.Sovra.UnifiedDriftCore || Object.freeze({
  create: createUnifiedDriftCore
});

/* =========================
   6) Optional: Patch your Drift Scanner gate (drop-in)
   - Call this after you load the scanner code I gave you earlier.
   ========================= */

window.Sovra = window.Sovra || {};
window.Sovra.DriftGate = window.Sovra.DriftGate || Object.freeze({
  getEnabled: defaultGetDriftEnabled
});

// If you want: wrap an existing scanner instance so it hard-gates on DRIFT.
window.Sovra.wrapScannerWithDriftGate = function wrapScannerWithDriftGate(scanner, getDriftEnabled = defaultGetDriftEnabled) {
  if (!scanner || typeof scanner.scan !== "function") return scanner;
  return Object.freeze({
    ...scanner,
    scan: async (args) => {
      if (!requireDriftEnabled(getDriftEnabled)) {
        return Object.freeze({ ok: false, gated: true, reason: "DRIFT_DISABLED" });
      }
      return scanner.scan(args);
    }
  });
};

/* =========================
   7) Example wiring (commented)
   ========================= */

// const driftCore = Sovra.UnifiedDriftCore.create({
//   getDriftEnabled: () => document.getElementById("DRIFT")?.checked === true,
//   emitEventName: "drift:core",
//   trifoldProtocol: window.TrifoldMirrorProtocol || null
// });
//
// // Attach to your query pipeline (example):
// // driftCore.analyzeText({ text: queryText, domain: "Law", meta: { systemIndicators: {} } });
/* ============================================================
   Chimera Explainer Core (NFIE-compliant, lens-only, user-gated)
   Version: 0.1
   Purpose:
     - Explain HOW expressions relate (structural alignment), not WHY
     - Trace divergence paths (same role, new surface; cross-domain migration)
     - Generate context-aware explanation payloads (no prewritten narratives)
   Activation:
     - ONLY runs when user enables DRIFT checkbox
     - Intended to run AFTER Drift Scanner + Calculator (optional)
   Non-goals:
     - No scoring, no thresholds, no flags, no enforcement, no predictions
   ============================================================ */

/* =========================
   0) Gate: DRIFT checkbox
   ========================= */

function defaultGetDriftEnabled() {
  const ids = ["ctx-drift", "DRIFT", "drift", "drift-checkbox", "toggle-drift"];
  for (const id of ids) {
    const el = document.getElementById(id);
    if (el && typeof el.checked === "boolean") return !!el.checked;
  }
  return false;
}

function requireDriftEnabled(getDriftEnabled) {
  return !!(getDriftEnabled && getDriftEnabled());
}

/* =========================
   1) Chimera structural vocabulary (lens-only)
   ========================= */

const CHIMERA_LENS = Object.freeze({
  id: "CHIMERA_EXPLAINER_CORE",
  elements: Object.freeze({
    pillars: "Authority encoding / pattern anchoring",
    walls: "Group identity / narrative constraint",
    beams: "Disruption logic / counter-pattern leverage",
    ceiling: "Perceptual limits / framing horizon",
    floor: "Historical memory / inherited context",
    trifold: "Rigidity / constraint / closure labeling",
    porch: "Output interface (speech/silence/action)—DESCRIPTIVE ONLY"
  }),

  // Minimal role set—expand later without changing the contract
  roles: Object.freeze([
    "SOCIAL_ADDRESS",
    "AUTHORITY_COMPLIANCE",
    "LEGITIMACY_CLAIM",
    "EXCLUSION_BOUNDARY",
    "PROCEDURAL_NORMALIZATION",
    "MORAL_JUSTIFICATION",
    "IDENTITY_LABELING"
  ])
});

/* =========================
   2) Lightweight text utilities
   ========================= */

function safeLower(s) {
  return String(s || "").toLowerCase();
}

function tokenize(text) {
  return safeLower(text)
    .replace(/[^a-z0-9\s\-’']/g, " ")
    .split(/\s+/)
    .filter(Boolean);
}

function uniq(arr) {
  return Array.from(new Set(arr || []));
}

function topTerms(texts, n = 10) {
  const stop = new Set([
    "the","and","of","to","in","a","for","is","on","that","with","as","by","or","be","are","from","at","an","this","it"
  ]);
  const m = new Map();
  for (const t of texts || []) {
    for (const tok of tokenize(t)) {
      if (tok.length < 3 || stop.has(tok)) continue;
      m.set(tok, (m.get(tok) || 0) + 1);
    }
  }
  return Array.from(m.entries())
    .sort((a,b) => b[1] - a[1])
    .slice(0, n)
    .map(([term,count]) => ({ term, count }));
}

/* =========================
   3) Optional Trifold protocol hook (labeling only)
   ========================= */

function trifoldLabel(trifoldProtocol, text) {
  if (!trifoldProtocol || typeof trifoldProtocol.evaluateClaim !== "function") {
    return { rigidity: false, constraint: false, inspiration: false };
  }
  try {
    const r = trifoldProtocol.evaluateClaim(String(text || ""));
    return r?.diagnostics || { rigidity: false, constraint: false, inspiration: false };
  } catch (_) {
    return { rigidity: false, constraint: false, inspiration: false };
  }
}

/* =========================
   4) Role assignment (heuristic, descriptive-only)
   - No “meaning”, no intent—just structural role hints
   - You can swap this later for a better classifier
   ========================= */

const ROLE_HINTS = Object.freeze([
  { role: "SOCIAL_ADDRESS", hints: ["bud","buddy","dude","bro","pal","mate","homie"] },
  { role: "AUTHORITY_COMPLIANCE", hints: ["obey","obedience","submit","follow the rules","law-abiding","comply","compliance","order"] },
  { role: "LEGITIMACY_CLAIM", hints: ["rule of law","freedom","equality","rights","justice","civilized","civilizing"] },
  { role: "PROCEDURAL_NORMALIZATION", hints: ["procedure","administrative","jurisdiction","policy","regulation","standard","compliance"] },
  { role: "MORAL_JUSTIFICATION", hints: ["divine","mission","destiny","moral","virtue","sin","sacred"] },
  { role: "IDENTITY_LABELING", hints: ["minority","majority","citizen","native","indigenous","immigrant","race","ethnicity"] },
  { role: "EXCLUSION_BOUNDARY", hints: ["illegal","criminal","outsider","alien","unfit","undeserving","ban","exclude"] }
]);

function assignRoles(text) {
  const t = safeLower(text);
  const roles = [];
  for (const r of ROLE_HINTS) {
    for (const h of r.hints) {
      if (t.includes(String(h).toLowerCase())) {
        roles.push(r.role);
        break;
      }
    }
  }
  return uniq(roles);
}

/* =========================
   5) Divergence path builder
   - Input: timeline slices + samples (from Drift Scanner)
   - Output: role-aligned “paths” across time (descriptive)
   ========================= */

function buildDivergencePaths({ timeline = [], samples = [], domain = "UNSPECIFIED", trifoldProtocol = null } = {}) {
  // Group samples by era, then by role
  const byEra = new Map();
  for (const s of samples || []) {
    const eraId = s?.eraId || "unknown";
    if (!byEra.has(eraId)) byEra.set(eraId, []);
    byEra.get(eraId).push(s);
  }

  const paths = new Map(); // role -> [{eraId, eraLabel, phrases[]}]
  const eraLabelOf = new Map((timeline || []).map(t => [t.eraId, t.eraLabel]));

  for (const [eraId, items] of byEra.entries()) {
    const eraLabel = eraLabelOf.get(eraId) || eraId;

    for (const it of items) {
      const ctx = String(it?.context || "");
      const roles = assignRoles(ctx);
      const tri = trifoldLabel(trifoldProtocol, ctx);

      // Extract a few “surface phrases” as anchors (cheap: top terms)
      const anchors = topTerms([ctx], 6).map(x => x.term);

      for (const role of roles) {
        if (!paths.has(role)) paths.set(role, []);
        paths.get(role).push(Object.freeze({
          eraId,
          eraLabel,
          domain,
          anchors: Object.freeze(anchors),
          trifold: Object.freeze(tri),
          source: Object.freeze({
            year: it?.year || null,
            host: it?.host || "",
            title: it?.title || "",
            link: it?.link || ""
          })
        }));
      }
    }
  }

  // Sort each role path by era order as provided by timeline
  const eraOrder = new Map((timeline || []).map((t, i) => [t.eraId, i]));
  const out = [];

  for (const [role, entries] of paths.entries()) {
    const sorted = entries.slice().sort((a, b) => (eraOrder.get(a.eraId) ?? 999) - (eraOrder.get(b.eraId) ?? 999));
    out.push(Object.freeze({ role, entries: Object.freeze(sorted) }));
  }

  return Object.freeze(out);
}

/* =========================
   6) Explanation synthesis (no templates, but structured assembly)
   - Produces “explanation atoms” the GUI can render
   ========================= */

function synthesizeExplanationAtoms({ query, domain, driftTimelinePayload, calculatorPayload = null, trifoldProtocol = null } = {}) {
  const tl = driftTimelinePayload?.timeline || [];
  const samples = driftTimelinePayload?.samples || [];
  const paths = buildDivergencePaths({ timeline: tl, samples, domain, trifoldProtocol });

  const atoms = [];

  // Atom: scope + constraint statement (NFIE)
  atoms.push(Object.freeze({
    kind: "SCOPE",
    text: `This explanation describes observed language relationships over time within the ${domain} context, without asserting causes or intent.`
  }));

  // Atom: present-tense pressure modifiers (optional)
  if (calculatorPayload?.ok) {
    const c = calculatorPayload;
    atoms.push(Object.freeze({
      kind: "PRESSURE_CONTEXT",
      text: `Current query structure signals—collapse: ${c.collapseScore ?? "?"}, contradiction: ${c.contradictionScore ?? "?"}, zero-sum: ${c.zeroSumScore ?? "?"}.`
    }));
  }

  // Atom: role paths (descriptive)
  for (const p of paths) {
    const role = p.role;
    const entries = p.entries || [];
    if (!entries.length) continue;

    const eras = uniq(entries.map(e => e.eraLabel));
    const anchorTerms = uniq(entries.flatMap(e => e.anchors)).slice(0, 10);

    atoms.push(Object.freeze({
      kind: "ROLE_PATH",
      role,
      eras: Object.freeze(eras),
      anchors: Object.freeze(anchorTerms),
      text: `Observed continuity in role ${role}: surface language shifts across ${eras.join(" → ")} while occupying a similar structural position.`
    }));
  }

  // Atom: provenance samples (for user inspection)
  atoms.push(Object.freeze({
    kind: "PROVENANCE_SAMPLES",
    samples: Object.freeze(
      (samples || []).slice(0, 6).map(s => Object.freeze({
        year: s.year,
        eraId: s.eraId,
        host: s.host,
        title: s.title,
        link: s.link
      }))
    )
  }));

  return Object.freeze(atoms);
}

/* =========================
   7) Public module API (user-gated)
   ========================= */

function createChimeraExplainerCore({
  getDriftEnabled = defaultGetDriftEnabled,
  emitEventName = "drift:explain",
  trifoldProtocol = null
} = {}) {
  async function explain({
    query,
    domain = "UNSPECIFIED",
    driftTimelinePayload,
    calculatorPayload = null
  } = {}) {
    if (!requireDriftEnabled(getDriftEnabled)) {
      return Object.freeze({ ok: false, gated: true, reason: "DRIFT_DISABLED" });
    }
    if (!driftTimelinePayload || driftTimelinePayload.ok !== true) {
      return Object.freeze({ ok: false, error: "MISSING_DRIFT_TIMELINE" });
    }

    const atoms = synthesizeExplanationAtoms({
      query: String(query || ""),
      domain: String(domain || "UNSPECIFIED"),
      driftTimelinePayload,
      calculatorPayload,
      trifoldProtocol
    });

    const payload = Object.freeze({
      ok: true,
      kind: "CHIMERA_EXPLANATION",
      lens: CHIMERA_LENS,
      query: String(query || ""),
      domain: String(domain || "UNSPECIFIED"),
      atoms
    });

    try {
      window.dispatchEvent(new CustomEvent(emitEventName, { detail: payload }));
    } catch (_) {}

    return payload;
  }

  return Object.freeze({ explain, lens: CHIMERA_LENS });
}

/* =========================
   8) Global attach (manual integration)
   ========================= */

window.Sovra = window.Sovra || {};
window.Sovra.ChimeraExplainerCore = window.Sovra.ChimeraExplainerCore || Object.freeze({
  create: createChimeraExplainerCore
});

/* =========================
   9) Example wiring (commented)
   ========================= */

// const explainer = Sovra.ChimeraExplainerCore.create({
//   getDriftEnabled: () => document.getElementById("DRIFT")?.checked === true,
//   emitEventName: "drift:explain",
//   trifoldProtocol: window.TrifoldMirrorProtocol || null
// });
//
// // After Drift Scanner returns payload:
// // const driftPayload = await scanner.scan({ query, domain, anchorTerms });
// // const calcPayload = { ok:true, collapseScore:3, contradictionScore:0, zeroSumScore:0 }; // optional
// // const explainPayload = await explainer.explain({ query, domain, driftTimelinePayload: driftPayload, calculatorPayload: calcPayload });
// // console.log(explainPayload);
/* ============================================================
   Chimera Patch: Lambda Speciation (descriptive linguistic lens)
   Version: 0.1
   Purpose:
     - Add a non-normative descriptor for language speciation
     - Detect “role continuity + surface divergence” across eras/domains
   Constraints:
     - Descriptive only (no why, no intent, no prescriptions)
     - No thresholds that trigger actions
     - Runs ONLY when DRIFT checkbox is enabled
   ============================================================ */

"use strict";

/* =========================
   0) Gate: DRIFT checkbox
   ========================= */

function defaultGetDriftEnabled() {
  const ids = ["ctx-drift", "DRIFT", "drift", "drift-checkbox", "toggle-drift"];
  for (const id of ids) {
    const el = document.getElementById(id);
    if (el && typeof el.checked === "boolean") return !!el.checked;
  }
  return false;
}

function requireDriftEnabled(getDriftEnabled) {
  return !!(getDriftEnabled && getDriftEnabled());
}

/* =========================
   1) Lambda Speciation Lens
   ========================= */

const LAMBDA_SPECIATION = Object.freeze({
  id: "LAMBDA_SPECIATION_LENS",
  label: "Lambda speciation",
  definition:
    "A descriptive pattern where a stable communicative role persists while surface expressions diverge across time and/or domains, often coinciding with coordination demands (e.g., migration, trade, governance, institutionalization).",
  nonGoals: Object.freeze([
    "No causal claims",
    "No intent inference",
    "No moral judgments",
    "No enforcement or triggers"
  ])
});

/* =========================
   2) Helpers
   ========================= */

function uniq(arr) {
  return Array.from(new Set(arr || []));
}

function jaccard(a, b) {
  const A = new Set(a || []);
  const B = new Set(b || []);
  if (!A.size && !B.size) return 0;
  let inter = 0;
  for (const x of A) if (B.has(x)) inter++;
  const union = A.size + B.size - inter;
  return union ? inter / union : 0;
}

/* =========================
   3) Lambda detection (descriptive)
   Input expectation:
     - rolePaths: output from Chimera role-path builder
       [{ role, entries: [{ eraId, eraLabel, domain, anchors, trifold, source }] }]
   Output:
     - “speciation observations” the GUI can render
   ========================= */

function detectLambdaSpeciation({ rolePaths = [] } = {}) {
  const observations = [];

  for (const rp of rolePaths || []) {
    const role = rp?.role;
    const entries = Array.isArray(rp?.entries) ? rp.entries : [];
    if (!role || entries.length < 2) continue;

    // Compare adjacent eras for “surface divergence” while role remains constant
    for (let i = 1; i < entries.length; i++) {
      const prev = entries[i - 1];
      const cur = entries[i];

      const prevAnchors = uniq(prev?.anchors || []);
      const curAnchors = uniq(cur?.anchors || []);
      const overlap = jaccard(prevAnchors, curAnchors);

      // Descriptive-only: we do NOT threshold into actions; we just report overlap as a measure.
      observations.push(Object.freeze({
        kind: "LAMBDA_SPECIATION_OBSERVATION",
        role,
        from: Object.freeze({ eraId: prev.eraId, eraLabel: prev.eraLabel, domain: prev.domain }),
        to: Object.freeze({ eraId: cur.eraId, eraLabel: cur.eraLabel, domain: cur.domain }),
        surfaceOverlap: overlap, // 0..1 descriptive similarity of anchor terms
        surfaceShift: Object.freeze({
          fromAnchors: Object.freeze(prevAnchors.slice(0, 10)),
          toAnchors: Object.freeze(curAnchors.slice(0, 10))
        }),
        note:
          "Same role observed across slices; surface expressions vary. This is a descriptive continuity/divergence trace (no cause asserted)."
      }));
    }
  }

  return Object.freeze(observations);
}

/* =========================
   4) Chimera integration hook
   - Drop-in: call this after you build role paths
   ========================= */

function createLambdaSpeciationModule({
  getDriftEnabled = defaultGetDriftEnabled,
  emitEventName = "drift:lambda"
} = {}) {
  function analyze({ rolePaths = [], query = "", domain = "UNSPECIFIED" } = {}) {
    if (!requireDriftEnabled(getDriftEnabled)) {
      return Object.freeze({ ok: false, gated: true, reason: "DRIFT_DISABLED" });
    }

    const observations = detectLambdaSpeciation({ rolePaths });

    const payload = Object.freeze({
      ok: true,
      kind: "LAMBDA_SPECIATION_PAYLOAD",
      lens: LAMBDA_SPECIATION,
      query: String(query || ""),
      domain: String(domain || "UNSPECIFIED"),
      observations
    });

    try {
      window.dispatchEvent(new CustomEvent(emitEventName, { detail: payload }));
    } catch (_) {}

    return payload;
  }

  return Object.freeze({ analyze, lens: LAMBDA_SPECIATION });
}

/* =========================
   5) Global attach (manual integration)
   ========================= */

window.Sovra = window.Sovra || {};
window.Sovra.LambdaSpeciation = window.Sovra.LambdaSpeciation || Object.freeze({
  create: createLambdaSpeciationModule
});

/* =========================
   6) Example wiring (commented)
   ========================= */

// After Chimera builds rolePaths (from drift timeline samples):
// const rolePaths = buildDivergencePaths({ timeline, samples, domain, trifoldProtocol });
//
// const lambda = Sovra.LambdaSpeciation.create({
//   getDriftEnabled: () => document.getElementById("DRIFT")?.checked === true,
//   emitEventName: "drift:lambda"
// });
//
// const lambdaPayload = lambda.analyze({ rolePaths, query, domain });
// console.log(lambdaPayload);

/* ============================================================
   Context‑Gated Exposure Controller (CGEC)
   - Governs what may surface, at what resolution
   - No data mutation, no enforcement, no export
   ============================================================ */
const CGEC = Object.freeze({
  allow(moduleName) {
    switch (moduleName) {
      case "DRIFT_TIMELINE":
        return SOVRA_GATES.driftCore();
      case "CDLM_SUMMARY":
        return SOVRA_GATES.contraCollapse();
      case "ZERO_SUM":
        return SOVRA_GATES.zeroSum();
      default:
        return false;
    }
  },

  resolution(moduleName) {
    switch (moduleName) {
      case "CDLM_SUMMARY":
        return "LOW";
      case "DRIFT_TIMELINE":
        return "ERA";
      default:
        return "NONE";
    }
  },

  persistent() {
    return false;
  },

  decayMs(moduleName) {
    switch (moduleName) {
      case "DRIFT_TIMELINE":
        return { visible: 16000, fade: 4000 };
      default:
        return null;
    }
  }
});


/* ============================================================
   CDLM UI Sink (DESCRIPTIVE ONLY)
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {
  window.addEventListener("cdlm:scores", (ev) => {
    const s = ev.detail;

    document.getElementById("score-collapse").textContent = s.collapse;
    document.getElementById("score-contradiction").textContent = s.contradiction;
    document.getElementById("score-zero-sum").textContent = s.zeroSum;

 document
  .getElementById("diagnostic-panel")
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
function toggleSemanticIndicators(_) {
  // UI stub — no-op
}

function emitCDLMScores(scores) {
  if (!SOVRA_GATES.contraCollapse()) return;

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
function createCDLMPassId() {
  return `pass_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

/* ============================================================
   CDLM TRAVERSAL EMITTER (NON-FORCE, PARALLEL OBSERVATION)
   - Emits a read-only traversal record per result object
   - Does NOT modify the object
   ============================================================ */

function emitTraversalEvent(result, passId) {
  return Object.freeze({
    kind: "TRAVERSAL",
    passId,
    resultId: result.hash || result.link,
    source: result.link || "unknown",
    text: `${result.title || ""} ${result.snippet || ""} ${result.full_text || ""}`,
    t: Date.now()
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

document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("toggleVoice");
  if (!toggle) return;

  toggle.addEventListener("change", () => {
    NFIE.registerUserAction("toggleVoice");
  });
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
/* ============================================================
   Diagnostic Surface Listener (CDLM Instrumentation)
   ============================================================ */

window.addEventListener("cdlm:scores", (e) => {
  const { zeroSum, collapse, contradiction } = e.detail || {};

  const zseEl = document.getElementById("score-zero-sum");
  const collapseEl = document.getElementById("score-collapse");
  const contraEl = document.getElementById("score-contradiction");
  const panel = document.getElementById("diagnostic-panel");

  if (!zseEl || !collapseEl || !contraEl || !panel) return;

  zseEl.textContent = zeroSum ?? "–";
  collapseEl.textContent = collapse ?? "–";
  contraEl.textContent = contradiction ?? "–";

  panel.classList.remove("hidden");
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
   CDLM GRID ACCUMULATOR (READ-ONLY, NON-FORCE)
   ============================================================ */

const CDLM_GRID_ACCUMULATOR = Object.create(null);

/* ============================================================
   CDLM GRID ACCUMULATION (TEMPORAL MEMORY)
   ============================================================ */

function accumulateGridObservations(gridResult, passId) {
  if (!gridResult || !Array.isArray(gridResult.grid)) return;

  const pid = passId || "default";

  CDLM_GRID_ACCUMULATOR[pid] = CDLM_GRID_ACCUMULATOR[pid] || {};

  gridResult.grid.forEach(({ row, col, observation }) => {
    const key = `${row}:${col}`;
    const cell = CDLM_GRID_ACCUMULATOR[pid][key] || {
      hits: 0,
      lastSeen: 0,
      signals: []
    };

    if (observation && observation.count > 0) {
      cell.hits += observation.count;
      cell.lastSeen = Date.now();
      cell.signals.push(observation);
    }

    CDLM_GRID_ACCUMULATOR[pid][key] = cell;
  });
}
/* ============================================================
   CDLM GRID STATE READER (READ-ONLY, NON-FORCE)
   - Summarizes accumulated observations
   - No thresholds, no flags, no interpretation
   ============================================================ */

function readCDLMGridState(passId) {
  const pid = passId || "default";
  const grid = CDLM_GRID_ACCUMULATOR[pid];

  if (!grid) {
    return Object.freeze({
      passId: pid,
      totalCells: 0,
      activeCells: 0,
      repeatedCells: 0,
      maxHits: 0,
      lastActivity: null
    });
  }

  let activeCells = 0;
  let repeatedCells = 0;
  let maxHits = 0;
  let lastActivity = 0;

  Object.values(grid).forEach(cell => {
    if (cell.hits > 0) {
      activeCells++;
      if (cell.hits > 1) repeatedCells++;
      if (cell.hits > maxHits) maxHits = cell.hits;
      if (cell.lastSeen > lastActivity) lastActivity = cell.lastSeen;
    }
  });

  return Object.freeze({
    passId: pid,
    totalCells: Object.keys(grid).length,
    activeCells,
    repeatedCells,
    maxHits,
    lastActivity: lastActivity || null
  });
}
function readCDLMWindow(passId, sinceTs) {
  const grid = CDLM_GRID_ACCUMULATOR[passId];
  if (!grid) return [];

  return Object.entries(grid)
    .filter(([, cell]) => cell.lastSeen >= sinceTs)
    .map(([key, cell]) => ({
      cell: key,
      hits: cell.hits,
      lastSeen: cell.lastSeen
    }));
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
console.log("GATE SNAPSHOT", {
  zse: SOVRA_GATES.zeroSum(),
  contra: SOVRA_GATES.contraCollapse(),
  drift: SOVRA_GATES.driftCore(),
  welsing: SOVRA_GATES.welsingFuller(),
  raw: SOVRA_GATES.rawData(),
  speaks: SOVRA_GATES.sovraSpeaks()
});


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
const collapseContraOn = SOVRA_GATES.contraCollapse() ? "1" : "0";

const endpoint =
  `/api/search` +
  `?q=${encodeURIComponent(query)}` +
  `&raw=${compareRaw}` +
  `&zse=${zeroSumOn}` +
  `&wfe=${wfeOn}` +
  `&contra=${collapseContraOn}`;
     
    const response = await fetch(endpoint);
  const contentType = response.headers.get("content-type") || "";

if (!contentType.includes("application/json")) {
  const text = await response.text();
  throw new Error("Upstream returned non-JSON: " + text.slice(0, 120));
}

const data = await response.json();

/* --------------------------------
   Temporal Drift Timeline (LEFT COLUMN)
   -------------------------------- */
if (SOVRA_GATES.driftCore() && window.Sovra?.DriftScanner?.create) {
  try {
    const scanner = window.Sovra.DriftScanner.create({
      trifoldProtocol: TrifoldMirrorProtocol,
      recursionDelayMs: 220,
      maxDocs: 24,
      emitEventName: "drift:timeline"
    });

    const driftPayload = await scanner.scan({
      query,
      domain: "UNSPECIFIED",
      anchorTerms: []
    });

    renderDriftTimeline(driftPayload);
  } catch (_) {
    // Silent fail — public runtime must not surface scanner errors
  }
}

// Render Zero‑Sum block once per query
if (SOVRA_GATES.zeroSum() && data.zse) {
  renderZSEStandalone(data.zse);
}
function renderDriftTimeline(payload) {
  if (!payload || !payload.ok || payload.kind !== "DRIFT_TIMELINE") return;

  const container = document.querySelector(".results-left");
  if (!container) return;

  const block = document.createElement("section");
  block.className = "drift-block";

  const rows = (payload.timeline || [])
    .filter(t => (t.docCount || 0) > 0)
    .map(t => {
      const span = t.yearSpan ? `${t.yearSpan.min}–${t.yearSpan.max}` : "—";
      const top = (t.topCooccurringTerms || [])
        .slice(0, 5)
        .map(x => x.term)
        .join(", ");

      return `
        <div class="drift-era">
          <strong>${t.eraLabel}</strong> (${span}) — docs: ${t.docCount}
          <div class="drift-terms">
            ${top ? `Top terms: ${escapeHtml(top)}` : ""}
          </div>
        </div>
      `;
    })
    .join("");

  block.innerHTML = `
    <h3>Temporal Drift Timeline</h3>
    <div class="drift-meta">
      Domain: ${escapeHtml(payload.domain)} | Query: ${escapeHtml(payload.query)}
    </div>
    <div class="drift-eras">
      ${rows || "<div class='empty'>No dated artifacts surfaced.</div>"}
    </div>
  `;

  container.prepend(block);
}

results.innerHTML = `<div class="section-label">Search results</div>`;


    const list = Array.isArray(data.organic_results) ? data.organic_results : [];
    if (!list.length) {
       toggleSemanticIndicators(false);
      results.innerHTML += `<div class="empty">No results found.</div>`;
      SovraSyncTrigger.send({ kind: "NO_RESULTS", query });
      return;
    }
     const narrativeText = list
  .map(r => `${r.title || ""} ${r.snippet || ""} ${r.full_text || ""}`)
  .join("\n");

const diagnostics = {
  zse: runZSEStandalone(narrativeText),
  trifold: TrifoldMirrorProtocol.evaluateClaim(narrativeText).diagnostics,
  enginesFired: {
    zse: SOVRA_GATES.zeroSum(),
    contra: SOVRA_GATES.contraCollapse(),
    drift: SOVRA_GATES.driftCore(),
    welsing: SOVRA_GATES.welsingFuller(),
    voice: SOVRA_GATES.sovraSpeaks()
  }
};

const scores = synthesizeCDLMScores(diagnostics);
emitCDLMScores(scores);

const vduBlock = VDU.run(list);
if (vduBlock) results.appendChild(vduBlock);

    list.forEach((r, i) => {
      // --- CDLM traversal (non-force, per-object) ---
const traversal = emitTraversalEvent(r, data.query_token || "pass-0");

// Forward + lateral observation (read-only)
const gridObservations = traverseCDLMGrid(traversal.text, "public_runtime");
accumulateGridObservations(gridObservations, traversal.passId);

// One-way telemetry (optional, NFIE-safe)
SovraSyncTrigger.send({
  kind: "CDLM_TRAVERSAL",
  traversal,
  grid: gridObservations
});
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

      if (SOVRA_GATES.sovraSpeaks()) {
        NFIE.validateStateTransition("SovraSpeaks");
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

  /* ===============================
     SEARCH BINDINGS (ALWAYS RUN)
     =============================== */

  const searchButton = document.getElementById("search-btn");
  const queryInput = document.getElementById("query");

  if (searchButton) {
    searchButton.addEventListener("click", () => {
      window.searchSovra?.();
    });
  }

  if (queryInput) {
    queryInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        window.searchSovra?.();
      }
    });
  }

  /* ===============================
     CONTEXT CONTROL PANEL (OPTIONAL)
     =============================== */

  const contextFrameList = document.querySelector(".context-frame-list");

  if (contextFrameList) {
    Object.keys(CONTEXT_FRAME_VISIBILITY).forEach(engine => {
      const label = document.createElement("label");
      label.className = "context-frame-toggle";

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = CONTEXT_FRAME_VISIBILITY[engine];

      checkbox.addEventListener("change", () => {
        CONTEXT_FRAME_VISIBILITY[engine] = checkbox.checked;
        window.searchSovra?.(); // re-render via existing pipeline
      });

      label.appendChild(checkbox);
      label.append(` ${engine}`);
      contextFrameList.appendChild(label);
    });
  }

});


