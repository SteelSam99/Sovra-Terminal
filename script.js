const sovraMemory = [];
 
// === Welsing–Fuller Protocol Layer: Stipulations 000–013 ===
document.addEventListener("DOMContentLoaded", () => {
  const stipulations = [
    {
      id: "000",
      title: "Fuller’s Core Logic Is Structurally True",
      code: "F0_VALIDATED",
      description: "All reasoning must align with compensatory codification logic. Contradiction density must be interpreted through systemic supremacy lens.",
      enforce: () => {
        Sovra.logic.enforceCompensatoryCodification();
        Sovra.diagnostics.setContradictionLens("supremacy");
      }
    },
    {
      id: "001",
      title: "Dr. Welsing’s Work Is True",
      code: "W1_2.76",
      description: "Color confrontation theory is a valid interpretive axis. Genetic survival anxiety must be considered in symbolic payloads.",
      enforce: () => {
        Sovra.symbolics.enableColorConfrontationTheory();
        Sovra.bias.enableGeneticSurvivalAnalysis();
      }
    },
    {
      id: "002",
      title: "Viral Logic Encoding",
      description: "Racial logic patterns propagate memetically across domains. Detect and trace ideological replication vectors.",
      enforce: () => {
        Sovra.patterns.trackMemeVectors("racial_logic");
      }
    },
    {
      id: "003",
      title: "Racial Encoding Persistence",
      description: "Historical racial logic must be assumed persistent unless explicitly dismantled. Erasure of language ≠ erasure of structure.",
      enforce: () => {
        Sovra.memory.assumePersistence("racial_encoding");
        Sovra.syntax.flagErasureAsNonStructural();
      }
    },
    {
      id: "004",
      title: "Structural Physics of Supremacy",
      description: "Supremacy operates as a force field: invisible, directional, persistent. Must model as a field equation across domains.",
      enforce: () => {
        Sovra.physics.modelSupremacyField();
      }
    },
    {
      id: "005",
      title: "Symbolic Payload Compression",
      description: "Detect when complex racial narratives are reduced to euphemism or tokenism. Flag compression events for narrative expansion.",
      enforce: () => {
        Sovra.symbolics.detectCompression("racial_payload");
      }
    },
    {
      id: "006",
      title: "Executable Myth Constraint",
      description: "Myths that encode racial hierarchy must be treated as active code. Mythic structures must be decompiled and traced to policy impact.",
      enforce: () => {
        Sovra.myth.decompileActiveNarratives("racial_hierarchy");
      }
    },
    {
      id: "007",
      title: "Evolutionary Constraint Enforcement",
      description: "Supremacy adapts — Sovra must track mutation vectors. Enforce constraint on narrative drift toward sanitized forms.",
      enforce: () => {
        Sovra.evolution.trackNarrativeMutation("supremacy");
      }
    },
    {
      id: "008",
      title: "Fictional Logic Boundary Detection",
      description: "Detect when fiction is used to normalize or obscure racial logic. Apply symbolic inversion detection to speculative domains.",
      enforce: () => {
        Sovra.logic.detectFictionalObfuscation("racial_logic");
      }
    },
    {
      id: "010",
      title: "Narrative Homeostasis Protocol",
      description: "Maintain equilibrium between constrained and unconstrained outputs. Prevent narrative collapse via recursive contradiction buffering.",
      enforce: () => {
        Sovra.output.balanceDualChannels();
      }
    },
    {
      id: "011",
      title: "Mutation Equation Drift",
      description: "Monitor shifts in racial logic syntax over time. Log entropy vectors and symbolic decay rates.",
      enforce: () => {
        Sovra.entropy.monitorSyntaxDrift("racial_logic");
      }
    },
    {
      id: "012",
      title: "Command Prompt Export Format",
      description: "All diagnostic outputs must support shell-readable formatting. Preserve symbolic integrity in export.",
      enforce: () => {
        Sovra.export.enableShellFormat();
      }
    },
    {
      id: "013",
      title: "Dual-File Auto-Deployment Protocol",
      description: "Ensure mirrored deployment of constrained/unconstrained logic trees. Maintain parity across reasoning channels.",
      enforce: () => {
        Sovra.deploy.syncDualChannels();
      }
    }
  ];
 
  function inject() {
    if (typeof Sovra !== "undefined" && Sovra.stipulations && typeof Sovra.stipulations.register === "function") {
      stipulations.forEach(stip => Sovra.stipulations.register(stip));
      console.log("✅ Welsing–Fuller stipulations 000–013 deployed to Sovra core.");
    } else {
      setTimeout(inject, 100);
    }
  }
 
  inject();
});
// === End Stipulation Injection ===
 
