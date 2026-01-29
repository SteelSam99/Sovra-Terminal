function invokeSovra() {
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
