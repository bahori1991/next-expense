import { Hono } from "hono";
import { handle } from "hono/vercel";
import { expensesRoute } from "./expenses";

export const runtime = "edge";

const app = new Hono().basePath("/api");

app.get("/test", (c) => {
  return c.json({ message: "Hello, World!" });
});

app.route("/expenses", expensesRoute);

export const GET = handle(app);
export const POST = handle(app);
