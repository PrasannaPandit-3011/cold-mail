import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), svgr(), tsconfigPaths()],
  test: {
    include: ["**/src/**/*.spec.*"],
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/setup-tests.ts",
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
    },
  },
});
