/* ============================================================
   SDS_DriftGate_Lens — script.js INTEGRATION PATCH
   Version: 1.0
   One insertion point. Drop-safe.
   ============================================================ */


/* ============================================================
   STEP 1 — Add script tag to index.html

   Add BEFORE script.js loads:

   <script src="SOVRA_SDS.sys.js"></script>
   <script src="SOVRA_SDS.driftAdapter.js"></script>
   <script src="script.js"></script>

   Load order matters:
   1. SOVRA_SDS.sys.js         ← core scanner
   2. SOVRA_SDS.driftAdapter.js ← lens adapter
   3. script.js                 ← picks up window.Sovra.SDS + window.Sovra.SDSDriftAdapter
   ============================================================ */


/* ============================================================
   STEP 2 — One insertion in runPTFPipeline() inside script.js

   FIND this block (after Module 4b: PCA):
   ────────────────────────────────────────────────────────────
   // --- Module 4b: PCA — measure what should have appeared but didn't ---
   const ptfPCA = window.Sovra.PCA.measure(ptfText, query);
   ────────────────────────────────────────────────────────────

   ADD IMMEDIATELY AFTER IT:
   ============================================================ */

// --- Module 4c: SDS Drift Lens — verbiage drift on primary source ---
// Admission signal: the user's query submission is the corridor event.
// ptfText is already fetched and bounded. No new fetch. No browser extension.
// Gate-controlled: only runs when Drift Core checkbox is active.
const sdsDriftResult = window.Sovra?.SDSDriftAdapter?.run({
  text:      ptfText,
  query:     query,
  url:       firstResult.link,
  host:      fetched.host,
  wordCount: fetched.wordCount
}) || null;

// Store SDS result for CDLM contradiction feed (Hook 1 from SOVRA_SDS.sys patch)
if (sdsDriftResult?.ok) {
  window.Sovra._lastSDSResult = sdsDriftResult.sds;
}


/* ============================================================
   THAT IS THE ONLY CHANGE REQUIRED IN script.js.

   Everything else is handled by SOVRA_SDS.driftAdapter.js:
   - Panel rendering inside drift-timeline-panel
   - CSS injection (once, on first run)
   - Event emission (sovra:sds + fidarch:drift-lens)
   - Failure state display
   - Gate check (returns silent no-op if Drift is inactive)

   Nothing collapses. Nothing escalates. The mirror holds.
   ============================================================ */
