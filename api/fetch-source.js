/* ============================================================
   Sovra F.I.D.A.R.C.H. — Server-Side Fetch Relay
   Vercel Serverless Function: /api/fetch-source.js
   
   Purpose:
     - Bypass browser CORS restrictions via server-to-server fetch
     - Preserve PTF pipeline integrity (read-only, bounded)
     - NFIE compliant — no content modification, no suppression
   
   Constraints (matching PTF config):
     - Public URLs only (http/https)
     - Hard byte cap: 1.2MB
     - Timeout: 8 seconds
     - Text content only
     - No authentication, no cookies forwarded
   ============================================================ */

export default async function handler(req, res) {

  // Only GET requests
  if (req.method !== "GET") {
    return res.status(405).json({ ok: false, error: "METHOD_NOT_ALLOWED" });
  }

  const { url } = req.query;

  // Validate URL
  if (!url) {
    return res.status(400).json({ ok: false, error: "MISSING_URL" });
  }

  let parsedUrl;
  try {
    parsedUrl = new URL(url);
  } catch (_) {
    return res.status(400).json({ ok: false, error: "INVALID_URL" });
  }

  // Public URLs only — no localhost, no private ranges
  const hostname = parsedUrl.hostname;
  if (
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    hostname.startsWith("192.168.") ||
    hostname.startsWith("10.") ||
    hostname.startsWith("172.16.") ||
    parsedUrl.protocol !== "https:" && parsedUrl.protocol !== "http:"
  ) {
    return res.status(403).json({ ok: false, error: "NON_PUBLIC_URL" });
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent": "Sovra/1.0 (F.I.D.A.R.C.H. PublicTextFetcher)",
        // No cookies, no auth headers — read-only public access only
      },
      redirect: "follow"
    });

    if (!response.ok) {
      return res.status(200).json({
        ok: false,
        error: "HTTP_" + response.status
      });
    }

    // Text content only
    const contentType = response.headers.get("content-type") || "";
    if (!contentType.includes("text/html") && !contentType.includes("text/plain")) {
      return res.status(200).json({ ok: false, error: "NON_TEXT_CONTENT" });
    }

    // Stream with byte cap
    const reader = response.body.getReader();
    let received = 0;
    const chunks = [];

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      received += value.byteLength;
      if (received > 1_200_000) {
        return res.status(200).json({ ok: false, error: "CONTENT_TOO_LARGE" });
      }
      chunks.push(value);
    }

    const html = new TextDecoder("utf-8").decode(
      new Uint8Array(chunks.flatMap(c => Array.from(c)))
    );

    // Paywall detection
    const lower = html.toLowerCase();
    if (
      lower.includes("sign in to continue") ||
      lower.includes("paywall") ||
      lower.includes("metered") ||
      lower.includes("login required") ||
      lower.includes("subscribers only")
    ) {
      return res.status(200).json({ ok: false, error: "PAYWALL_OR_LOGIN_DETECTED" });
    }

    // Return raw HTML — PTF pipeline does its own extraction
    return res.status(200).json({
      ok: true,
      html,
      host: hostname,
      contentType
    });

  } catch (e) {
    if (e.name === "AbortError") {
      return res.status(200).json({ ok: false, error: "TIMEOUT" });
    }
    return res.status(200).json({ ok: false, error: "FETCH_FAILED" });
  } finally {
    clearTimeout(timer);
  }
}
