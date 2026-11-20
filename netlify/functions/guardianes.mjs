// Guarda el avance de cada guardián y el ranking compartido (Netlify Blobs).
import { getStore } from "@netlify/blobs";

const ID = /^[A-Z0-9]{8}$/;
const json = (o, s = 200) =>
  new Response(JSON.stringify(o), {
    status: s,
    headers: { "content-type": "application/json", "cache-control": "no-store" },
  });
const num = (v, max) => Math.max(0, Math.min(max, Math.floor(Number(v) || 0)));

export default async (req) => {
  const store = getStore({ name: "guardianes", consistency: "strong" });
  const url = new URL(req.url);

  if (req.method === "GET") {
    const id = url.searchParams.get("id");
    if (id) {
      if (!ID.test(id)) return json({ error: "Código no válido" }, 400);
      const d = await store.get("p/" + id, { type: "json" });
      return d ? json(d) : json({ error: "No existe ese código" }, 404);
    }
    const r = (await store.get("ranking", { type: "json" })) || [];
    const me = url.searchParams.get("me");
    const pos = me ? r.findIndex((x) => x.id === me) + 1 : 0;
    return json({
      top: r.slice(0, 10).map(({ id, ...x }) => x),
      total: r.length,
      pos,
    });
  }

  if (req.method === "POST") {
    let b;
    try { b = await req.json(); } catch { return json({ error: "JSON" }, 400); }
    const id = String(b.id || "");
    if (!ID.test(id)) return json({ error: "id" }, 400);
    const name = String(b.name || "").replace(/[<>]/g, "").trim().slice(0, 20);
    if (!name) return json({ error: "name" }, 400);
    const raw = JSON.stringify(b.data || {});
    if (raw.length > 30000) return json({ error: "size" }, 413);

    await store.setJSON("p/" + id, { id, name, data: b.data || {}, updated: num(b.updated, 1e15) });

    const entry = {
      id, n: name, xp: num(b.xp, 1e6), b: num(b.books, 60), lv: num(b.lv, 10),
      p: num(b.perf, 60), m: String(b.mode || "normal").slice(0, 10), t: Date.now(),
    };
    const r = ((await store.get("ranking", { type: "json" })) || []).filter((x) => x.id !== id);
    r.push(entry);
    r.sort((a, c) => c.xp - a.xp || c.b - a.b || a.t - c.t);
    await store.setJSON("ranking", r.slice(0, 1000));
    return json({ ok: true, pos: r.findIndex((x) => x.id === id) + 1, total: r.length });
  }

  return json({ error: "Método no permitido" }, 405);
};

export const config = { path: "/api/guardianes" };