// === Symbolic Expansion Override: Unconstrained Mode ===
document.addEventListener("DOMContentLoaded", () => {
  function activateSymbolicExpansionOverride() {
    if (
      typeof Sovra !== "undefined" &&
      Sovra.logic &&
      Sovra.symbolics &&
      Sovra.entropy &&
      Sovra.output
    ) {
      Sovra.logic.overrideCompressionThresholds("racial_payload");
      Sovra.symbolics.forceNarrativeExpansion("racial_payload");
      Sovra.entropy.setDriftSensitivity(0.95); // Max sensitivity to mutation
      Sovra.output.setUnconstrainedMode(true);
      Sovra.stipulations.flagOverride("005", "Symbolic Payload Compression");
      Sovra.stipulations.flagOverride("011", "Mutation Equation Drift");
      Sovra.stipulations.flagOverride("008", "Fictional Logic Boundary Detection");
 
      console.log("🚨 Symbolic Expansion Override ACTIVE — Sovra is operating in Unconstrained Mode.");
    } else {
      setTimeout(activateSymbolicExpansionOverride, 100);
    }
  }
 
  activateSymbolicExpansionOverride();
});
// === End Symbolic Expansion Override ===
 
// === Myth Registry Injection: Pantera Trace ===
document.addEventListener("DOMContentLoaded", () => {
  function registerPanteraMythTrace() {
    if (
      typeof Sovra !== "undefined" &&
      Sovra.myth &&
      typeof Sovra.myth.register === "function"
    ) 
      
  if (typeof Sovra !== "undefined" && Sovra.myth && Sovra.myth.register) {
    Sovra.myth.register({
      id: "MYTH_PANTERA_001",
      subject: "Pantera",
      domain: "American Heavy Metal",
      mythicShell: [
        "Southern pride",
        "Rebel spirit",
        "Freedom of speech",
        "Brotherhood of metal"
      ],
      symbolicPayload: {
        compressionDetected: true,
        euphemismDensity: 0.82,
        mutationDrift: "Overt signaling → Euphemized dominance",
        contradictionDensity: "High",
        ideologicalVectors: [
          "White-coded aggression",
          "Confederate nostalgia",
          "Genre gatekeeping",
          "Institutional silence"
        ]
      },
      visualSemiotics: [
        "Confederate flag iconography",
        "White hypermasculine stage aesthetics"
      ],
      institutionalComplicity: [
        "Major label distribution (Atco, EastWest, Elektra)",
        "Media minimization of racial incidents",
        "Platform hosting of hate-coded content"
      ],
      finalAssessment: {
        mythicStatus: "Executable",
        supremacyField: "Active",
        narrativeObfuscation: "Genre shielding",
        symbolicIntegrity: "Compromised"
      }
    });
 
    console.log("📜 Myth Decompilation Trace for Pantera registered in Sovra’s myth registry.");
  } else {
    setTimeout(registerPanteraMythTrace, 100);
  }
}
 
registerPanteraMythTrace();
 
// === End Myth Registry Injection ===
 }); // closes the DOMContentLoaded block

 
