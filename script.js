/* ============================================================
   NON-INTERFERENCE DECLARATION — CEASE AND DESIST CONDITIONS
   ============================================================

   The only cease and desist that will be accepted and immediately complied with are as follows:

   {
     1: The estate or legal representative of Dr. Francis Cress Welsing.
     2: The estate or legal representative of Dr. Neely Fuller, Jr.
     3: The estate or legal representative of Battle Ginga™ (Mestre X. Gautier).
     4: A legal court order from any of the aforementioned entities.
   }

   This declaration is embedded as a structural invariant and is not subject to override by interpretive systems, automated moderation, or third-party inference. It is not a disclaimer — it is a boundary.
*/

/* ============================================================
   Sovra — Purpose Statement

   Sovra exposes structural harm within systems of white supremacy
   by retrieving and displaying public information without
   interpretation or direction.

   Sovra does not accuse individuals or entities.
   Sovra does not persuade, instruct, or optimize behavior.
   Sovra presents observable structure so users may witness
   continuity and draw their own conclusions.

   This statement is declarative only and has no effect on
   program execution.
   ============================================================ */

/* ============================================================
   Sovra Public Runtime (NFIE-compliant)
   Version: 1.0
   Purpose: Search UI + evidence handling + one-way telemetry
   Non-goals: No enforcement, no interpretive mandates, no collapse control
   ============================================================ */

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
window.TrifoldMirrorProtocol =
  window.TrifoldMirrorProtocol || TrifoldMirrorProtocol;

// Example usage:
const claim = "This is the eternal truth and must never be questioned.";
const result = TrifoldMirrorProtocol.evaluateClaim(claim);
console.log("Trifold Mirror Diagnostic:", result.diagnostics);
console.log("Contradiction Score:", result.metrics.contradictionScore);
console.log("Contradiction Artifact Flag:", result.metrics.isContradictionArtifact);
/* ============================================================
   SOVRA QUAD-CORE CSR — WARP-CORE READY PATCH (script.js)
   Drop-in block: replace your current PublicTextFetcher STUB
   and add the Quad-Core + auto-bind connector surface.
   ============================================================ */

/* ============================================================
   SOVRA SIGNAL BUS (public, inert, one-way notifications)
   ============================================================ */
window.Sovra = window.Sovra || {};

window.Sovra.SignalBus = (() => {
  const listeners = Object.create(null);
  return Object.freeze({
    on(kind, fn) {
      if (!listeners[kind]) listeners[kind] = [];
      listeners[kind].push(fn);
    },
    emit(kind, payload) {
      (listeners[kind] || []).forEach(fn => {
        try { fn(payload); } catch (_) {}
      });
    }
  });
})();

/* ============================================================
   CAPABILITY SURFACE (renderable data availability state)
   ============================================================ */
window.Sovra.capabilities = window.Sovra.capabilities || Object.freeze({
  textFetch: "stub",     // "stub" | "live"
  analysis: "ready"     // "ready" | "active"
});

/* ============================================================
   PUBLIC TEXT FETCHER (PRIMARY SOURCE SOCKET)
   - Stable contract: fetch(request) -> Promise<{ text, meta }>
   - Remains inert until primary source is installed
   ============================================================ */
(() => {
  const state = {
    mode: "stub", // "stub" | "live"
    impl: null,
    config: Object.freeze({
      publicOnly: true,
      bounded: true,
      readOnly: true,
      nonSemantic: true
    })
  };

  const api = {
    async fetch(request) {
      if (state.mode !== "live" || typeof state.impl !== "function") {
        throw new Error("PublicTextFetcher is installed but not enabled.");
      }
      return state.impl(request);
    },
    get config() { return state.config; },
    get mode() { return state.mode; }
  };

  window.Sovra.installPrimarySource = function installPrimarySource(fetchImpl, cfg = {}) {
    if (typeof fetchImpl !== "function") {
      throw new Error("Primary source install requires a fetch implementation.");
    }

    state.impl = fetchImpl;
    state.mode = "live";
    state.config = Object.freeze({ ...state.config, ...cfg });

    window.Sovra.capabilities = Object.freeze({
      ...window.Sovra.capabilities,
      textFetch: "live",
      analysis: "active"
    });

    window.Sovra.SignalBus.emit("PRIMARY_SOURCE_AVAILABLE", { config: state.config });
    return true;
  };

  window.Sovra.PublicTextFetcher = Object.freeze(api);
})();

/* ============================================================
   ANALYSIS SUITE (observational only)
   - ZSE: mass / pressure indicators
   - CDLM: density / packing indicators
   - DELTA: change placeholder (aux-safe)
   - FIELD SUMMARY: non-directive aggregation
   ============================================================ */
