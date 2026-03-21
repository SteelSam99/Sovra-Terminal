/* ============================================================
   SOVRA_SDS.driftAdapter.js
   Module ID: SDS_DriftGate_Lens
   Version: 1.0
   Author: Samuel Paul Peacock + Max Headroom + Claude
   Framework: SOVRA©-FCL-MHCE-v2.5 | DS4-KES-109
   Copyright: Samuel Paul Peacock, March 2026

   Purpose:
     Attach SOVRA_SDS.sys to the existing PTF pipeline as a
     verbiage drift lens inside the Drift GUI box.

   Admission signal:
     The user's submitted query IS the corridor admission event.
     The PTF fetch of the first result is the direct consequence
     of that explicit user action. No browser extension required.
     No tab metadata required. No inference. No guessing.
     The query activates the pipeline. The pipeline feeds SDS.

   Architecture position:
     - Runs INSIDE runPTFPipeline() after Module 4b (PCA)
     - Receives ptfText (already fetched, already bounded to 1,200 words)
     - Calls sdsScan() once — SDS core untouched
     - Renders verbiage drift panel inside existing drift-timeline-panel
     - Emits two additive events: sovra:sds + fidarch:drift-lens

   Hard constraints (non-negotiable):
     - SDS core logic remains unchanged
     - No interpretation, verdicts, corrective language
     - No good/bad/biased/harmful labels
     - No ranking or reordering of results
     - Output is descriptive only
     - NFIE enforced: O_f = 0
     - Absence is structural data, not error

   Output character:
     A microscope. A weather report. A lens.
     Shows movement, not meaning.

   Samuel Paul Peacock, Jackson Tennessee, March 20 2026
   ============================================================ */

"use strict";

/* ============================================================
   1) GATE CHECK
   SDS Drift Lens only runs when Drift Core gate is active.
   Same gate as the temporal scanner — one checkbox, both lenses.
   ============================================================ */

function sdsDriftGateActive() {
  return !!(
    typeof SOVRA_GATES !== "undefined" &&
    typeof SOVRA_GATES.driftCore === "function" &&
    SOVRA_GATES.driftCore()
  );
}

/* ============================================================
   2) SCAN ID
   Deterministic witness ID for continuity.
   hash(url + first 64 chars of text + minute bucket)
   Non-logging — counts and IDs only, never full text.
   ============================================================ */

function buildScanId(url, text) {
  const bucket = Math.floor(Date.now() / 60000); // minute bucket
  const seed = String(url || "") + String(text || "").slice(0, 64) + bucket;
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h = Math.imul(h ^ seed.charCodeAt(i), 16777619);
  }
  return "sds_" + (h >>> 0).toString(16).padStart(8, "0");
}

/* ============================================================
   3) CORE ADAPTER FUNCTION
   Called from inside runPTFPipeline() after Module 4b.
   Receives the already-fetched PTF text — no new fetch required.

   Usage inside runPTFPipeline():
   ─────────────────────────────
   // After: const ptfPCA = window.Sovra.PCA.measure(ptfText, query);

   const sdsLensResult = window.Sovra.SDSDriftAdapter.run({
     text:     ptfText,
     query:    query,
     url:      firstResult.link,
     host:     fetched.host,
     wordCount: fetched.wordCount
   });
   ─────────────────────────────
   ============================================================ */

