import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import commonjs from "vite-plugin-commonjs";
import { viteRequire } from "vite-require";
import dynamicImport from "vite-plugin-dynamic-import";

export default defineConfig({
  base: "./",
  plugins: [react(), viteRequire(), dynamicImport()],
  server: {
    open: false, // automatically open the app in the browser
    port: 3333,
  },
  build: {
    outDir: "build",
  },
});
