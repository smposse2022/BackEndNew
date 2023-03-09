import { parse } from "./deps.ts";

const fecha = parse("03-04-23", "dd-mm-yyyy");

console.log(fecha);

import { config } from "https://deno.land/x/dotenv@v3.2.2/mod.ts";

const { PORT } = config();

console.log(PORT);
