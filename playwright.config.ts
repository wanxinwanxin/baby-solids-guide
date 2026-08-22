import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  timeout: 90_000,
  retries: process.env.CI ? 2 : 0,
  use: {
    baseURL: "http://localhost:3100",
  },
  webServer: {
    command: "npm run dev -- --port 3100",
    port: 3100,
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
});
