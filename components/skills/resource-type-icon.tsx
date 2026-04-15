import type { LucideIcon } from "lucide-react";
import { BookOpen, FileText, FolderGit, GraduationCap, Link2, Video } from "lucide-react";

const FALLBACK: LucideIcon = Link2;

export function resourceIconForType(type: string): LucideIcon {
  const t = type.toLowerCase();
  if (t.includes("video") || t.includes("youtube") || t.includes("watch")) return Video;
  if (t.includes("course") || t.includes("udemy") || t.includes("learn")) return GraduationCap;
  if (t.includes("doc") || t.includes("read") || t.includes("article")) return BookOpen;
  if (t.includes("repo") || t.includes("github") || t.includes("git")) return FolderGit;
  if (t.includes("pdf") || t.includes("sheet") || t.includes("cheat")) return FileText;
  return FALLBACK;
}