function runSDSDriftLens({ text = "", query = "", url = "", host = "", wordCount = 0 } = {}) {

  // Gate check — if Drift is off, return silent no-op
  if (!sdsDriftGateActive()) {
    return Object.freeze({ ok: false, reason: "DRIFT_GATE_INACTIVE" });
  }

  // SDS must be loaded
  if (!window.Sovra?.SDS?.scan) {
    return Object.freeze({ ok: false, reason: "SDS_NOT_LOADED" });
  }

  // Text must exist
  if (!text || !text.trim()) {
    return Object.freeze({ ok: false, reason: "EMPTY_TEXT" });
  }

  // Determine source type from host (descriptive only)
  const sourceType = _inferSourceType(url, host);
  const sourceQuality = wordCount >= 800 ? "HIGH" : wordCount >= 400 ? "MEDIUM" : "LOW";

  // Build scan ID for witness continuity
  const scanId = buildScanId(url, text);

  // Call SDS exactly once — core untouched
  const sdsPayload = window.Sovra.SDS.scan({
    text,
    query:  String(query || ""),
    domain: sourceType,
    meta: Object.freeze({
      pageUrl:          String(url || ""),
      host:             String(host || ""),
      wordCount,
      sourceType,
      sourceQuality,
      scanId,
      admissionSignal:  "USER_QUERY_SUBMISSION",
      extractionNotes:  "PTF pipeline fetch — first result, first 1200 words"
    })
  });

  if (!sdsPayload || !sdsPayload.ok) {
    _renderFailureState();
    return Object.freeze({ ok: false, reason: "SDS_SCAN_FAILED", sds: sdsPayload });
  }

  // Store for CDLM contradiction feed
  window.Sovra._lastSDSResult = sdsPayload;

  // Render the verbiage drift panel
  _renderVerbiageDriftPanel(sdsPayload, { url, host, sourceType, sourceQuality, scanId });

  // Emit two additive witness events
  _emitWitnessEvents(sdsPayload, { url, host, query, scanId });

  return Object.freeze({
    ok:      true,
    scanId,
    sds:     sdsPayload,
    sourceType,
    sourceQuality
  });
}

/* ============================================================
   4) SOURCE TYPE INFERENCE
   Descriptive only — helps the UI label the source correctly.
   Never used to filter or rank.
   ============================================================ */

function _inferSourceType(url, host) {
  const u = String(url || "").toLowerCase();
  const h = String(host || "").toLowerCase();

  if (u.endsWith(".pdf") || u.includes("/pdf/") || u.includes("pdf=")) return "PDF";
  if (h.includes("youtube.com") || h.includes("youtu.be"))             return "VIDEO";
  if (h.includes("arxiv.org") || h.includes("doi.org"))                return "ACADEMIC";
  if (h.includes("github.com"))                                         return "CODE";
  if (h.includes("gov") || h.includes(".gov."))                         return "GOVERNMENT";
  return "HTML";
}

/* ============================================================
   5) VERBIAGE DRIFT PANEL RENDERER
   Renders inside the existing drift-timeline-panel dark box.
   Positioned ABOVE the era blocks (prepended).

   Display fields (permitted):
     - Grammar signal
     - Drift score (maintenance → domination)
     - Capture strength
     - Co-presence / pressure flags
     - Governing logic
     - SDS scan note (verbatim)
     - Source type + quality + scan ID

   Forbidden fields:
     - Verdicts
     - Recommendations
     - Warnings
     - Calls to action
     - Corrective framing
     - Good/bad labels
   ============================================================ */