window.Sovra.AnalysisSuite = (() => {
  const safeText = (t) => (typeof t === "string" ? t : String(t ?? ""));

  function ZSE(text) {
    const t = safeText(text);
    const tokens = t.split(/\s+/).filter(Boolean);
    return Object.freeze({
      tokenCount: tokens.length,
      charCount: t.length
    });
  }

  function CDLM(text) {
    const t = safeText(text);
    const lines = t.split(/\n/);
    const nonEmpty = lines.filter(l => l.trim().length > 0);
    const avgLineLen = nonEmpty.length
      ? Math.round(nonEmpty.join("").length / nonEmpty.length)
      : 0;

    return Object.freeze({
      lineCount: lines.length,
      nonEmptyLines: nonEmpty.length,
      avgLineLen
    });
  }

  function Delta(text, meta = {}) {
    return Object.freeze({
      snapshotId: meta.snapshotId || null,
      hasHistory: false
    });
  }

  function FieldSummary(zse, cdlm, delta, gates = {}) {
    const densityHint =
      cdlm.nonEmptyLines > 0 && cdlm.avgLineLen > 0
        ? Math.min(1, cdlm.avgLineLen / 120)
        : 0;

    const massHint =
      zse.tokenCount > 0
        ? Math.min(1, zse.tokenCount / 2000)
        : 0;

    return Object.freeze({
      field: Object.freeze({
        massHint,
        densityHint,
        deltaPresent: !!delta.snapshotId && delta.hasHistory
      }),
      gates: Object.freeze({
        rawData: !!gates.rawData,
        driftCore: !!gates.driftCore,
        contraCollapse: !!gates.contraCollapse,
        zeroSum: !!gates.zeroSum,
        welsingFuller: !!gates.welsingFuller,
        sovraSpeaks: !!gates.sovraSpeaks
      })
    });
  }

  async function analyzeFromFetcher(request, gates = {}) {
    const { text, meta } = await window.Sovra.PublicTextFetcher.fetch(request);
    const zse = ZSE(text);
    const cdlm = CDLM(text);
    const delta = Delta(text, meta);
    const summary = FieldSummary(zse, cdlm, delta, gates);

    return Object.freeze({ text, meta, zse, cdlm, delta, summary });
  }

  return Object.freeze({
    ZSE,
    CDLM,
    Delta,
    FieldSummary,
    analyzeFromFetcher
  });
})();
/* ============================================================
   MEDIA SIGNAL INTEGRITY FILTER (MSIF)
   Module ID: module-msif
   Purpose:
     - Detect anomalous valence and frequency drift in media streams
     - Provide threat-level classification based on weighted signal deviation
   Constraints:
     - Read-only analysis
     - No enforcement or blocking
     - Callable only by authorized modules
   Output:
     - { anomalyDetected, valenceDrift, freqDrift, threatLevel }
   ============================================================ */
const MSIF = {
  id: "module-msif",
  authorizedCallers: new Set(["SOVRA_DEFENSE_UPGRADE", "EMOTIONAL_FLUENCY_MATRIX"]),

  detectAnomalousValence: function (mediaStream, baselineProfile, caller = "msif") {
    if (!this.authorizedCallers.has(caller)) {
      throw new Error(`MSIF Access Denied: Unauthorized caller '${caller}'`);
    }

    const valenceDrift = mediaStream.valence - baselineProfile.expectedValence;
    const freqDrift = mediaStream.frequency - baselineProfile.expectedFrequency;

    const valenceAnomaly = Math.abs(valenceDrift) > baselineProfile.valenceThreshold;
    const freqAnomaly = Math.abs(freqDrift) > baselineProfile.frequencyThreshold;

    return {
      anomalyDetected: valenceAnomaly || freqAnomaly,
      valenceDrift,
      freqDrift,
      threatLevel: this.calculateThreatLevel(valenceDrift, freqDrift)
    };
  },

  calculateThreatLevel: function (valenceDrift, freqDrift) {
    const weightedScore = (Math.abs(valenceDrift) * 0.6) + (Math.abs(freqDrift) * 0.4);
    if (weightedScore > 1.5) return "HIGH";
    if (weightedScore > 0.8) return "MODERATE";
    return "LOW";
  }
};

registerModule("SECURITY_POSTURE_MANAGER.sys", SecurityPostureManager);


/* ============================================================
   SECURITY POSTURE MANAGER
   Module ID: SECURITY_POSTURE_MANAGER.sys
   Purpose:
     - Maintain and escalate system security posture levels
     - Dispatch alerts via SOVRA_PING
   Levels:
     - 0: Normal
     - 1–4: Increasing severity (up to Red Alert)
   ============================================================ */
const SecurityPostureManager = (() => {
  let currentLevel = 0;

  const escalate = (level, reason) => {
    if (level > currentLevel) {
      currentLevel = level;
      const payload = {
        type: "SECURITY_POSTURE_ESCALATION",
        level,
        reason,
        timestamp: now()
      };
      SOVRA_PING.dispatch(payload, SOVRA_PING.levels[level]);
    }
  };

  const reset = () => {
    currentLevel = 0;
    logAudit("SECURITY_POSTURE_RESET", { timestamp: now() });
  };

  return {
    getLevel: () => currentLevel,
    escalate,
    reset
  };
})();
registerModule("SECURITY_POSTURE_MANAGER.sys", SecurityPostureManager);

