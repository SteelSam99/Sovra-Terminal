const sovraMemory = [];

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

return `🧠 Narrative Comparator:\n\n🔴 Source A: ${a.title}\n🌐 Domain: ${a.domain}\n🧭 Bias: ${a.bias.join(", ") || "None"}\n🏛️ Power: ${a.power}\n🧠 Syntax: ${a.syntax.join(", ") || "None"}\n\n🔵 Source B: ${b.title}\n🌐 Domain: ${b.domain}\n🧭 Bias: ${b.bias.join(", ") || "None"}\n🏛️ Power: ${b.power}\n🧠 Syntax: ${b.syntax.join(", ") || "None"}\n`;}


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

async function searchSovra() {
  const query = document.getElementById("query").value.trim();
  const compareRaw = document.getElementById("toggleRaw").checked;
  const results = document.getElementById("results");

  if (!query) {
    results.innerText = "🧠 Sovra requires a symbolic query to proceed.";
    return;
  }

  sovraMemory.push({
    query,
    timestamp: new Date().toISOString(),
    domains: [],
    biasFlags: [],
    powerTags: [],
    syntaxFlags: []
  });

  const endpoint = `/api/search?q=${encodeURIComponent(query)}`;

  try {
    const response = await fetch(endpoint);
    console.log("SerpApi status:", response.status);
    const data = await response.json();

    if (data.error) {
      console.error("SerpApi error:", data.error);
      results.innerText = `⚠️ Sovra encountered a search error:\n${data.error}`;
      return;
    }

    let output = `> Constrained Logic:\nAnalyzing "${query}"...\n✅ References retrieved.\n\n> Symbolic Inference:\n🧠 Pattern scan initiated...\n`;

    if (data.organic_results) {
      data.organic_results.forEach((r, i) => {
        const domain = classifyActivity(`${r.title} ${r.snippet}`);
        const biasTags = detectBias(`${r.title} ${r.snippet}`);
        const biasOutput = biasTags.length > 0 ? biasTags.join(", ") : "None";
        const powerTags = mapPowerStructure(r.link);
        const syntaxFlags = detectFramingSyntax(`${r.title} ${r.snippet}`);
        const syntaxOutput = syntaxFlags.length > 0 ? syntaxFlags.join(", ") : "
