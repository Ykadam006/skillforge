import { describe, expect, it } from "vitest";
import { parseSkillSlug, skillKey, skillSlug, slugify } from "@/lib/slug";

describe("slugify", () => {
  it("lowercases and replaces spaces with hyphens", () => {
    expect(slugify("Docker Basics")).toBe("docker-basics");
  });

  it("maps ampersand to and", () => {
    expect(slugify("R & D")).toBe("r-and-d");
  });
});

describe("skillKey / skillSlug", () => {
  it("builds stable keys", () => {
    expect(skillKey("devops", "Docker")).toBe("devops:docker");
    expect(skillSlug("devops", "Docker")).toBe("devops-docker");
  });
});

describe("parseSkillSlug", () => {
  it("parses category and remainder", () => {
    expect(parseSkillSlug("frontend-react")).toEqual({ categoryId: "frontend", nameSlug: "react" });
  });

  it("returns null when no hyphen", () => {
    expect(parseSkillSlug("invalid")).toBeNull();
  });
});