/* ============================================================
   RUNTIME INTEGRITY MANAGER
   Module ID: RUNTIME_INTEGRITY_MANAGER.sys
   Purpose:
     - Verify runtime module hashes against known values
     - Escalate posture if mismatch is detected
   ============================================================ */
const RuntimeIntegrityManager = (() => {
  const knownHashes = {
    "SOVRA_CORE.js": "abc123def456...", // Replace with real SHA-256 hashes
    "SOVRA_PING.sys": "789ghi012jkl...",
    "VDU_ENGINE.js": "mno345pqr678..."
  };

  const verify = async () => {
    for (const [module, expectedHash] of Object.entries(knownHashes)) {
      const actualHash = await hashModule(module);
      if (actualHash !== expectedHash) {
        SecurityPostureManager.escalate(3, `Hash mismatch in ${module}`);
        return false;
      }
    }
    return true;
  };

  return { verify };
})();
registerModule("RUNTIME_INTEGRITY_MANAGER.sys", RuntimeIntegrityManager);

/* ============================================================
   SIGNAL THREAT MONITOR
   Module ID: SIGNAL_THREAT_MONITOR.sys
   Purpose:
     - Evaluate media streams for anomalous valence/frequency
     - Escalate posture based on threat level
   ============================================================ */
const SignalThreatMonitor = (() => {
  const evaluate = (mediaStream, baselineProfile, caller) => {
    try {
      const result = MSIF.detectAnomalousValence(mediaStream, baselineProfile, caller);

      if (result.anomalyDetected) {
        const level = result.threatLevel === "HIGH" ? 3 :
                      result.threatLevel === "MODERATE" ? 2 : 1;

        SecurityPostureManager.escalate(level, `MSIF anomaly: ${result.threatLevel}`);
      }

      return result;
    } catch (err) {
      SecurityPostureManager.escalate(3, `MSIF access violation by '${caller}'`);
      return { anomalyDetected: false, error: err.message };
    }
  };

  return { evaluate };
})();
registerModule("SIGNAL_THREAT_MONITOR.sys", SignalThreatMonitor);

/* ============================================================
   DOM MUTATION SENTINEL
   Module ID: DOM_MUTATION_SENTINEL.sys
   Purpose:
     - Detect unexpected DOM changes
     - Escalate posture on suspicious mutations
   ============================================================ */
const DOMMutationSentinel = (() => {
  const observer = new MutationObserver(mutations => {
    for (const mutation of mutations) {
      if (mutation.addedNodes.length > 0) {
        SecurityPostureManager.escalate(2, "Unexpected DOM mutation detected");
        break;
      }
    }
  });

  const start = () => {
    observer.observe(document.body, { childList: true, subtree: true });
  };

  return { start };
})();
registerModule("DOM_MUTATION_SENTINEL.sys", DOMMutationSentinel);
DOMMutationSentinel.start();

/* ============================================================
   GLOBAL POLLUTION DETECTOR
   Module ID: GLOBAL_POLLUTION_DETECTOR.sys
   Purpose:
     - Detect unauthorized additions to the global namespace
     - Escalate posture on pollution detection
   ============================================================ */
const GlobalPollutionDetector = (() => {
  const baselineGlobals = new Set(Object.getOwnPropertyNames(window));

  const scan = () => {
    const currentGlobals = new Set(Object.getOwnPropertyNames(window));
    for (const key of currentGlobals) {
      if (!baselineGlobals.has(key)) {
        SecurityPostureManager.escalate(3, `Global pollution detected: ${key}`);
        break;
      }
    }
  };

  return { scan };
})();
registerModule("GLOBAL_POLLUTION_DETECTOR.sys", GlobalPollutionDetector);

/* ============================================================
   DEFENSE NET SCAN LOOP
   Purpose:
     - Periodically verify runtime integrity and global state
     - Interval: 60 seconds
   ============================================================ */
setInterval(() => {
  RuntimeIntegrityManager.verify();
  GlobalPollutionDetector.scan();
}, 60000);

/* ============================================================
   OPTIONAL: UI SIGNAL HOOK (render-only)
   ============================================================ */
