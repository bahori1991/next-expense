import type { ApiRoutes } from "@/app/api/[[...route]]/route";
import { hc } from "hono/client";

const client = hc<ApiRoutes>("http://localhost:3000");

export const api = client.api;
