import { build } from "esbuild";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outfile = resolve(
  __dirname,
  "../custom_components/motogp/frontend/motogp-cards.js",
);

await build({
  entryPoints: [resolve(__dirname, "src/entry.ts")],
  outfile,
  bundle: true,
  minify: true,
  format: "esm",
  target: "es2021",
  legalComments: "none",
  sourcemap: false,
});

console.log(`Built ${outfile}`);
