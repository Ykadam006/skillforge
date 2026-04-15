import type { GuideCategory } from "@/types/guide";
import { ai } from "./ai";
import { backend } from "./backend";
import { certs } from "./certs";
import { database } from "./database";
import { design } from "./design";
import { devops } from "./devops";
import { dsa } from "./dsa";
import { frontend } from "./frontend";
import { lang } from "./lang";
import { testing } from "./testing";

export const cats: GuideCategory[] = [
  lang,
  frontend,
  backend,
  database,
  devops,
  ai,
  testing,
  dsa,
  design,
  certs,
];
