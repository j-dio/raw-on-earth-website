// Zero-dependency screenshot tool over the Chrome DevTools Protocol.
//
// Why this exists: `chrome --headless --screenshot --window-size=390,844` does
// NOT give you a 390px page on Windows. Chrome refuses to open a window under
// ~500px, so the image is a 390px CROP of a 500px layout. Every "mobile" bug it
// shows is an artifact. CDP's Emulation.setDeviceMetricsOverride sets the real
// CSS viewport, which is the only honest way to check a phone from here.
//
// Usage: node shot.mjs <baseUrl> <outDir> <path>:<name>:<W>x<H>[:full|:scroll<px>] ...
//   node shot.mjs http://localhost:3800 ./out /:home:390x844:full /about:about:1280x900
//
// `full` captures the whole page, but lazy images below the fold never load in
// that mode, so long pages come back with empty picture frames. To look at one
// band for real, scroll to it instead: /:offerings:1280x900:scroll4200

import { spawn } from "node:child_process";
import { mkdirSync, writeFileSync, rmSync } from "node:fs";
import { join } from "node:path";

const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const [baseUrl, outDir, ...specs] = process.argv.slice(2);
if (!baseUrl || !outDir || !specs.length) {
  console.error("usage: node shot.mjs <baseUrl> <outDir> <path>:<name>:<W>x<H>[:full] ...");
  process.exit(1);
}
mkdirSync(outDir, { recursive: true });

const port = 9222 + Math.floor(Math.random() * 500);
const profile = join(outDir, `.prof-${port}`);
const chrome = spawn(CHROME, [
  "--headless=new",
  "--disable-gpu",
  "--hide-scrollbars",
  "--force-prefers-reduced-motion",
  `--remote-debugging-port=${port}`,
  `--user-data-dir=${profile}`,
  "--no-first-run",
  "about:blank",
], { stdio: "ignore" });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function targets() {
  for (let i = 0; i < 60; i++) {
    try {
      const r = await fetch(`http://127.0.0.1:${port}/json/list`);
      const j = await r.json();
      const page = j.find((t) => t.type === "page");
      if (page) return page;
    } catch {}
    await sleep(250);
  }
  throw new Error("Chrome did not expose a debugging target");
}

class Cdp {
  constructor(ws) { this.ws = ws; this.id = 0; this.pending = new Map();
    ws.addEventListener("message", (e) => {
      const m = JSON.parse(e.data);
      if (m.id && this.pending.has(m.id)) {
        const { resolve, reject } = this.pending.get(m.id);
        this.pending.delete(m.id);
        m.error ? reject(new Error(m.error.message)) : resolve(m.result);
      }
    });
  }
  send(method, params = {}) {
    const id = ++this.id;
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }
}

const page = await targets();
const ws = new WebSocket(page.webSocketDebuggerUrl);
await new Promise((r) => ws.addEventListener("open", r, { once: true }));
const cdp = new Cdp(ws);
await cdp.send("Page.enable");
await cdp.send("Runtime.enable");

for (const spec of specs) {
  const [path, name, size, full] = spec.split(":");
  const [w, h] = size.split("x").map(Number);
  // Mobile gets a touch device profile; desktop does not. deviceScaleFactor 2
  // on the phone so the capture matches what a phone actually renders.
  const mobile = w < 768;
  await cdp.send("Emulation.setDeviceMetricsOverride", {
    width: w, height: h,
    deviceScaleFactor: mobile ? 2 : 1,
    mobile,
    screenWidth: w, screenHeight: h,
  });
  await cdp.send("Page.navigate", { url: baseUrl + path });
  // No load event race: poll for the document to settle, then give fonts and
  // the reveal observers a beat. Cheaper than wiring Page.loadEventFired.
  await sleep(3000);
  if (full && full.startsWith("scroll")) {
    const y = Number(full.slice(6)) || 0;
    await cdp.send("Runtime.evaluate", { expression: `window.scrollTo(0, ${y})` });
    // Long enough for the lazy images that just entered the viewport to arrive.
    await sleep(2500);
  }
  const { data } = await cdp.send("Page.captureScreenshot", {
    format: "png",
    captureBeyondViewport: full === "full",
  });
  const file = join(outDir, `${name}.png`);
  writeFileSync(file, Buffer.from(data, "base64"));
  console.log(`${file}  ${w}x${h}${mobile ? " (mobile, dsf2)" : ""}${full ? " " + full : ""}`);
}

ws.close();
chrome.kill();
await sleep(400);
try { rmSync(profile, { recursive: true, force: true }); } catch {}
