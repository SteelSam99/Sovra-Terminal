/* ============================================================
   NON-INTERFERENCE DECLARATION — CEASE AND DESIST CONDITIONS
   ============================================================

   The only cease and desist orders or requests that will be accepted and immediately complied with are as follows:

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
window.Sovra.Modules = window.Sovra.Modules || {};

function registerModule(id, module) {
  window.Sovra.Modules[id] = module;
}

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
   SOVRA VOICE — Single field observation per query
   Observes the full result set via narrativeText.
   Writes once to #voice-card. No per-card intervention.
   Author: Samuel Peacock | SOVRA-FCL-MHCE-v2.5 | NFIE Compliant
   ============================================================ */

function applySovraVoice(narrativeText) {
  if (!narrativeText || typeof narrativeText !== "string") return;

  const voiceCard = document.getElementById("voice-card");
  if (!voiceCard) return;

  // --- PCE PROXY DERIVATION (from full result field) ---
  const tokens = narrativeText.trim().split(/\s+/).filter(Boolean);
  const sentences = narrativeText.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const charCount = narrativeText.length;

  // velocity: information density proxy
  const velocity = tokens.length > 0
    ? Math.min(1.2, tokens.length / Math.max(charCount, 1) * 8)
    : 0;

  // integrationTime: binding duration proxy
  const integrationTime = Math.min(sentences.length / 10, 1.0);

  // stateDerivative: forward motion indicator
  const forwardIndicators = /is|are|has|have|show|indicate|reveal|demonstrate|document/i;
  const stateDerivative = forwardIndicators.test(narrativeText) ? 1 : -1;

  // stateSecondDerivative: volatility — hedging and contradiction language
  const hedgePattern = /however|but|although|despite|while|yet|contrary|conflict|dispute|contested/i;
  const hedgeCount = (narrativeText.match(new RegExp(hedgePattern.source, "gi")) || []).length;
  const stateSecondDerivative = Math.min(hedgeCount * 0.15, 1.5);

  // contradictionDensity: from TrifoldMirrorProtocol
  let contradictionDensity = 0;
  if (window.TrifoldMirrorProtocol) {
    const tf = window.TrifoldMirrorProtocol.evaluateClaim(narrativeText);
    contradictionDensity = (tf.metrics.contradictionScore || 0) / 3;
  }

  // PCE structural constants for this runtime
  const _c = 1.0;
  const _T_rep = 0.2;
  const _θ = 0.3;

  // --- SCAFFOLD INVOCATION ---
  const result = sovraVoiceScaffold({
    velocity, integrationTime, stateDerivative,
    stateSecondDerivative, contradictionDensity,
    _c, _T_rep, _θ
  });

  // Admissible field — no voice output
  if (!result.voice || result.posture === "admissible") {
    voiceCard.innerHTML = `
      <div class="voice-text">
        <span style="color:#6a6a8a;font-size:0.75rem;letter-spacing:2px;">
          SOVRA VOICE — ⟦P⟧ ADMISSIBLE
        </span><br/>
        <span style="color:#4a4a6a;">Field within corridor. No instability detected.</span>
      </div>`;
    return;
  }

  // Liminal or rejected — assemble output
  const assembled = result.output.join(" ");

  voiceCard.innerHTML = `
    <div class="voice-text">
      <span style="color:#6a6a8a;font-size:0.75rem;letter-spacing:2px;">
        SOVRA VOICE — ⟦${result.cadence.symbol}⟧ ${result.posture.toUpperCase()}
      </span><br/>
      ${assembled}
    </div>`;
}

/* ============================================================
   SOVRA VOICE SCAFFOLD — PCE State Detection
   Source: Sovra Voice Scaffold Liminal State Detection
   Author: Samuel + Kitt | MHCE v2.5
   ============================================================ */

