import { Hono } from "hono";
import { handle } from "hono/vercel";
import { expensesRoute } from "./expenses";

export const runtime = "edge";

const app = new Hono();
const apiRoutes = app.basePath("/api").route("/expenses", expensesRoute);

export const GET = handle(app);
export const POST = handle(app);

export type ApiRoutes = typeof apiRoutes;