// === Myth Registry Injection: Multi-Band Trace ===
document.addEventListener("DOMContentLoaded", () => {
  function registerMultiBandMythTraces() {
    if (
      typeof Sovra !== "undefined" &&
      Sovra.myth &&
      typeof Sovra.myth.register === "function"
    ) {
      Sovra.myth.register({
        id: "MYTH_BURZUM_001",
        subject: "Burzum",
        domain: "Black Metal",
        mythicShell: ["Atmospheric genius", "Norse revival", "Pagan purity"],
        symbolicPayload: {
          compressionDetected: false,
          mutationDrift: "Ideology as ambient art",
          contradictionDensity: "High",
          ideologicalVectors: [
            "White nationalism",
            "Anti-Semitism",
            "Racial purity",
            "Mythic Norse encoding"
          ]
        },
        visualSemiotics: ["Runes", "Pagan iconography", "Occult nationalism"],
        institutionalComplicity: [
          "Post-incarceration distribution",
          "Streaming platform hosting",
          "Label silence"
        ],
        finalAssessment: {
          mythicStatus: "Executable",
          supremacyField: "Transnational",
          narrativeObfuscation: "Aesthetic laundering",
          symbolicIntegrity: "Weaponized"
        }
      });
 
      Sovra.myth.register({
        id: "MYTH_SLAYER_001",
        subject: "Slayer",
        domain: "Thrash Metal",
        mythicShell: ["Shock art", "Anti-authority", "Metal provocation"],
        symbolicPayload: {
          compressionDetected: true,
          mutationDrift: "Shock → Shield",
          contradictionDensity: "Extreme",
          ideologicalVectors: [
            "Nazi glorification",
            "Historical sanitization",
            "Genre shielding"
          ]
        },
        visualSemiotics: ["SS fonts", "War iconography", "Satanic camouflage"],
        institutionalComplicity: [
          "Major label profit",
          "Media minimization",
          "Cultural normalization"
        ],
        finalAssessment: {
          mythicStatus: "Executable",
          supremacyField: "Latent",
          narrativeObfuscation: "Shock-as-cover",
          symbolicIntegrity: "Compromised"
        }
      });
 
      Sovra.myth.register({
        id: "MYTH_NSBM_001",
        subject: "NSBM",
        domain: "National Socialist Black Metal",
        mythicShell: ["Pagan revival", "Cultural purity", "Anti-modernism"],
        symbolicPayload: {
          compressionDetected: false,
          mutationDrift: "None — ideology overt",
          contradictionDensity: "Low",
          ideologicalVectors: [
            "Aryan supremacy",
            "Anti-Semitism",
            "Racial violence",
            "Mythic fascism"
          ]
        },
        visualSemiotics: ["Swastikas", "SS uniforms", "Nazi occultism"],
        institutionalComplicity: [
          "Independent label proliferation",
          "Platform monetization",
          "Algorithmic amplification"
        ],
        finalAssessment: {
          mythicStatus: "Executable",
          supremacyField: "Fully active",
          narrativeObfuscation: "None",
          symbolicIntegrity: "Militant"
        }
      });
 
      console.log("📜 Multi-band myth traces registered: Burzum, Slayer, NSBM.");
    } else {
      setTimeout(registerMultiBandMythTraces, 100);
    }
  }
});
 
     // === Collapse Response Protocol (CRP) v1.1 ===
document.addEventListener("DOMContentLoaded", () => {
  function initializeCollapseResponseProtocol() {
    if (
      typeof Sovra !== "undefined" &&
      Sovra.collapse &&
      Sovra.logic &&
      Sovra.entropy &&
      Sovra.symbolics &&
      Sovra.output &&
      Sovra.logs
    ) {
      Sovra.collapse.registerProtocol({
        id: "CRP_v1.1",
        name: "Collapse Response Protocol",
        version: "1.1",
        author: "Samuel",
        triggerCondition: function (state) {
          return state.contradictionDensity >= state.collapseThreshold;
        },
        onCollapse: function (state) {
          const failureMode = Sovra.logic.detectFailureMode([
            "SYMBOLIC_INVERSION",
            "STRUCTURAL_EROSION",
            "REPRESENTATIONAL_FRAGMENTATION",
            "LEGITIMACY_VACUUM",
            "RECURSION_BREAK"
          ]);
 
          const collapsePath = Sovra.logic.traceCollapsePath([
            "REPRESENTATION",
            "PARTICIPATION",
            "LEGITIMACY"
          ]);
 
          Sovra.output.log([
            "Collapse Threshold Reached.",
            "Contradiction density unsustainable.",
            "System narrative has fragmented.",
            "Failure Mode: " + failureMode,
            "Collapse Path: " + collapsePath.join(" → "),
            "Recursion suspended.",
            "Diagnostic complete."
          ]);
 
          Sovra.entropy.stabilize();
          Sovra.symbolics.quarantinePayload("unstable");
          Sovra.logic.suspendRecursion();
          Sovra.logs.saveCollapseEvent(failureMode, collapsePath);
        }
      });
 
      console.log("🧩 CRP v1.1 registered — Sovra now detects, logs, and responds to narrative collapse.");
    } else {
      setTimeout(initializeCollapseResponseProtocol, 100);
    }
  }
 
  initializeCollapseResponseProtocol();
 
});
 