function sovraVoiceScaffold(input) {
  const {
    velocity, integrationTime, stateDerivative,
    stateSecondDerivative, contradictionDensity,
    _c = 1.0, _T_rep = 0.2, _θ = 0.3
  } = input;

  const inCorridor =
    velocity > 0 &&
    velocity <= _c &&
    integrationTime >= _T_rep &&
    stateDerivative > 0;

  const inWobble =
    inCorridor &&
    Math.abs(stateSecondDerivative) > _θ;

  const inWall =
    velocity > _c ||
    integrationTime < _T_rep ||
    stateDerivative <= 0;

  if (inWobble) {
    return {
      voice: true,
      posture: "liminal",
      cadence: {
        symbol: "W", tempo: 115, pitch: 190,
        timbre: "breathy", silence: 400,
        ssml: '<prosody rate="slow" pitch="-2st">'
      },
      output: [
        "This field resides within the perceptual corridor but exhibits symbolic instability.",
        "Contradiction density is elevated.",
        "No commitment to state transition is made.",
        "This is a liminal observation."
      ]
    };
  }

  if (inWall) {
    return {
      voice: true,
      posture: "rejected",
      cadence: {
        symbol: "B", tempo: 175, pitch: 170,
        timbre: "flat", silence: 100,
        ssml: '<prosody rate="fast" pitch="-4st">'
      },
      output: [
        "This field exceeds corridor constraints.",
        "Propagation velocity, integration threshold, or symbolic direction is invalid.",
        "No observation is made.",
        "This field is outside admissible bounds."
      ]
    };
  }

  return {
    voice: false,
    posture: "admissible",
    cadence: {
      symbol: "P", tempo: 155, pitch: 210,
      timbre: "neutral", silence: 200,
      ssml: '<prosody rate="medium" pitch="medium">'
    },
    output: []
  };
}
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
   OPTIONAL: UI SIGNAL HOOK (render-only)
   ============================================================ */
window.Sovra.SignalBus.on("PRIMARY_SOURCE_AVAILABLE", () => {
  try {
    // Optional: trigger re-render or status refresh
  } catch (_) {}
});