function _renderVerbiageDriftPanel(sds, meta) {
  const panel = document.getElementById("drift-timeline-panel");
  if (!panel) return;

  // Remove any previous SDS lens block
  const existing = document.getElementById("sds-drift-lens-block");
  if (existing) existing.remove();

  // Make panel visible
  panel.classList.remove("hidden");

  // Build the lens block
  const block = document.createElement("div");
  block.id = "sds-drift-lens-block";
  block.className = "sds-drift-lens";

  // Grammar signal display
  const grammarDisplay = _formatGrammarSignature(sds.entry?.grammarSignature);

  // Drift score bar (0 = maintenance, 1 = domination)
  const driftPct = Math.round((sds.driftScore || 0) * 100);

  // Co-presence flags
  const flags = [];
  if (sds.pressure?.coPresence?.maintenanceAndDomination)    flags.push("M+D");
  if (sds.pressure?.coPresence?.maintenanceAndReclassification) flags.push("M+R");
  if (sds.pressure?.coPresence?.cartesianAndReclassification)   flags.push("C+R");

  // Pressure direction
  const pressureDir = sds.pressure?.resolutionDirection || "INDETERMINATE";

  // Governing logic
  const govLogic = _formatGoverningLogic(sds.governingLogic);

  // Scan note — verbatim from SDS, no rewriting
  const scanNote = sds.scanNote || "";

  // Definition capture indicator
  const capturePct = Math.round((sds.captureStrength || 0) * 100);

  block.innerHTML = `
    <div class="sds-lens-header">
      <span class="sds-lens-title">⟦ SDS ⟧ VERBIAGE DRIFT · LENS</span>
      <span class="sds-lens-meta">${escapeHtml(meta.sourceType)} · ${escapeHtml(meta.sourceQuality)} · ${escapeHtml(meta.host)}</span>
    </div>

    <div class="sds-lens-grid">

      <div class="sds-lens-cell">
        <div class="sds-cell-label">Grammar Signal</div>
        <div class="sds-cell-val ${grammarDisplay.cls}">${escapeHtml(grammarDisplay.text)}</div>
      </div>

      <div class="sds-lens-cell">
        <div class="sds-cell-label">Drift Score</div>
        <div class="sds-cell-val">
          <span class="sds-drift-track">
            <span class="sds-drift-fill" style="width:${driftPct}%"></span>
          </span>
          <span class="sds-drift-num">${driftPct}%</span>
        </div>
        <div class="sds-cell-sub">maintenance → domination</div>
      </div>

      <div class="sds-lens-cell">
        <div class="sds-cell-label">Capture Strength</div>
        <div class="sds-cell-val">
          <span class="sds-drift-track">
            <span class="sds-capture-fill" style="width:${capturePct}%"></span>
          </span>
          <span class="sds-drift-num">${capturePct}%</span>
        </div>
        <div class="sds-cell-sub">definition boundary pressure</div>
      </div>

      <div class="sds-lens-cell">
        <div class="sds-cell-label">Governing Logic</div>
        <div class="sds-cell-val sds-gov">${escapeHtml(govLogic)}</div>
      </div>

      <div class="sds-lens-cell">
        <div class="sds-cell-label">Pressure Direction</div>
        <div class="sds-cell-val sds-pressure">${escapeHtml(pressureDir.replace(/_/g, " "))}</div>
      </div>

      <div class="sds-lens-cell">
        <div class="sds-cell-label">Co-Presence Flags</div>
        <div class="sds-cell-val">
          ${flags.length
            ? flags.map(f => `<span class="sds-flag">${escapeHtml(f)}</span>`).join("")
            : '<span class="sds-no-flags">—</span>'}
        </div>
      </div>

    </div>

    ${scanNote ? `
    <div class="sds-scan-note">
      <span class="sds-note-label">⟦ SCAN NOTE ⟧</span>
      <span class="sds-note-text">${escapeHtml(scanNote)}</span>
    </div>` : ""}

    <div class="sds-lens-footer">
      <span class="sds-footer-id">SCAN · ${escapeHtml(meta.scanId)}</span>
      <span class="sds-footer-nfie">NFIE© · O_f = 0 · Witness only</span>
    </div>
  `;

  // Inject CSS if not already present
  _injectSDSStyles();

  // Prepend — lens sits above temporal scanner era blocks
  panel.prepend(block);
}

/* ============================================================
   6) GRAMMAR SIGNATURE FORMATTER
   Returns display text and CSS class.
   No good/bad framing. Descriptive only.
   ============================================================ */

function _formatGrammarSignature(sig) {
  const map = {
    "DOMINATION_DOMINANT":  { text: "DOMINATION DOMINANT",  cls: "sds-sig-domination" },
    "MAINTENANCE_DOMINANT": { text: "MAINTENANCE DOMINANT", cls: "sds-sig-maintenance" },
    "CARTESIAN_DOMINANT":   { text: "CARTESIAN DOMINANT",   cls: "sds-sig-cartesian"  },
    "MIXED":                { text: "MIXED",                 cls: "sds-sig-mixed"      },
    "NO_SIGNAL":            { text: "NO SIGNAL",             cls: "sds-sig-none"       },
    "UNCLASSIFIED":         { text: "UNCLASSIFIED",          cls: "sds-sig-none"       }
  };
  return map[sig] || { text: String(sig || "—"), cls: "sds-sig-none" };
}

/* ============================================================
   7) GOVERNING LOGIC FORMATTER
   Readable labels. No judgment.
   ============================================================ */

function _formatGoverningLogic(logic) {
  const map = {
    "DOMINATION_GRAMMAR":            "Domination grammar",
    "MAINTENANCE_GRAMMAR":           "Maintenance grammar",
    "CARTESIAN_DEFINITION_GRAMMAR":  "Cartesian definition grammar",
    "NO_SIGNAL_DETECTED":            "No signal detected",
    "INDETERMINATE":                 "Indeterminate"
  };
  return map[logic] || String(logic || "—").replace(/_/g, " ").toLowerCase();
}

