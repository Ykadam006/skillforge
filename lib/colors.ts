/**
 * Controlled palette: ~80% neutral UI, color = meaning only.
 * Mirrors `app/globals.css` — keep in sync when tuning.
 */
export const colors = {
  background: "#F7F8FA",
  surface: "#FFFFFF",

  textPrimary: "#111827",
  textSecondary: "#6B7280",

  border: "#E5E7EB",

  primary: "#4F46E5",
  primaryHover: "#4338CA",
  primaryLight: "#EEF2FF",

  success: "#22C55E",
  successLight: "#DCFCE7",

  danger: "#EF4444",
  dangerLight: "#FEE2E2",

  warning: "#F59E0B",
  warningLight: "#FEF3C7",

  info: "#3B82F6",
  infoLight: "#DBEAFE",

  secondaryAccent: "#8B5CF6",
  secondaryAccentLight: "#EDE9FE",
} as const;

export type AppColors = typeof colors;
