import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { getGuide } from "../lib/guide";

const out = resolve(process.cwd(), "data/master-learning-guide.json");
writeFileSync(out, JSON.stringify(getGuide(), null, 2), "utf8");
console.log("Wrote", out);
