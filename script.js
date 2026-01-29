const sovraMemory = [];
function invokeSovra() {
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
  const query = document.getElementById("query").value.trim();
  const results = document.getElementById("results");

  if (!query) {
    results.innerText = "Sovra awaits your invocation...";
    return;
  }

  // Simulated dual-channel response
  results.innerText =
    `> Constrained Logic:\nAnalyzing "${query}"...\n✅ Legal references found.\n\n` +
    `> Symbolic Inference:\n🧠 Pattern detected: semantic camouflage.\n` +
    `🧬 Residual exclusion syntax active.\n\n` +
    `Sovra has spoken.`;
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

  const apiKey = "01a0b0cdbab89d254046bba2780ae2bb71ca275e4d118b8a3bb6a5062976189d";
  const endpoint = `https://serpapi.com/search.json?q=${encodeURIComponent(query)}&engine=google&api_key=${apiKey}`;

  try {
    const response = await fetch(endpoint);
    const data = await response.json();

    let output = `> Constrained Logic:\nAnalyzing "${query}"...\n✅ References retrieved.\n\n> Symbolic Inference:\n🧠 Pattern scan initiated...\n`;

    if (data.organic_results) {
      data.organic_results.forEach((r, i) => {
        const domain = classifyActivity(`${r.title} ${r.snippet}`);
        const biasTags = detectBias(`${r.title} ${r.snippet}`);
        const biasOutput = biasTags.length > 0 ? biasTags.join(", ") : "None";
        const powerTags = mapPowerStructure(r.link);
        const syntaxFlags = detectFramingSyntax(`${r.title} ${r.snippet}`);
        const syntaxOutput = syntaxFlags.length > 0 ? syntaxFlags.join(", ") : "None";

        const memoryEntry = sovraMemory[sovraMemory.length - 1];
        memoryEntry.domains.push(domain);
        memoryEntry.biasFlags.push(...biasTags);
        memoryEntry.powerTags.push(powerTags);
        memoryEntry.syntaxFlags.push(...syntaxFlags);

        output += `🔗 [${i + 1}] ${r.title}\n${r.snippet || "No snippet"}\n${r.link}\n🌐 Domain: ${domain}\n🧭 Bias Flags: ${biasOutput}\n🏛️ Power Structure: ${powerTags}\n🧠 Syntax Flags: ${syntaxOutput}\n\n`;
      });

      if (data.organic_results.length >= 2) {
        const comparison = compareNarratives(data.organic_results[0], data.organic_results[1]);
        output += `\n${comparison}\n`;
      }
    } else {
      output += "⚠️ No results found.";
    }

    if (compareRaw) {
      const rawEndpoint = `https://serpapi.com/search.json?q=${encodeURIComponent(query)}&engine=google&api_key=${apiKey}`;
      const rawResponse = await fetch(rawEndpoint);
      const rawData = await rawResponse.json();

      if (rawData.organic_results && rawData.organic_results.length >= 2) {
        const rawA = rawData.organic_results[0];
        const rawB = rawData.organic_results[1];

        const rawComparison = `🌐 Raw Comparator:\n\n🔴 Source A: ${rawA.title}\n${rawA.snippet || "No snippet"}\n🔗 ${rawA.link}\n\n🔵 Source B: ${rawB.title}\n${rawB.snippet || "No snippet"}\n🔗 ${rawB.link}\n`;

        output += `\n${rawComparison}\n`;
      }
    }

    output += "Sovra has spoken.";
    results.innerText = output;
  } catch (error) {
    results.innerText = "⚠️ Sovra encountered a search error.";
    console.error(error);
  }
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
document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("query");
  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      searchSovra();
    }
  });
});