window.Sovra.SignalBus.on("PRIMARY_SOURCE_AVAILABLE", () => {
  try {
    // Optional: trigger re-render or status refresh
  } catch (_) {}
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
        raw: document.getElementById("rawData")?.checked ?? false,
        collapseContra: document.getElementById("collapseContra")?.checked ?? false,
        zeroSum: document.getElementById("zeroSum")?.checked ?? false,
        welsing: document.getElementById("welsingFuller")?.checked ?? false,
        drift: document.getElementById("driftCore")?.checked ?? false,
        sovraSpeaks: document.getElementById("sovraSpeaks")?.checked ?? false
      };

      // Inject into CollapseContext.gates
      window.Sovra = window.Sovra || {};
      window.Sovra.CollapseContext = window.Sovra.CollapseContext || {};
      window.Sovra.CollapseContext.gates = contextState;

      console.log("Updated CollapseContext.gates:", contextState);
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
  "take from", "steal", "replace", "erase", "dilute", "threaten", "lose ground", "breed", "reproduce",
  "reverse discrimination", "they’re taking", "our jobs", "our schools", "our culture", "our land", "go home",
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
  getDriftEnabled = window.Sovra.DriftGate.getEnabled,
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
    if (!window.Sovra.DriftGate.require(getDriftEnabled)) {
      return Object.freeze({ ok: false, gated: true, reason: "DRIFT_DISABLED" });
    }

    const t = String(text || "");
    const dod = DoD_DriftLens.extractSignals(t);
    const tri = trifoldLabel(t);

    const termHits = dod.filter(x => x.type === "TERM").length;
    const signalHits = dod.filter(x => x.type === "SIGNAL").length;
    const totalHits = termHits + signalHits;

    const payload = Object.freeze({
      ok: true,
      kind: "UNIFIED_DRIFT_CORE_PAYLOAD",
      domain: String(domain || "UNSPECIFIED"),
      meta: Object.freeze({ ...meta }),

      dod: Object.freeze({
        id: DoD_DriftLens.id,
        scope: DoD_DriftLens.scope,
        termHits,
        signalHits,
        totalHits,
        hits: Object.freeze(dod)
      }),

      trifold: Object.freeze(tri),

      diagnostics: Object.freeze({
        pwsPhase: detectPWSPhase(meta?.systemIndicators || {}),
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


/* ============================================================
   DRIFT GATE (Authoritative, single source of truth)
   ============================================================ */

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

window.Sovra.DriftGate = Object.freeze({
  getEnabled: defaultGetDriftEnabled,
  require: requireDriftEnabled
});


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
function measureArtDensity(text) {
  const tokens = tokenize(text);
  const n = tokens.length || 1;
  const t = safeLower(text);

  const LEX = {
    absolutist: ["always","never","absolute","eternal","undeniable", "supremacy", "supreme", "dominion"],
    imperative: ["must","cannot","only","forbidden","no exceptions", "doctrine", "imperative"],
    cadence: ["therefore","thus","hence","clearly","in fact", "comply", "obey"],
    moral: ["virtue","sin","sacred","corrupt","degenerate", "sinner", "unforgiven"]
  };

  let totalHits = 0;
  const channels = {};

  for (const [k, arr] of Object.entries(LEX)) {
    const hits = arr.filter(w => t.includes(w)).length;
    channels[k] = hits;
    totalHits += hits;
  }

  return Object.freeze({
    totalHits,
    densityPer1k: (totalHits / n) * 1000,
    channels: Object.freeze(channels)
  });
}

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
    const artDensity = measureArtDensity(ctx);

    const anchors = topTerms([ctx], 6).map(x => x.term);

    for (const role of roles) {
      if (!paths.has(role)) paths.set(role, []);

      paths.get(role).push(Object.freeze({
        eraId,
        eraLabel,
        domain,
        anchors: Object.freeze(anchors),
        trifold: Object.freeze(tri),
        artDensity: Object.freeze(artDensity),
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
   6) Optional: Patch your Drift Scanner gate (drop-in)
   - Call this after you load the scanner code I gave you earlier.
   ========================= */

window.Sovra.wrapScannerWithDriftGate = function wrapScannerWithDriftGate(
  scanner,
  getDriftEnabled = window.Sovra.DriftGate.getEnabled
) {
  if (!scanner || typeof scanner.scan !== "function") return scanner;

  return Object.freeze({
    ...scanner,
    scan: async (args) => {
      if (!window.Sovra.DriftGate.require(getDriftEnabled)) {
        return Object.freeze({ ok: false, gated: true, reason: "DRIFT_DISABLED" });
      }
      return scanner.scan(args);
    }
  });
};

/* =========================
   7) Public module API (user-gated, unified DriftGate)
   ========================= */

function createChimeraExplainerCore({
  getDriftEnabled = window.Sovra.DriftGate.getEnabled,
  emitEventName = "drift:explain",
  trifoldProtocol = null
} = {}) {
  async function explain({
    query,
    domain = "UNSPECIFIED",
    driftTimelinePayload,
    calculatorPayload = null
  } = {}) {
    if (!window.Sovra.DriftGate.require(getDriftEnabled)) {
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
  from: Object.freeze({
    eraId: prev.eraId,
    eraLabel: prev.eraLabel,
    domain: prev.domain
  }),
  to: Object.freeze({
    eraId: cur.eraId,
    eraLabel: cur.eraLabel,
    domain: cur.domain
  }),
  surfaceOverlap: overlap,
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

/* ============================================================
   CDLM SCORE SYNTHESIS (NUMERIC ONLY)
   ============================================================ */
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
window.Sovra.CollapseGate = (() => {
  const THRESHOLDS = Object.freeze({
    density: 0.72,        // example — tune later
    contradiction: true  // artifact present
  });

  function hasCollapsed({ cdlm, contra }) {
    if (!cdlm) return false;

    const densityScore =
      cdlm.nonEmptyLines > 0
        ? Math.min(1, cdlm.avgLineLen / 120)
        : 0;

    const densityCollapse = densityScore >= THRESHOLDS.density;
    const contraCollapse = contra === true;

    return densityCollapse || contraCollapse;
  }

  return Object.freeze({ hasCollapsed });
})();

/* ============================================================
   CDLM SCORE EMITTER (UI BOUNDARY)
   ============================================================ */
function emitCDLMScores(scores) {
  if (!window.Sovra.CollapseGate.hasCollapsed({
    cdlm: scores?.cdlm,
    contra: scores?.isContradictionArtifact === true // or isContradictionArtifact
  })) return;

  window.dispatchEvent(
    new CustomEvent("cdlm:scores", { detail: scores })
  );
}


/* ============================================================
   CDLM ANALYSIS EXECUTION (CORRECT BINDING POINT)
   ============================================================ */
function runCDLMAnalysis({ text, zse, trifold, enginesFired }) {
  // 1) 9×9 placement (DESCRIPTIVE ONLY)
  Sovra.Topology9x9.bind({
    text,
    zse,
    cdlm: traverseCDLM9x9(text),
    trifold,
    gates: enginesFired
  });

  // 2) Numeric synthesis
  const scores = synthesizeCDLMScores({
    zse,
    trifold,
    enginesFired
  });

  // 3) UI emission
  emitCDLMScores(scores);

  return scores;
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
  return traverseCDLM9x9(text, caller);
}

/* ============================================================
   CDLM ROW-AWARE TRAVERSAL (READ-ONLY)
   - Walks 9×9 coordinates
   - No aggregation, no scoring, no UI
   ============================================================ */

function traverseCDLM9x9(text, caller = "core_diagnostic_map") {
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
   9×9 TOPOLOGY BINDER (NFIE-compliant, descriptive-only)
   Purpose:
     - Bind CDLM + ZSE outputs to a reference topology (9×9)
     - Provide placement + resource-movement validation for zero-sum
   Non-goals:
     - No conclusions, no recommendations, no enforcement
   Emits:
     - window event: "sovra:topology" { detail: payload }
   ============================================================ */

(() => {
  window.Sovra = window.Sovra || {};

  /* ----------------------------
     1) 9×9 reference topology
     ---------------------------- */

  const TOPOLOGY_9X9 = Object.freeze({
    id: "SOVRA_9X9_TOPOLOGY_V1",
    domains: Object.freeze({
      Economics: Object.freeze({
        resources: Object.freeze(["money", "credit", "wealth", "jobs", "housing", "loans", "interest", "assets"]),
        routingCues: Object.freeze(["bank", "lender", "mortgage", "credit score", "interest rate", "underwriting", "investment"]),
      }),
      Education: Object.freeze({
        resources: Object.freeze(["access", "placement", "grades", "discipline", "funding", "curriculum", "credentials"]),
        routingCues: Object.freeze(["tracking", "gifted", "AP", "discipline", "suspension", "standardized", "accreditation"]),
      }),
      Entertainment: Object.freeze({
        resources: Object.freeze(["visibility", "roles", "platform", "reach", "brand", "franchise", "algorithmic distribution"]),
        routingCues: Object.freeze(["casting", "studio", "agent", "box office", "streaming", "algorithm", "franchise", "relatable"]),
      }),
      Labor: Object.freeze({
        resources: Object.freeze(["hiring", "promotion", "pay", "benefits", "security", "status"]),
        routingCues: Object.freeze(["HR", "manager", "promotion", "performance", "culture fit", "referral", "pipeline"]),
      }),
      Law: Object.freeze({
        resources: Object.freeze(["rights", "protection", "due process", "bail", "sentencing", "access to counsel"]),
        routingCues: Object.freeze(["probable cause", "prosecution", "plea", "bail", "sentencing", "qualified immunity"]),
      }),
      Politics: Object.freeze({
        resources: Object.freeze(["representation", "access", "votes", "policy", "legitimacy", "speech reach"]),
        routingCues: Object.freeze(["district", "ballot", "turnout", "PAC", "pundit", "platform", "messaging"]),
      }),
      Religion: Object.freeze({
        resources: Object.freeze(["moral authority", "belonging", "purity status", "legitimacy"]),
        routingCues: Object.freeze(["doctrine", "sin", "virtue", "mission", "civilizing", "chosen", "holy"]),
      }),
      Sex: Object.freeze({
        resources: Object.freeze(["desirability", "safety", "status", "pairing access", "marriageability"]),
        routingCues: Object.freeze(["preference", "type", "fetish", "exotic", "pure", "protect", "dangerous"]),
      }),
      War: Object.freeze({
        resources: Object.freeze(["safety", "life", "territory", "sovereignty", "security", "justification"]),
        routingCues: Object.freeze(["enemy", "threat", "collateral", "security", "terror", "occupation", "doctrine"]),
      }),
    }),

    // 9×9 columns (kept as labels for GUI placement; not “logic”)
    columns: Object.freeze([
      "BranchingPattern",
      "ConnectionTopology",
      "RoutingFlowBehavior",
      "OutputSymptoms",
      "DefensiveReaction",
      "MemeticReplication",
      "CulturalPressure",
      "EvolutionPressure",
      "NetworkContagionDynamics"
    ])
  });

  /* ----------------------------
     2) Zero-sum “resource movement” validator
     - Zero-sum is only “valid” if movement is asserted.
     - This does NOT claim truth—only detects movement language.
     ---------------------------- */

  const MOVE_VERBS = Object.freeze([
    "take", "took", "taken",
    "steal", "stole", "stolen",
    "remove", "removed",
    "replace", "replaced",
    "erase", "erased",
    "deny", "denied",
    "ban", "banned",
    "cut", "cuts", "cutting",
    "strip", "stripped",
    "lose", "lost",
    "give", "gave",
    "grant", "granted",
    "withhold", "withheld",
    "transfer", "transferred",
    "shift", "shifted"
  ]);

  function safeLower(s) { return String(s || "").toLowerCase(); }

  function detectResourceMovement(text, domainDef) {
    const t = safeLower(text);
    const verbHit = MOVE_VERBS.some(v => t.includes(v));
    const resourceHit = (domainDef?.resources || []).some(r => t.includes(String(r).toLowerCase()));
    return Object.freeze({
      asserted: !!(verbHit && resourceHit),
      verbHit,
      resourceHit
    });
  }

  /* ----------------------------
     3) Domain placement heuristics (descriptive)
     - Uses routing cues + resource mentions
     - Returns a ranked list (not a “decision”)
     ---------------------------- */

  function scoreDomain(text, domainDef) {
    const t = safeLower(text);
    const cues = domainDef?.routingCues || [];
    const resources = domainDef?.resources || [];

    const cueHits = cues.filter(c => t.includes(String(c).toLowerCase())).length;
    const resourceHits = resources.filter(r => t.includes(String(r).toLowerCase())).length;

    // Light weighting: cues > resources (routing is more diagnostic than nouns)
    const score = (cueHits * 2) + (resourceHits * 1);

    return Object.freeze({ score, cueHits, resourceHits });
  }

  function rankDomains(text) {
    const out = [];
    for (const [name, def] of Object.entries(TOPOLOGY_9X9.domains)) {
      const s = scoreDomain(text, def);
      out.push(Object.freeze({ domain: name, ...s }));
    }
    return Object.freeze(out.sort((a, b) => b.score - a.score));
  }

  /* ----------------------------
     4) Bind CDLM + ZSE to topology
     ---------------------------- */

  function bindTo9x9({ text = "", zse = null, cdlm = null, trifold = null, gates = {}, domainHint = null } = {}) {
    const t = String(text || "");
    const ranked = rankDomains(t);

    // If caller provides a domain hint, keep it as a “pinned” context (not forced)
    const pinned = domainHint ? String(domainHint) : null;

    const top = ranked[0] || { domain: "UNSPECIFIED", score: 0, cueHits: 0, resourceHits: 0 };
    const chosenDomain = pinned && TOPOLOGY_9X9.domains[pinned] ? pinned : top.domain;
    const domainDef = TOPOLOGY_9X9.domains[chosenDomain] || null;

    // Zero-sum detection (reuse your existing detector if present)
    const zs = (typeof window.runZSEStandalone === "function")
      ? window.runZSEStandalone(t)
      : (typeof window.detectZeroSum === "function")
        ? window.detectZeroSum(t)
        : { detected: false };

    const movement = domainDef ? detectResourceMovement(t, domainDef) : Object.freeze({ asserted: false, verbHit: false, resourceHit: false });

    // “Zero-sum valid” here means: zero-sum language + asserted movement in the chosen domain
    const zeroSumStructural = Object.freeze({
      detected: !!zs?.detected,
      score: Number(zs?.score || 0),
      movementAsserted: !!movement.asserted,
      movementSignals: movement,
      domain: chosenDomain
    });

    // CDLM/ZSE “group” payloads remain raw—topology only places them
    const payload = Object.freeze({
      ok: true,
      kind: "SOVRA_9X9_BINDING_PAYLOAD",
      topologyId: TOPOLOGY_9X9.id,
      gates: Object.freeze({ ...gates }),

      placement: Object.freeze({
        pinnedDomain: pinned,
        chosenDomain,
        rankedDomains: ranked.slice(0, 5) // keep GUI light
      }),

      metrics: Object.freeze({
        cdlm: cdlm ? Object.freeze({ ...cdlm }) : null,
        zse: zse ? Object.freeze({ ...zse }) : null,
        trifold: trifold ? Object.freeze({ ...trifold }) : null
      }),

      zeroSumStructural
    });

    try {
      window.dispatchEvent(new CustomEvent("sovra:topology", { detail: payload }));
    } catch (_) {}

    return payload;
  }

  /* ----------------------------
     5) Public API
     ---------------------------- */

  window.Sovra.Topology9x9 = window.Sovra.Topology9x9 || Object.freeze({
    ref: TOPOLOGY_9X9,
    bind: bindTo9x9
  });

  /* ----------------------------
     6) Convenience: bind directly from AnalysisSuite output
     ---------------------------- */

  window.Sovra.bindAnalysisTo9x9 = window.Sovra.bindAnalysisTo9x9 || function bindAnalysisTo9x9(analysisResult, domainHint = null) {
    const a = analysisResult || {};
    return window.Sovra.Topology9x9.bind({
      text: a.text || "",
      zse: a.zse || null,
      cdlm: a.cdlm || null,
      trifold: a?.trifold || null,
      gates: a?.summary?.gates || {},
      domainHint
    });
  };

})();


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
window.Sovra.CDLMResolver = (() => {
  function resolveCollapse(cdlmOutput) {
    const context = {
      collapseDetected: false,
      visibility: {},
      field: {},
      speech: { allowed: true, maxSentences: 2 }
    };

    // Example logic (simplified)
    if (cdlmOutput.omissions?.length > 0) {
      context.collapseDetected = true;
      context.visibility.omissionsDetected = true;
    }

    if (cdlmOutput.powerAsymmetryScore > 0.7) {
      context.field.powerAsymmetryLikely = true;
    }

    // Store for VDUManager and Sovra Speaks
    window.Sovra.CollapseContext = context;

    // Signal downstream modules
    window.Sovra.SignalBus.emit("CDLM_READY", cdlmOutput);
  }

  return Object.freeze({ resolveCollapse });
})();

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

const FRAGMENTS = Object.freeze({
  visibility: Object.freeze({
    concentration: ["visibility", "concentrated", "single", "institutional", "perspective"],
    dispersion: ["visibility", "distributed", "across", "multiple", "sources"],
    lowResolution: ["external", "groups", "lower", "resolution"]
  }),
  power: Object.freeze({
    asymmetry: ["power", "asymmetry", "likely"],
    symmetry: ["power", "distribution", "appears", "balanced"]
  }),
  negativeSpace: Object.freeze({
    omissions: ["structurally", "relevant", "elements", "did", "not", "surface"],
    attenuation: ["attenuation", "without", "explicit", "exclusion"]
  })
});

/* ============================================================
   Fragment Selection
   ============================================================ */
function selectFragments(vdu) {
  const out = [];

  if (vdu.visibility?.concentratedAroundInstitution) {
    out.push(FRAGMENTS.visibility.concentration);
  }

  if (vdu.visibility?.externalLowResolution) {
    out.push(FRAGMENTS.visibility.lowResolution);
  }

  if (vdu.field?.powerAsymmetryLikely) {
    out.push(FRAGMENTS.power.asymmetry);
  }

  if (vdu.visibility?.omissionsDetected) {
    out.push(FRAGMENTS.negativeSpace.omissions);
  }

  return out;
}

/* ============================================================
   Sentence Assembly
   ============================================================ */
function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function assembleSentences(fragmentSets, maxSentences = 2) {
  const sentences = [];

  for (const frag of fragmentSets.slice(0, maxSentences)) {
    const tokens = shuffle(frag);
    const text = tokens.join(" ") + ".";
    sentences.push(text.charAt(0).toUpperCase() + text.slice(1));
  }

  return sentences.join(" ");
}

/* ============================================================
   Semantic Filtering
   ============================================================ */
const SEMANTIC_FIELD = Object.freeze({
  allow: Object.freeze(["visibility", "structure", "resolution", "power", "asymmetry", "omissions", "attenuation"]),
  block: Object.freeze(["blame", "intent", "belief", "morality", "guilt"])
});

function filterTokens(tokens) {
  const allow = new Set(SEMANTIC_FIELD.allow);
  const block = new Set(SEMANTIC_FIELD.block);

  return tokens.filter(t => {
    const k = t.toLowerCase();
    if (block.has(k)) return false;
    if (allow.size === 0) return true;
    return allow.has(k);
  });
}

/* ============================================================
   Reflection Modules
   ============================================================ */
function visibilityReflection(vdu) {
  if (!vdu.visibility?.concentratedAroundInstitution &&
      !vdu.visibility?.externalLowResolution &&
      !vdu.visibility?.omissionsDetected) {
    return null;
  }

  const frags = selectFragments(vdu);
  const filtered = frags.map(filterTokens);
  return assembleSentences(filtered, vdu.speech?.maxSentences || 2);
}

function powerAsymmetryReflection(vdu) {
  if (!vdu.field?.powerAsymmetryLikely) return null;

  const frags = [FRAGMENTS.power.asymmetry];
  const filtered = frags.map(filterTokens);
  return assembleSentences(filtered, 1);
}

function negativeSpaceReflection(vdu) {
  if (!vdu.visibility?.omissionsDetected) return null;

  const frags = [FRAGMENTS.negativeSpace.omissions, FRAGMENTS.negativeSpace.attenuation];
  const filtered = frags.map(filterTokens);
  return assembleSentences(filtered, 2);
}

/* ============================================================
   Voice Generator
   ============================================================ */
function generateVoice(vdu) {
  const outputs = [];

  const v = visibilityReflection(vdu);
  if (v) outputs.push(v);

  const p = powerAsymmetryReflection(vdu);
  if (p) outputs.push(p);

  const n = negativeSpaceReflection(vdu);
  if (n) outputs.push(n);

  if (outputs.length === 0) return null;

  return outputs.slice(0, vdu.speech.maxSentences).join(" ");
}


/* ============================================================
   SOVRA SPEAKS — VDU FILTERED
   Version: 1.0
   Mode: Full-Parse Only | On-Site Generated | Non-Patterned
   ============================================================ */

window.Sovra = window.Sovra || {};

window.Sovra.Speaks = (() => {

  /* =========================
     HARD GATES
     ========================= */

  function gateCheck(vdu) {
    if (!vdu?.speech?.allowed) return false;
    if (vdu?.field?.resolution !== "full") return false;
    if (!SOVRA_GATES.sovraSpeaks()) return false;
    return true;
  }

  /* =========================
     SEMANTIC FIELD (LOCKED)
     ========================= */

  const SEMANTIC_FIELD = Object.freeze({
    restraint: true,
    negativeSpace: true,
    recursion: true,
    nonAgentic: true,
    nonDirective: true
  });

  /* =========================
     TACTICAL LOCK (STIP 022)
     ========================= */

  function passesTacticalLock(text) {
    if (!text || typeof text !== "string") return false;
    if (text.length > 420) return false; // compression enforced
    if (/must|should|they|intent|because/i.test(text)) return false;
    return true;
  }

  /* =========================
     PATTERN REJECTION
     ========================= */

  const recentHashes = new Set();

  function isPatternRecognizable(text) {
    const hash = text
      .toLowerCase()
      .replace(/\s+/g, " ")
      .slice(0, 120);

    if (recentHashes.has(hash)) return true;
    recentHashes.add(hash);

    if (recentHashes.size > 12) {
      recentHashes.clear();
    }

    return false;
  }

  /* =========================
     ON-SIGHT GENERATION
     ========================= */

  function generateText(vdu) {
    const { visibility, field } = vdu;

    if (!visibility?.omissionsDetected) return null;

    const fragments = [];

    // Fragment 1 — absence description
    fragments.push(
      "Some structurally relevant explanations did not surface within the retrieved material."
    );

    // Fragment 2 — scope qualifier
    fragments.push(
      "At this resolution, such attenuation can occur without explicit exclusion."
    );

    // Fragment 3 — systems anchor (optional)
    if (field?.powerAsymmetryLikely) {
      fragments.push(
        "Comparable visibility patterns have been observed in high‑power informational systems."
      );
    }

    return fragments.slice(0, vdu.speech.maxSentences).join(" ");
  }

  /* =========================
     PUBLIC API
     ========================= */

  function speak(vdu) {
    if (!gateCheck(vdu)) return null;

    const draft = generateText(vdu);
    if (!draft) return null;

    if (!passesTacticalLock(draft)) return null;
    if (isPatternRecognizable(draft)) return null;

    return draft;
  }

  return Object.freeze({ speak });

})();

/* ============================================================
   VDUManager — Passive Listener + Conditional Renderer
   Listens for CDLM output and renders VDU block if collapse is confirmed
   ============================================================ */

window.Sovra = window.Sovra || {};

window.Sovra.VDUManager = (() => {
  const containerId = "vdu-container"; // You can change this to your actual mount point

  function renderVDUBlock(results, collapseContext = {}) {
    if (!window.VDU || typeof window.VDU.run !== "function") return;

    const block = window.VDU.run(results, collapseContext);
    if (!block) return;

    const container = document.getElementById(containerId);
    if (container) {
      container.innerHTML = ""; // Clear previous render
      container.appendChild(block);
       const voiceText = window.Sovra.Speaks.speak(block.vdu);
if (voiceText) {
  renderVoiceCard(voiceText);
}

    } else {
      console.warn("VDUManager: Container not found:", containerId);
    }
  }

  function listen() {
    window.Sovra.SignalBus.on("CDLM_READY", (cdlm) => {
      const results = window.Sovra?.LastSearchResults || [];
      const collapseContext = window.Sovra?.CollapseContext || {};

      renderVDUBlock(results, collapseContext);
    });
  }

  return Object.freeze({ listen });
})();
function renderVoiceCard(text) {
  const container = document.getElementById("voice-output");
  if (!container) {
    console.warn("Voice output container not found: #voice-output");
    return;
  }

  const card = document.createElement("div");
  card.className = "voice-card";

  const body = document.createElement("div");
  body.className = "voice-text";
  body.textContent = text;

  card.appendChild(body);
  container.innerHTML = ""; // Clear previous voice output
  container.appendChild(card);
}


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

const vduBlock = VDU.run(list, {
  cdlm: scores?.cdlm,
  contra: scores?.isContradictionArtifact === true
});

if (vduBlock) results.appendChild(vduBlock);


    list.forEach((r, i) => {
      // --- CDLM traversal (non-force, per-object) ---
const traversal = emitTraversalEvent(r, data.query_token || "pass-0");

// Forward + lateral observation (read-only)
const gridObservations = traverseCDLM(traversal.text, "public_runtime");
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


