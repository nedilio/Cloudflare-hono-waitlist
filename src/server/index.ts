import { Hono } from "hono";
import { accessAuth } from "./middleware/auth";
const app = new Hono();

app.use(accessAuth);

app.get("/", (c) => c.text("Hono!"));

app.get("/api/health", (c) => {
  console.log("first");
  return c.json({ status: "ok 🔥" });
});

export default app;
