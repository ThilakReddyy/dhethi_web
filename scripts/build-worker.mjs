import { mkdir, writeFile } from "node:fs/promises";

const workerSource = `const secure = (response) => {
  const next = new Response(response.body, response);
  next.headers.set("X-Content-Type-Options", "nosniff");
  next.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  next.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  next.headers.set("Cross-Origin-Opener-Policy", "same-origin");
  next.headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
  return next;
};

export default {
  async fetch(request, env) {
    const response = await env.ASSETS.fetch(request);

    if (response.status !== 404 || request.method !== "GET") {
      return secure(response);
    }

    const acceptsHtml = request.headers.get("Accept")?.includes("text/html");
    if (!acceptsHtml) return secure(response);

    const url = new URL(request.url);
    url.pathname = "/index.html";
    const fallback = await env.ASSETS.fetch(new Request(url, request));
    return secure(fallback);
  },
};
`;

await mkdir(new URL("../dist/server/", import.meta.url), { recursive: true });
await writeFile(new URL("../dist/server/index.js", import.meta.url), workerSource);
