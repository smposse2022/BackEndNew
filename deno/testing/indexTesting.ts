import { assertEquals } from "../deps.ts";

// test
Deno.test("resultado suma", () => {
  const suma = 1 + 2;
  assertEquals(suma, 3);
});
