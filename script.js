const sovraMemory = [];

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

    output += "Sovra has spoken.";
    results.innerText = output;

  } catch (error) {
    results.innerText = "⚠️ Sovra encountered a search error.";
    console.error(error);
  }
}

