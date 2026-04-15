import { describe, expect, it } from "vitest";
import { mergeRadarWithTargets, RADAR_TARGET_BY_AXIS } from "@/lib/radar-targets";

describe("mergeRadarWithTargets", () => {
  it("uses store targets when provided", () => {
    const rows = [{ axis: "DSA", value: 40 }];
    const merged = mergeRadarWithTargets(rows, { DSA: 55 });
    expect(merged[0].You).toBe(40);
    expect(merged[0].Target).toBe(55);
  });

  it("falls back to defaults when axis missing in overrides", () => {
    const rows = [{ axis: "Languages", value: 10 }];
    const merged = mergeRadarWithTargets(rows, {});
    expect(merged[0].Target).toBe(RADAR_TARGET_BY_AXIS.Languages);
  });
});