/* ============================================================
   8) FAILURE STATE RENDERER
   Silent, non-escalating.
   ============================================================ */

function _renderFailureState() {
  const panel = document.getElementById("drift-timeline-panel");
  if (!panel) return;

  const existing = document.getElementById("sds-drift-lens-block");
  if (existing) existing.remove();

  const block = document.createElement("div");
  block.id = "sds-drift-lens-block";
  block.className = "sds-drift-lens sds-drift-lens-fail";
  block.innerHTML = `
    <div class="sds-lens-header">
      <span class="sds-lens-title">⟦ SDS ⟧ VERBIAGE DRIFT · LENS</span>
    </div>
    <div class="sds-fail-msg">No verbiage drift signal available for this source.</div>
  `;

  _injectSDSStyles();
  panel.prepend(block);
}

/* ============================================================
   9) WITNESS EVENT EMISSION
   Two additive events. Non-coercive. No state mutation.
   ============================================================ */

function _emitWitnessEvents(sdsPayload, { url, host, query, scanId }) {
  try {
    window.dispatchEvent(new CustomEvent("sovra:sds", {
      detail: sdsPayload
    }));
  } catch (_) {}

  try {
    window.dispatchEvent(new CustomEvent("fidarch:drift-lens", {
      detail: Object.freeze({
        scanId,
        pageUrl:   String(url   || ""),
        pageTitle: String(query || ""),
        host:      String(host  || ""),
        admissionSignal: "USER_QUERY_SUBMISSION",
        sds: sdsPayload
      })
    }));
  } catch (_) {}
}

/* ============================================================
   10) CSS INJECTION
   Injects SDS lens styles once — no duplicate injection.
   Dark palette matching existing drift-timeline-panel.
   No color coding that implies good/bad.
   ============================================================ */

function _injectSDSStyles() {
  if (document.getElementById("sds-drift-lens-styles")) return;

  const style = document.createElement("style");
  style.id = "sds-drift-lens-styles";
  style.textContent = `

    /* ── SDS Lens Block ── */
    .sds-drift-lens {
      background: #08080f;
      border: 0.5px solid #2a2a40;
      border-top: 2px solid #534AB7;
      padding: 10px 14px;
      margin-bottom: 10px;
      font-family: 'Share Tech Mono', monospace;
      font-size: 0.75rem;
      color: #9a9ab8;
    }

    .sds-drift-lens-fail {
      border-top-color: #3d3830;
    }

    /* ── Header ── */
    .sds-lens-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      padding-bottom: 6px;
      border-bottom: 0.5px solid #1e1e3a;
    }

    .sds-lens-title {
      font-size: 0.65rem;
      letter-spacing: 2px;
      color: #534AB7;
      text-transform: uppercase;
    }

    .sds-lens-meta {
      font-size: 0.62rem;
      color: #4a4a6a;
      letter-spacing: 0.5px;
    }

    /* ── Grid ── */
    .sds-lens-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 8px;
      margin-bottom: 8px;
    }

    .sds-lens-cell {
      padding: 6px 8px;
      background: #0d0d18;
      border: 0.5px solid #1e1e3a;
    }

    .sds-cell-label {
      font-size: 0.6rem;
      letter-spacing: 1.5px;
      color: #4a4a6a;
      text-transform: uppercase;
      margin-bottom: 4px;
    }

    .sds-cell-val {
      font-size: 0.72rem;
      color: #c8c8e8;
      line-height: 1.4;
    }

    .sds-cell-sub {
      font-size: 0.58rem;
      color: #3a3a5a;
      margin-top: 2px;
    }

    /* ── Grammar signature variants (no good/bad) ── */
    .sds-sig-domination  { color: #e8823a; }
    .sds-sig-maintenance { color: #3ae8c8; }
    .sds-sig-cartesian   { color: #a09adc; }
    .sds-sig-mixed       { color: #c4a44a; }
    .sds-sig-none        { color: #4a4a6a; }

    /* ── Drift / Capture bars ── */
    .sds-drift-track {
      display: inline-block;
      width: 60px;
      height: 4px;
      background: #1e1e3a;
      vertical-align: middle;
      margin-right: 4px;
      position: relative;
    }

    .sds-drift-fill {
      display: block;
      height: 100%;
      background: #534AB7;
      transition: width 0.4s ease;
    }

    .sds-capture-fill {
      display: block;
      height: 100%;
      background: #e8823a;
      transition: width 0.4s ease;
    }

    .sds-drift-num {
      font-size: 0.68rem;
      color: #9a9ab8;
      vertical-align: middle;
    }

    /* ── Governing logic ── */
    .sds-gov {
      font-size: 0.68rem;
      color: #a09adc;
    }

    /* ── Pressure ── */
    .sds-pressure {
      font-size: 0.65rem;
      color: #9a9ab8;
      text-transform: lowercase;
      letter-spacing: 0.3px;
    }

    /* ── Co-presence flags ── */
    .sds-flag {
      display: inline-block;
      background: #1e1e2e;
      border: 0.5px solid #3a3a5a;
      color: #8a8aaa;
      padding: 1px 5px;
      border-radius: 2px;
      font-size: 0.6rem;
      margin-right: 3px;
      letter-spacing: 0.5px;
    }

    .sds-no-flags {
      color: #3a3a5a;
    }

    /* ── Scan note ── */
    .sds-scan-note {
      padding: 6px 8px;
      background: #0a0a14;
      border: 0.5px solid #1e1e3a;
      border-left: 2px solid #534AB7;
      margin-bottom: 8px;
      line-height: 1.5;
    }

    .sds-note-label {
      font-size: 0.6rem;
      letter-spacing: 1.5px;
      color: #534AB7;
      display: block;
      margin-bottom: 3px;
    }

    .sds-note-text {
      font-size: 0.68rem;
      color: #9a9ab8;
    }

    /* ── Footer ── */
    .sds-lens-footer {
      display: flex;
      justify-content: space-between;
      font-size: 0.58rem;
      color: #3a3a5a;
      letter-spacing: 0.5px;
      padding-top: 6px;
      border-top: 0.5px solid #1e1e3a;
    }

    /* ── Fail message ── */
    .sds-fail-msg {
      font-size: 0.68rem;
      color: #4a4a6a;
      padding: 6px 0;
      font-style: italic;
    }

    /* ── Responsive ── */
    @media (max-width: 640px) {
      .sds-lens-grid { grid-template-columns: 1fr 1fr; }
    }
  `;

  document.head.appendChild(style);
}

