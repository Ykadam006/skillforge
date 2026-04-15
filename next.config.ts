import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /** Lets Playwright use `127.0.0.1` while dev server prints `localhost` (HMR / dev resources). */
  allowedDevOrigins: ["127.0.0.1"],
};

export default nextConfig;
