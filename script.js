/* ============================================================
   Sovra Public Runtime (NFIE-compliant)
   Version: 1.0
   Purpose: Search UI + evidence handling + one-way telemetry
   Non-goals: No enforcement, no interpretive mandates, no collapse control
   ============================================================ */

"use strict";
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
   6) Public search runtime (NO interpretive enforcement)
   ============================================================ */
window.searchSovra = async function () {
  const query = (document.getElementById("query")?.value || "").trim();
  const compareRaw = document.getElementById("toggleRaw")?.checked || false;
  const results = document.querySelector(".results-left");

  if (!results) return;

  if (!query) {
    results.innerText = "Sovra requires a query to proceed.";
    return;
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

const endpoint =
const endpoint =
  `/api/search?q=${encodeURIComponent(query)}&raw=${compareRaw}&zse=${zeroSumOn}`;

const response = await fetch(endpoint);
const data = await response.json();

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
            <button class="hash-btn" aria-label="Copy canonical hash" data-hash="${escapeAttr(hash)}">${escapeHtml(hash.slice(0, 6))}…</button>
          </div>
        </header>

        <section class="card-body">
          <div class="source-id">Source — ${escapeHtml(host)}</div>
          <pre class="raw-excerpt" tabindex="0">${escapeHtml(excerptText)}</pre>

          <div class="vector-scores" aria-hidden="true">
            <div class="score confidence"><label>Confidence</label><meter value="${Number(r.confidence || 0).toFixed(2)}" min="0" max="1"></meter></div>
            <div class="score relevance"><label>Relevance</label><meter value="${Number(r.relevance || 0).toFixed(2)}" min="0" max="1"></meter></div>
            <div class="score sensitivity"><label>Sensitivity</label><meter value="${Number(r.sensitivity || 0).toFixed(2)}" min="0" max="1"></meter></div>
          </div>
        </section>

        <footer class="card-foot">
          <div class="mirrors">Mirrors: <span class="mirrors-count">${escapeHtml(String(r.mirrors || 0))}</span></div>
          <div class="tamper-flag" aria-live="polite" role="status">OK</div>
          <button class="expand-provenance" aria-expanded="false" aria-controls="${provId}">Provenance</button>
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
          <a class="card-link" href="${escapeAttr(r.link)}" target="_blank" rel="noopener">View Source</a>
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
    results.innerText = "Search error.";
    console.error("Sovra fetch error:", error);
    SovraSyncTrigger.send({ kind: "FETCH_ERROR", query, error: String(error) });
  }
};

console.log("searchSovra() loaded (NFIE public runtime).");