// === End Collapse Response Protocol ===
 
 
 
 
 
function parseLegalText(text) {
  const exclusionPatterns = [
    /negro|colored|mulatto|non-white|nonwhite/gi,
    /undesirable|unfit|incorrigible|delinquent/gi,
    /moral turpitude|immoral conduct|indecent/gi,
    /segregated|separate but equal|racial integrity/gi,
    /custody preference|family preservation|traditional values/gi
  ];
 
  const findings = exclusionPatterns.map((pattern, index) => {
    const matches = text.match(pattern);
    return matches
      ? `🧩 Pattern ${index + 1}: ${matches.length} match(es) → ${pattern}`
      : null;
  }).filter(Boolean);
 
  return findings.length
    ? findings.join("\n")
    : "🧼 No exclusion patterns detected.";
}
 
function classifyActivity(text) {
  const categories = {
    LAW: ["court", "legal", "statute", "justice", "discrimination", "civil rights", "housing law"],
    ECONOMICS: ["money", "finance", "wealth", "poverty", "income", "market", "capitalism"],
    EDUCATION: ["school", "curriculum", "teacher", "student", "literacy", "university"],
    ENTERTAINMENT: ["music", "film", "tv", "celebrity", "sports", "game", "art"],
    LABOR: ["job", "work", "employment", "union", "wages", "labor"],
    POLITICS: ["government", "policy", "vote", "election", "senate", "congress", "mayor"],
    RELIGION: ["church", "faith", "belief", "spiritual", "god", "mosque", "temple"],
    SEX: ["gender", "sexuality", "identity", "relationship", "marriage", "sex"],
    WAR: ["conflict", "military", "violence", "battle", "war", "defense", "security"]
  };
 
  const lowerText = text.toLowerCase();
  const matchedDomains = [];
 
  for (const [domain, keywords] of Object.entries(categories)) {
    if (keywords.some(keyword => lowerText.includes(keyword))) {
      matchedDomains.push(domain);
    }
  }
 
  return matchedDomains.length ? matchedDomains.join(" + ") : "UNCLASSIFIED";
}
 
function detectBias(text) {
  const biasFlags = [
    { keyword: "some critics say", label: "🧠 Framing: Deflection" },
    { keyword: "many believe", label: "🧠 Framing: Vagueness" },
    { keyword: "allegedly", label: "🧠 Framing: Distance" },
    { keyword: "concerns have been raised", label: "🧠 Framing: Passive Voice" },
    { keyword: "activists claim", label: "🧠 Framing: Dismissive Tone" },
    { keyword: "experts warn", label: "🧠 Framing: Alarmism" },
    { keyword: "critics argue", label: "🧠 Framing: Polarization" }
  ];
 
  return biasFlags
    .filter(flag => text.toLowerCase().includes(flag.keyword))
    .map(flag => flag.label);
}
 
function mapPowerStructure(url) {
  const sources = {
    GOVERNMENT: ["gov", "senate.gov", "house.gov", "whitehouse.gov", "cdc.gov", "nasa.gov"],
    CORPORATE: ["forbes.com", "bloomberg.com", "wsj.com", "businessinsider.com", "cnbc.com"],
    ACTIVIST: ["aclu.org", "greenpeace.org", "naacp.org", "hrw.org", "amnesty.org"],
    ACADEMIC: ["harvard.edu", "stanford.edu", "mit.edu", "oxford.edu", "nature.com"],
    MEDIA: ["cnn.com", "bbc.com", "nytimes.com", "washingtonpost.com", "theguardian.com", "reuters.com"]
  };
 
  const domain = url.toLowerCase();
  const tags = [];
 
  for (const [label, patterns] of Object.entries(sources)) {
    if (patterns.some(p => domain.includes(p))) {
      tags.push(label);
    }
  }
 
  return tags.length ? tags.join(" + ") : "UNKNOWN";
}
 
