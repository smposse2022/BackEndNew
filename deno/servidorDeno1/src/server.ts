import { serve } from "../../deps.ts";

const PORT = 8080;

const handler = (request: Request) => {
  const body = "hello desde deno";

  return new Response(body);
};
await serve(handler, { port: PORT });
