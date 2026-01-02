import { Hono } from "hono";
const app = new Hono();

app.get("/", (c) => c.text("Hono!"));

app.get("/api/health", (c) => c.json({ status: "ok 🔥" }));

export default app;