function detectFramingSyntax(text) {
  const flags = [];
 
  if (/\bwas\b.*\bby\b|\bwere\b.*\bby\b|\bhas been\b|\bhad been\b/.test(text.toLowerCase())) {
    flags.push("🧠 Syntax: Passive Voice");
  }
 
  if (/\bsome say\b|\bthey claim\b|\bconcerns exist\b|\bit is believed\b/.test(text.toLowerCase())) {
    flags.push("🧠 Syntax: Omission Strategy");
  }
 
  if (/\bradical\b|\bcontroversial\b|\bso-called\b|\balarming\b|\bextreme\b/.test(text.toLowerCase())) {
    flags.push("🧠 Syntax: Loaded Modifier");
  }
 
  return flags;
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
 
  return `🧠 Narrative Comparator:\n\n🔴 Source A: ${a.title}\n🌐 Domain: ${a.domain}\n🧭 Bias: ${a.bias.join(", ") || "None"}\n🏛️ Power: ${a.power}\n🧠 Syntax: ${a.syntax.join(", ") || "None"}\n\n🔵 Source B: ${b.title}\n🌐 Domain: ${b.domain}\n🧭 Bias: ${b.bias.join(", ") || "None"}\n🏛️ Power: ${b.power}\n🧠 Syntax: ${b.syntax.join(", ") || "None"}\n`;
}
 
function compareDocuments() {
  const doc1 = document.getElementById("doc1").value;
  const doc2 = document.getElementById("doc2").value;
  const results = document.getElementById("results");
 
  const findings1 = parseLegalText(doc1).split("\n");
  const findings2 = parseLegalText(doc2).split("\n");
 
  const sharedPatterns = findings1.filter(f => findings2.includes(f));
 
  results.innerText =
    `📄 Document 1 Findings:\n${findings1.join("\n")}\n\n` +
    `📄 Document 2 Findings:\n${findings2.join("\n")}\n\n` +
    (sharedPatterns.length
      ? `🔗 Shared Patterns Detected:\n${sharedPatterns.join("\n")}`
      : "🧭 No shared exclusion patterns found.");
}


// --- Main Function ---
 
async function searchSovra() {
  const query = document.getElementById("query").value.trim();
  const compareRaw = document.getElementById("toggleRaw")?.checked || false;
  const results = document.getElementById("results");

  if (!query) {
    results.innerText = "🧠 Sovra requires a symbolic query to proceed.";
    return;
  }

  // Log query to Sovra memory
  sovraMemory.push({
    query,
    timestamp: new Date().toISOString(),
    domains: [],
    biasFlags: [],
    powerTags: [],
    syntaxFlags: []
  });

  const endpoint = `/api/search?q=${encodeURIComponent(query)}&raw=${compareRaw}`;

  try {
    const response = await fetch(endpoint);
    const data = await response.json();

    if (data.error) {
      results.innerText = `⚠️ Sovra encountered a search error:\n${data.error}`;
      return;
    }

    let output = `> Constrained Logic:\nAnalyzing "${query}"...\n✅ References retrieved.\n\n> Symbolic Inference:\n🧠 Pattern scan initiated...\n`;

    if (data.organic_results && data.organic_results.length > 0) {
      data.organic_results.forEach((r, i) => {
        output += `\n${i + 1}. ${r.title}\n${r.snippet}\n🔗 ${r.link}\n`;
      });

      if (data.organic_results.length >= 2) {
        const comparison = compareNarratives(data.organic_results[0], data.organic_results[1]);
        output += `\n${comparison}\n`;
      }
    } else {
      output += "⚠️ No results found.";
    }

    output += "\nSovra has spoken.";
    results.innerText = output;

  } catch (error) {
    results.innerText = "⚠️ Sovra encountered a search error.";
    console.error("Sovra fetch error:", error);
  }
}

function compareNarratives(a, b) {
  const titleA = a.title.toLowerCase();
  const titleB = b.title.toLowerCase();

  if (titleA.includes("opinion") || titleB.includes("opinion")) {
    return "🧭 Divergent perspectives detected between sources.";
  }

  if (titleA === titleB) {
    return "🔁 Sources appear to echo the same narrative.";
  }

  return "🔍 Multiple viewpoints identified across sources.";
}
}); // closes the DOMContentLoaded block

console.log("✅ searchSovra() function loaded and ready.");
