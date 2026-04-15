import type { CertificationTrack } from "@/types/progress";
import type { GuideCert } from "@/types/guide";

/** Best-effort match between guide cert copy and persisted certification rows. */
export function findCertificationForGuideCert(
  certifications: CertificationTrack[],
  guideCert?: GuideCert,
): CertificationTrack | undefined {
  if (!guideCert?.name?.trim()) return undefined;
  const n = guideCert.name.trim().toLowerCase();
  const exact = certifications.find((c) => c.name.trim().toLowerCase() === n);
  if (exact) return exact;
  const prefix = n.slice(0, 18);
  return certifications.find(
    (c) =>
      c.name.toLowerCase().includes(prefix) ||
      prefix.includes(c.name.trim().toLowerCase().slice(0, 14)),
  );
}
