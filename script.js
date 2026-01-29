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