/* ============================================================
   11) HELPER — escapeHtml (safe if already defined globally)
   ============================================================ */

function _sdsEscapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Use global escapeHtml if available, otherwise use local
const escapeHtml = typeof window.escapeHtml === "function"
  ? window.escapeHtml
  : _sdsEscapeHtml;

/* ============================================================
   12) MODULE REGISTRATION
   ============================================================ */

window.Sovra = window.Sovra || {};

window.Sovra.SDSDriftAdapter = Object.freeze({
  id:      "SDS_DriftGate_Lens",
  version: "1.0",
  run:     runSDSDriftLens,
  // Expose internals for testing only
  _internal: Object.freeze({
    gate:          sdsDriftGateActive,
    scanId:        buildScanId,
    sourceType:    _inferSourceType,
    renderPanel:   _renderVerbiageDriftPanel,
    renderFail:    _renderFailureState,
    emitEvents:    _emitWitnessEvents
  })
});

/* ============================================================
   13) REGISTRY METADATA
   ============================================================ */

window.Sovra.SDSDriftAdapter.registry = Object.freeze({
  id:              "SDS_DriftGate_Lens",
  version:         "1.0",
  authors:         "Samuel Paul Peacock + Max Headroom + Claude",
  copyright:       "Samuel Paul Peacock, March 2026",
  framework:       "SOVRA©-FCL-MHCE-v2.5",
  constraint:      "Verbiage drift lens only. No verdicts. No force.",
  nfie:            "O_f = 0. Witness only.",
  admissionSignal: "USER_QUERY_SUBMISSION — the query IS the corridor admission event",
  attachesTo:      "runPTFPipeline() after Module 4b (PCA)",
  feeds:           ["drift-timeline-panel", "sovra:sds event", "fidarch:drift-lens event", "CDLM contradiction"],
  forbidden:       "Verdicts, recommendations, warnings, calls to action, corrective framing, good/bad labels",
  outputCharacter: "A microscope. A weather report. A lens. Shows movement, not meaning."
});

console.log("[SDS_DriftGate_Lens v1.0] Verbiage drift adapter loaded. NFIE compliant. O_f = 0.");
