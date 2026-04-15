import { describe, expect, it } from "vitest";
import { findCertificationForGuideCert } from "@/lib/cert-match";
import type { CertificationTrack } from "@/types/progress";

const certs: CertificationTrack[] = [
  {
    id: "aws-clf",
    name: "AWS Cloud Practitioner (CLF-C02)",
    progress: 0,
    readiness: 20,
    notes: "",
    checklist: [],
  },
];

describe("findCertificationForGuideCert", () => {
  it("returns undefined without guide cert", () => {
    expect(findCertificationForGuideCert(certs, undefined)).toBeUndefined();
  });

  it("matches by overlapping name", () => {
    const hit = findCertificationForGuideCert(certs, {
      name: "AWS Cloud Practitioner",
      desc: "x",
    });
    expect(hit?.id).toBe("aws-clf");
  });
});