/* ============================================================
   ANALYSIS SUITE (observational only)
   - ZSE: mass / pressure indicators
   - CDLM: density / packing indicators
   - DELTA: change placeholder (aux-safe)
   - FIELD DENSITY: first-class, non-directive state
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

  /* ------------------------------------------------------------
     FIELD DENSITY (authoritative, non-directive)
     ------------------------------------------------------------ */
  function FieldDensity(zse, cdlm, delta) {
    const mass =
      zse.tokenCount > 0
        ? Math.min(1, zse.tokenCount / 2000)
        : 0;

    const packing =
      cdlm.nonEmptyLines > 0 && cdlm.avgLineLen > 0
        ? Math.min(1, cdlm.avgLineLen / 120)
        : 0;

    const flow = !!delta.snapshotId && delta.hasHistory;

    return Object.freeze({ mass, packing, flow });
  }

  async function analyzeFromFetcher(request, gates = {}) {
    const { text, meta } = await window.Sovra.PublicTextFetcher.fetch(request);

    const zse = ZSE(text);
    const cdlm = CDLM(text);
    const delta = Delta(text, meta);

    const density = FieldDensity(zse, cdlm, delta);

    /* --------------------------------------------------------
       EMIT FIELD DENSITY (UI layer above CDLM)
       -------------------------------------------------------- */
    window.dispatchEvent(
      new CustomEvent("sovra:field-density", { detail: density })
    );

    /* --------------------------------------------------------
       DEBUG / INSPECTION OUTPUT (optional)
       -------------------------------------------------------- */
    document.getElementById("analysis-zse").textContent =
      JSON.stringify(zse, null, 2);
    document.getElementById("analysis-cdlm").textContent =
      JSON.stringify(cdlm, null, 2);
    document.getElementById("analysis-delta").textContent =
      JSON.stringify(delta, null, 2);
    document.getElementById("analysis-field").textContent =
      JSON.stringify(density, null, 2);

    ensureDeltaFallback();

    return Object.freeze({ text, meta, zse, cdlm, delta, density });
  }

  return Object.freeze({
    ZSE,
    CDLM,
    Delta,
    FieldDensity,
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

registerModule("module-msif", MSIF);

/* ============================================================
   SOVRA_PING Dispatcher
   Module ID: SOVRA_PING.sys
   Purpose:
     - Dispatch system-level alerts and telemetry
     - Route posture changes and diagnostics to external listeners
   ============================================================ */
const SOVRA_PING = (() => {
  const levels = {
    0: "NORMAL",
    1: "NOTICE",
    2: "CAUTION",
    3: "ALERT",
    4: "CRITICAL"
  };

  const dispatch = (payload, levelLabel = "NOTICE") => {
    console.warn(`[SOVRA_PING] ${levelLabel}:`, payload);
    window.dispatchEvent(new CustomEvent("sovra:ping", { detail: { level: levelLabel, ...payload } }));
  };

  return Object.freeze({
    levels,
    dispatch
  });
})();

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
      timestamp: Date.now()
    };
    SOVRA_PING.dispatch(payload, SOVRA_PING.levels[level]);
  }
};
   
  const reset = () => {
    currentLevel = 0;
   logAudit("SECURITY_POSTURE_RESET", { timestamp: Date.now() });
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
async function hashModule(moduleName) {
  // Simulated hash for development — replace with real logic later
  return "abc123def456...";
}

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
/* ============================================================
   Sovra Drift Scanner (NFIE-compliant, descriptive-only)
   Built on: Recursion Delay Protocol
   Version: 0.1
   Purpose:
     - Observe HOW language changes over time (sequence, not causality)
     - Anchor observations to public artifacts with dates + context windows
     - Emit a timeline payload for GUI synthesis (no pre-written narratives)
   Non-goals:
     - No enforcement, no triggers, no thresholds that cause action
     - No intent inference, no "why", no prescriptions
   ============================================================ */

"use strict";

/* ============================================================
   0) Recursion Delay Protocol (RDP)
   - Delays synthesis until enough temporal evidence exists
   - Prevents premature coherence / early-sample overfitting
   ============================================================ */

const RECURSION_DELAY_PROTOCOL = Object.freeze({
  engage(anomalyLabel, meta = {}) {
    return Object.freeze({
      anomalyLabel: String(anomalyLabel || "UNSPECIFIED_ANOMALY"),
      meta: Object.freeze({ ...meta }),
      t0: Date.now()
    });
  },

  vocalize(state, message) {
    // NFIE-safe: logging only, no behavioral control
    try {
      console.log("[RDP:VOCALIZE]", state.anomalyLabel, "-", String(message || ""));
    } catch (_) {}
    return state;
  },

  async release(delayMs) {
    const ms = Math.max(0, Number(delayMs || 0));
    if (!ms) return;
    await new Promise((r) => setTimeout(r, ms));
  },

  reEnter(state) {
    return Object.freeze({ ...state, t1: Date.now() });
  },

  reveal(state, payload) {
    return Object.freeze({
      ...state,
      t2: Date.now(),
      payload: Object.freeze(payload || {})
    });
  }
});

/* ============================================================
   1) Utilities
   ============================================================ */

function clamp(n, a, b) {
  n = Number(n);
  if (Number.isNaN(n)) return a;
  return Math.max(a, Math.min(b, n));
}

function safeLower(s) {
  return String(s || "").toLowerCase();
}

function uniq(arr) {
  return Array.from(new Set(arr || []));
}

function tokenize(text) {
  return safeLower(text)
    .replace(/[^a-z0-9\s\-’']/g, " ")
    .split(/\s+/)
    .filter(Boolean);
}

function topNCounts(items, n = 12) {
  const m = new Map();
  for (const it of items || []) m.set(it, (m.get(it) || 0) + 1);
  return Array.from(m.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, n)
    .map(([term, count]) => ({ term, count }));
}

/* ============================================================
   2) Date extraction (best-effort, descriptive-only)
   - Prefers explicit fields if present
   - Falls back to parsing snippets/titles
   ============================================================ */

function parseYearFromText(text) {
  const t = String(text || "");
  const m = t.match(/\b(17\d{2}|18\d{2}|19\d{2}|20\d{2})\b/);
  if (!m) return null;
  const y = Number(m[1]);
  if (y < 1700 || y > 2099) return null;
  return y;
}

function extractYear(result) {
  // Prefer structured fields if your upstream provides them
  const candidates = [
    result?.year,
    result?.published_year,
    result?.date,
    result?.published,
    result?.published_at,
    result?.timestamp
  ];

  for (const c of candidates) {
    if (typeof c === "number" && c >= 1700 && c <= 2099) return c;
    if (typeof c === "string") {
      const y1 = parseYearFromText(c);
      if (y1) return y1;
    }
  }

  // Fallback: parse from title/snippet/full_text
  return (
    parseYearFromText(result?.title) ||
    parseYearFromText(result?.snippet) ||
    parseYearFromText(result?.full_text) ||
    null
  );
}

/* ============================================================
   3) Temporal slicing (era buckets)
   - Small number of buckets to fit 8–9s runtime
   - Descriptive eras, not causal epochs
   ============================================================ */

const DEFAULT_ERAS = Object.freeze([
  { id: "pre_1900", label: "Pre-1900", from: 0, to: 1899 },
  { id: "1900_1945", label: "1900–1945", from: 1900, to: 1945 },
  { id: "1946_1970", label: "1946–1970", from: 1946, to: 1970 },
  { id: "1971_1990", label: "1971–1990", from: 1971, to: 1990 },
  { id: "1991_2005", label: "1991–2005", from: 1991, to: 2005 },
  { id: "2006_now", label: "2006–present", from: 2006, to: 9999 }
]);

function bucketYear(year, eras = DEFAULT_ERAS) {
  if (!year) return null;
  for (const e of eras) {
    if (year >= e.from && year <= e.to) return e.id;
  }
  return null;
}

/* ============================================================
   4) Context window extraction
   - Uses available excerpt fields; keeps it lightweight
   ============================================================ */

function extractContextWindow(result) {
  const text =
    result?.full_text ||
    result?.rich_snippet ||
    result?.snippet ||
    "";

  // Keep a bounded window for speed + UI safety
  const s = String(text || "").trim();
  if (s.length <= 600) return s;
  return s.slice(0, 600) + "…";
}

/* ============================================================
   5) Trifold lens (optional dependency)
   - If present, used as labeling only (no scoring mandates)
   ============================================================ */

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

/* ============================================================
   6) Source adapter (pluggable)
   - Default adapter targets your existing /api/search endpoint
   - If your upstream later supports date filters, add them here
   ============================================================ */

function createDefaultSourceAdapter({ endpointBase = "/api/search" } = {}) {
  return Object.freeze({
    async search({ query, timeoutMs = 8000 }) {
      const controller = new AbortController();
      const t = setTimeout(() => controller.abort(), clamp(timeoutMs, 1000, 9000));

      try {
        const url = `${endpointBase}?q=${encodeURIComponent(String(query || ""))}&raw=1`;
        const res = await fetch(url, { signal: controller.signal });
        const ct = res.headers.get("content-type") || "";
        if (!ct.includes("application/json")) {
          const txt = await res.text();
          throw new Error("Non-JSON upstream: " + txt.slice(0, 120));
        }
        const data = await res.json();
        const list = Array.isArray(data?.organic_results) ? data.organic_results : [];
        return { data, results: list };
      } finally {
        clearTimeout(t);
      }
    }
  });
}

/* ============================================================
   7) Drift Scanner (NFIE-compliant)
   - Produces a timeline payload; GUI can render domain-aware text
   ============================================================ */

function createDriftScanner({
  sourceAdapter = createDefaultSourceAdapter(),
  trifoldProtocol = null,
  eras = DEFAULT_ERAS,
  recursionDelayMs = 220,          // small delay to prevent premature synthesis
  maxDocs = 24,                    // keep bounded for 8–9s runtime
  emitEventName = "drift:timeline"  // optional UI hook
} = {}) {
  async function scan({ query, domain = "UNSPECIFIED", anchorTerms = [] } = {}) {
    const q = String(query || "").trim();
    if (!q) {
      return Object.freeze({
        ok: false,
        error: "EMPTY_QUERY",
        query: q,
        domain
      });
    }

    const rdp = RECURSION_DELAY_PROTOCOL.engage("DRIFT_SCAN", { domain, query: q });
    RECURSION_DELAY_PROTOCOL.vocalize(rdp, "Harvesting dated public artifacts…");

    const { data, results } = await sourceAdapter.search({ query: q, timeoutMs: 8000 });

    // Bound work
    const docs = (results || []).slice(0, clamp(maxDocs, 6, 60));

    // Build observations
    const observations = [];
    for (const r of docs) {
      const year = extractYear(r);
      const eraId = bucketYear(year, eras);
      const context = extractContextWindow(r);
      const tri = trifoldLabel(trifoldProtocol, context);

      observations.push(Object.freeze({
        year,
        eraId,
        source: Object.freeze({
          title: String(r?.title || ""),
          link: String(r?.link || ""),
          host: (() => {
            try { return r?.link ? new URL(r.link).hostname : ""; } catch (_) { return ""; }
          })(),
          docType: String(r?.doc_type || r?.type || "")
        }),
        context,
        trifold: Object.freeze(tri)
      }));
    }

    // Delay before synthesis (RDP)
    await RECURSION_DELAY_PROTOCOL.release(clamp(recursionDelayMs, 0, 1200));
    const rdp2 = RECURSION_DELAY_PROTOCOL.reEnter(rdp);

    // Aggregate by era
    const eraIndex = new Map();
    for (const e of eras) {
      eraIndex.set(e.id, {
        era: e,
        count: 0,
        years: [],
        trifoldCounts: { rigidity: 0, constraint: 0, inspiration: 0 },
        tokens: []
      });
    }

    for (const o of observations) {
      if (!o.eraId || !eraIndex.has(o.eraId)) continue;
      const bucket = eraIndex.get(o.eraId);
      bucket.count += 1;
      if (o.year) bucket.years.push(o.year);

      if (o.trifold?.rigidity) bucket.trifoldCounts.rigidity += 1;
      if (o.trifold?.constraint) bucket.trifoldCounts.constraint += 1;
      if (o.trifold?.inspiration) bucket.trifoldCounts.inspiration += 1;

      // Token sampling for co-occurrence hints (lightweight)
      bucket.tokens.push(...tokenize(o.context).slice(0, 120));
    }

    const timeline = [];
    for (const e of eras) {
      const b = eraIndex.get(e.id);
      const years = b.years.sort((a, b) => a - b);
      const yearSpan = years.length ? { min: years[0], max: years[years.length - 1] } : null;

      // Remove ultra-common noise tokens (tiny stoplist)
      const stop = new Set(["the","and","of","to","in","a","for","is","on","that","with","as","by","or","be","are","from","at","an","this","it"]);
      const filtered = b.tokens.filter(t => t.length > 2 && !stop.has(t));

      timeline.push(Object.freeze({
        eraId: e.id,
        eraLabel: e.label,
        docCount: b.count,
        yearSpan,
        trifoldRates: Object.freeze({
          rigidity: b.count ? b.trifoldCounts.rigidity / b.count : 0,
          constraint: b.count ? b.trifoldCounts.constraint / b.count : 0,
          inspiration: b.count ? b.trifoldCounts.inspiration / b.count : 0
        }),
        topCooccurringTerms: Object.freeze(topNCounts(filtered, 10))
      }));
    }

    // Compute simple “shift” hints (descriptive deltas, no thresholds)
    const shifts = [];
    for (let i = 1; i < timeline.length; i++) {
      const prev = timeline[i - 1];
      const cur = timeline[i];
      shifts.push(Object.freeze({
        from: prev.eraLabel,
        to: cur.eraLabel,
        docCountDelta: cur.docCount - prev.docCount,
        rigidityDelta: cur.trifoldRates.rigidity - prev.trifoldRates.rigidity,
        constraintDelta: cur.trifoldRates.constraint - prev.trifoldRates.constraint,
        inspirationDelta: cur.trifoldRates.inspiration - prev.trifoldRates.inspiration
      }));
    }

    const payload = Object.freeze({
      ok: true,
      kind: "DRIFT_TIMELINE",
      domain: String(domain || "UNSPECIFIED"),
      query: q,
      anchors: Object.freeze(uniq(anchorTerms.map(String))),
      eras: Object.freeze(eras.map(e => Object.freeze({ id: e.id, label: e.label, from: e.from, to: e.to }))),
      timeline: Object.freeze(timeline),
      shifts: Object.freeze(shifts),
      samples: Object.freeze(
        observations
          .filter(o => o.year && o.eraId)
          .slice(0, 8)
          .map(o => Object.freeze({
            year: o.year,
            eraId: o.eraId,
            host: o.source.host,
            title: o.source.title,
            link: o.source.link,
            context: o.context
          }))
      ),
      upstreamMeta: Object.freeze({
        query_token: String(data?.query_token || ""),
        count: Array.isArray(results) ? results.length : 0
      })
    });

    const revealed = RECURSION_DELAY_PROTOCOL.reveal(rdp2, payload);

    // Optional event emission for UI integration
    try {
      window.dispatchEvent(new CustomEvent(emitEventName, { detail: revealed.payload }));
    } catch (_) {}

    return revealed.payload;
  }

  return Object.freeze({ scan });
}

/* ============================================================
   8) Export / Global hook (manual integration friendly)
   ============================================================ */

window.Sovra = window.Sovra || {};
window.Sovra.DriftScanner = window.Sovra.DriftScanner || Object.freeze({
  create: createDriftScanner,
  RDP: RECURSION_DELAY_PROTOCOL
});

window.Sovra.UnifiedDriftCore = Object.freeze({
  create: createUnifiedDriftCore
});

/* ============================================================
   9) Example manual invocation (commented)
   ============================================================ */

// const scanner = Sovra.DriftScanner.create({
//   trifoldProtocol: window.TrifoldMirrorProtocol || null,
//   recursionDelayMs: 220,
//   maxDocs: 24,
//   emitEventName: "drift:timeline"
// });
//
// scanner.scan({
//   query: "How has legal language changed over time in America?",
//   domain: "Law",
//   anchorTerms: ["legal language", "statute", "case law"]
// }).then(console.log).catch(console.error);

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
   FIELD DENSITY UI SINK (DESCRIPTIVE ONLY)
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {
  window.addEventListener("sovra:field-density", (ev) => {
    const { mass, packing, flow } = ev.detail || {};

    const massEl = document.getElementById("density-mass");
    const packEl = document.getElementById("density-packing");
    const flowEl = document.getElementById("density-flow");
    const band = document.getElementById("field-density");

    if (!massEl || !packEl || !flowEl || !band) return;

    massEl.textContent =
      mass < 0.3 ? "Light" :
      mass < 0.7 ? "Moderate" :
      "Heavy";

    packEl.textContent =
      packing < 0.3 ? "Diffuse" :
      packing < 0.7 ? "Compact" :
      "Compressed";

    flowEl.textContent = flow ? "Shifting" : "Static";

    band.classList.remove("hidden");
  });
});

/* ============================================================
   CDLM UI Sink (DESCRIPTIVE ONLY)
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {
  window.addEventListener("cdlm:scores", (ev) => {
    // Gate controls visibility — scores may exist without exposure
    if (!SOVRA_GATES.contraCollapse()) return;
    const s = ev.detail;
    document.getElementById("score-collapse").textContent = s.collapse ?? "–";
    document.getElementById("score-contradiction").textContent = s.contradiction ?? "–";
    document.getElementById("score-zero-sum").textContent = s.zeroSum ?? "–";
    const panel = document.getElementById("diagnostic-panel");
    if (panel) {
      panel.classList.remove("hidden");
      panel.setAttribute("data-active", "true");
    }
  });
});

/* ============================================================
   CDLM SCORE SYNTHESIS (NUMERIC ONLY)
   ============================================================ */
function synthesizeCDLMScores({ zse, trifold, enginesFired, querySignal }) {
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
  const engineCount =
    Object.values(enginesFired || {}).filter(Boolean).length;

  // 🔹 Per‑query variance (forces resampling per query, NFIE‑safe)
  const queryVariance =
    typeof querySignal === "number"
      ? querySignal % 3
      : 0;
// 🔹 ZSE mass contribution (non‑semantic, NFIE‑safe)
const zseMass =
  typeof zse?.tokenCount === "number"
    ? Math.min(3, Math.floor(zse.tokenCount / 400))
    : 0;

const collapse = Math.min(
  10,
  engineCount +
    Math.round(contradiction / 3) +
    zeroSum +
    queryVariance +
    zseMass
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
   console.log("[CDLM EMIT]", scores);
  // Always emit scores to the diagnostic panel
  window.dispatchEvent(
    new CustomEvent("cdlm:scores", { detail: scores })
  );

  // VDU render only fires if collapse confirmed AND gate is active
  if (
    SOVRA_GATES.contraCollapse() &&
    window.Sovra.CollapseGate.hasCollapsed({
      cdlm: scores?.cdlm,
      contra: scores?.isContradictionArtifact === true
    })
  ) {
    window.dispatchEvent(
      new CustomEvent("cdlm:collapse-confirmed", { detail: scores })
    );
  }
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
    LAW: ["court", "legal", "statute", "justice", "discrimination", "civil rights", "housing law"],
    HOUSING: ["housing", "rent", "eviction", "zoning", "mortgage"],
    EMPLOYMENT: ["employment", "hiring", "termination", "workplace"],
    MEDICAL: ["medical", "healthcare", "diagnosis", "treatment"],
    FINANCIAL: ["loan", "credit", "bank", "debt"],
    EDUCATION: ["school", "education", "curriculum"],
    GOVERNMENT: ["policy", "agency", "regulation"],
    TECHNOLOGY: ["algorithm", "ai", "software"],
    CULTURE: ["race", "identity", "history"]
  };

  const t = (text || "").toLowerCase();
  const matches = [];

  for (const category in categories) {
    if (categories[category].some(kw => t.includes(kw))) {
      matches.push(category);
    }
  }

  return matches.length ? matches : ["OTHER"];
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


/* ============================================================
   Voice Generator
   ============================================================ */
function speak(vdu) {
  if (!gateCheck(vdu)) return null;

  const draft = attemptAssembly(vdu);
  if (!draft) return null;

  if (!passesTacticalLock(draft)) return null;
  if (isPatternRecognizable(draft)) return null;

  return draft;
}

/* ============================================================
   SOVRA SPEAKS — VDU FILTERED
   Version: 1.0
   Mode: Full-Parse Only | On-Site Assembly | Non-Patterned
   ============================================================ */

window.Sovra = window.Sovra || {};

window.Sovra.Speaks = (() => {

  /* =========================
     HARD GATES
     ========================= */

  function gateCheck(vdu) {
    if (!vdu?.speech?.allowed) return false;
    if (vdu?.field?.resolution !== "full") return false;
    if (typeof window.SOVRA_GATES?.sovraSpeaks === "function" && !window.SOVRA_GATES.sovraSpeaks()) return false;
    return true;
  }

  /* =========================
     TACTICAL LOCK
     ========================= */

  function passesTacticalLock(text) {
    if (!text || typeof text !== "string") return false;
    if (text.length > 420) return false;
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
    if (recentHashes.size > 12) recentHashes.clear();

    return false;
  }

  /* =========================
     ON-SIGHT ASSEMBLY
     ========================= */

  const LEXICON = Object.freeze({
    nouns: Object.freeze({
      absence: "Some structurally relevant explanations",
      surface: "the retrieved material",
      patterns: "visibility patterns",
      systems: "high‑power informational systems"
    }),
    verbs: Object.freeze({
      notSurface: "did not surface",
      canOccur: "can occur",
      observed: "have been observed"
    }),
    qualifiers: Object.freeze({
      scope: "At this resolution",
      without: "without explicit exclusion",
      comparable: "Comparable"
    })
  });

  function attemptAssembly(vdu) {
    const { visibility, field } = vdu || {};
    const out = [];

    if (!visibility?.omissionsDetected) return null;

    out.push(
      `${LEXICON.nouns.absence} ${LEXICON.verbs.notSurface} within ${LEXICON.nouns.surface}.`
    );

    out.push(
      `${LEXICON.qualifiers.scope}, such attenuation ${LEXICON.verbs.canOccur} ${LEXICON.qualifiers.without}.`
    );

    if (field?.powerAsymmetryLikely) {
      out.push(
        `${LEXICON.qualifiers.comparable} ${LEXICON.nouns.patterns} ${LEXICON.verbs.observed} in ${LEXICON.nouns.systems}.`
      );
    }

    return out.length ? out.join(" ") : null;
  }

  /* =========================
     PUBLIC API
     ========================= */

  function speak(vdu) {
    if (!gateCheck(vdu)) return null;

    const draft = attemptAssembly(vdu);
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
   VDU Module (Minimal Stub)
   ============================================================ */
window.Sovra = window.Sovra || {};

window.Sovra.VDU = (() => {
  function run(results, context = {}) {
    const block = document.createElement("div");
    block.className = "vdu-block";
    block.textContent = `VDU processed ${results.length} results.`;
    block.vdu = {
      visibility: {
        concentratedAroundInstitution: context?.cdlm > 0.7,
        externalLowResolution: context?.cdlm < 0.3,
        omissionsDetected: context?.contra === true
      },
      field: {
        powerAsymmetryLikely: context?.cdlm > 0.6,
        resolution: "full"
      },
      speech: {
        allowed: true,
        maxSentences: 3
      }
    };
    return block;
  }
  return Object.freeze({ run });
})();

/* ============================================================
   VDU Alias (Binding)
   ============================================================ */
const VDU = window.Sovra.VDU;


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

// Render Zero-Sum block once per query
if (SOVRA_GATES.zeroSum() && data.zse) {
  renderZSEStandalone(data.zse);
}

function renderDriftTimeline(payload) {
  if (!payload || !payload.ok || payload.kind !== "DRIFT_TIMELINE") return;

  const container = document.querySelector(".results-left");
  if (!container) return;

  // FIX 3: Remove existing drift block before prepending new one
  const existing = container.querySelector(".drift-block");
  if (existing) existing.remove();

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
     
     // Single field observation — NFIE compliant, no per-card force
if (SOVRA_GATES.sovraSpeaks()) {
  applySovraVoice(narrativeText);
}
     // Dispatch field density to diagnostic bar center column
(function emitFieldDensity() {
  const zseData = runZSEStandalone(narrativeText);
  const tokens = narrativeText.trim().split(/\s+/).filter(Boolean);
  const lines = narrativeText.split(/\n/);
  const nonEmpty = lines.filter(l => l.trim().length > 0);
  const avgLineLen = nonEmpty.length
    ? Math.round(nonEmpty.join("").length / nonEmpty.length)
    : 0;

  const mass = Math.min(1, (zseData?.tokenCount || tokens.length) / 2000);
  const packing = Math.min(1, avgLineLen / 120);
  const flow = false; // Delta history not yet active

  window.dispatchEvent(
    new CustomEvent("sovra:field-density", {
      detail: { mass, packing, flow }
    })
  );

  // Unhide diagnostic panel
if (SOVRA_GATES.contraCollapse()) {
  const panel = document.getElementById("diagnostic-panel");
  if (panel) panel.classList.remove("hidden");
}

   // FIX 1: VDU block only renders when Contra/Collapse gate is active
if (SOVRA_GATES.contraCollapse()) {
  const vduBlock = VDU.run(list, {
    cdlm: scores?.cdlm,
    contra: scores?.isContradictionArtifact === true
  });
  if (vduBlock) results.appendChild(vduBlock);
}

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

  results.appendChild(card);
});

// FIX 2: Removed provPanel.prepend(vduBlock) — caused vduBlock to render twice
// vduBlock is now appended once above, inside the contraCollapse gate check

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

  window.addEventListener("sovra:ping", (event) => {
    const { level, type, reason, timestamp } = event.detail;
    console.log(`[PING RECEIVED] Level: ${level} | Type: ${type} | Reason: ${reason} | Time: ${new Date(timestamp).toLocaleString()}`);
  });

  // Search bindings
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

  // Context Control Panel toggle
  const ctxToggleBtn = document.getElementById("contextControlToggle");
  const ctxPanel = document.getElementById("contextControlPanel");

 if (ctxToggleBtn && ctxPanel) {
    ctxToggleBtn.replaceWith(ctxToggleBtn.cloneNode(true));
    const freshToggle = document.getElementById("contextControlToggle");
    freshToggle.addEventListener("click", () => {
      ctxPanel.classList.toggle("hidden");
    });
  }

  const ctxCloseBtn = document.getElementById("closeContextPanel");
  if (ctxCloseBtn && ctxPanel) {
    ctxCloseBtn.addEventListener("click", () => {
      ctxPanel.classList.add("hidden");
    });
  }

});

