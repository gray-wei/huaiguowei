import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { dirname, extname, join, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(dirname(fileURLToPath(import.meta.url))), "_site");
const port = Number(process.env.PORT || 4173);
const contentTypes = {
  ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8", ".pdf": "application/pdf",
  ".jpg": "image/jpeg", ".png": "image/png", ".webp": "image/webp", ".svg": "image/svg+xml", ".mp4": "video/mp4",
};
const server = createServer((request, response) => {
  if (!["GET", "HEAD"].includes(request.method)) {
    response.writeHead(405, { allow: "GET, HEAD" }); response.end(); return;
  }
  let pathname;
  try { pathname = decodeURIComponent(new URL(request.url, "http://127.0.0.1").pathname); }
  catch { response.writeHead(400); response.end("Invalid path"); return; }
  let candidate = resolve(root, pathname.replace(/^\/+/, ""));
  if (candidate !== root && !candidate.startsWith(root + sep)) {
    response.writeHead(404); response.end("Not found"); return;
  }
  if (existsSync(candidate) && statSync(candidate).isDirectory()) {
    if (!pathname.endsWith("/")) {
      response.writeHead(301, { location: pathname + "/" }); response.end(); return;
    }
    candidate = join(candidate, "index.html");
  }
  if (!existsSync(candidate) || !statSync(candidate).isFile()) {
    response.writeHead(404, { "content-type": "text/plain; charset=utf-8" }); response.end("Not found"); return;
  }
  const size = statSync(candidate).size;
  const headers = { "content-type": contentTypes[extname(candidate)] || "application/octet-stream", "accept-ranges": "bytes", "content-length": size };
  let start = 0;
  let end = size - 1;
  let status = 200;
  if (request.method === "GET" && request.headers.range) {
    const match = /^bytes=(\d*)-(\d*)$/.exec(request.headers.range);
    if (match && (match[1] || match[2])) {
      if (!match[1]) start = Math.max(0, size - Number(match[2]));
      else { start = Number(match[1]); if (match[2]) end = Math.min(end, Number(match[2])); }
    }
    if (!match || (!match[1] && !match[2]) || !Number.isSafeInteger(start) || !Number.isSafeInteger(end) || start > end || start >= size || (!match[1] && Number(match[2]) === 0)) {
      response.writeHead(416, { "content-range": `bytes */${size}` }); response.end(); return;
    }
    status = 206;
    headers["content-range"] = `bytes ${start}-${end}/${size}`;
    headers["content-length"] = end - start + 1;
  }
  response.writeHead(status, headers);
  if (request.method === "HEAD") { response.end(); return; }
  const stream = createReadStream(candidate, { start, end });
  stream.on("error", () => response.destroy());
  stream.pipe(response);
});
server.listen(port, "127.0.0.1", () => console.log(`Preview server running at http://127.0.0.1:${server.address().port}`));
