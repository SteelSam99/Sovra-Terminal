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
function searchSovra() {
  const query = document.getElementById("query").value.trim();
  const results = document.getElementById("results");

  if (!query) {
    results.innerText = "🧠 Sovra requires a symbolic query to proceed.";
    return;
  }

  // Simulated response (replace with real API call)
  const simulatedResults = [
    {
      title: "Ohio Civil Rights Act: Protections Against Discrimination",
      snippet: "Learn how Ohio law protects individuals from discrimination in housing, employment, and public spaces.",
      url: "https://www.legalclarity.org/ohio-civil-rights-act"
    },
    {
      title: "A Shadow of Ohio’s Racist Past?",
      snippet: "An examination of unenforceable restrictive covenants and their lingering impact on Ohio housing law.",
      url: "https://law.capital.edu/ohio-restrictive-covenants"
    }
  ];

  let output = `> Constrained Logic:\nAnalyzing "${query}"...\n✅ Legal references found.\n\n> Symbolic Inference:\n🧠 Pattern detected: semantic camouflage.\n🛡️ Residual exclusion syntax active.\n\n`;

  simulatedResults.forEach((r, i) => {
    output += `🔗 [${i + 1}] ${r.title}\n${r.snippet}\n${r.url}\n\n`;
  });

  output += "Sovra has spoken.";
  results.innerText = output;
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
