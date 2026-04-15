import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { cats } from "../data/cats";

const out = resolve(process.cwd(), "data/master-learning-guide.json");
writeFileSync(out, JSON.stringify({ cats }, null, 2), "utf8");
console.log("Wrote", out);
