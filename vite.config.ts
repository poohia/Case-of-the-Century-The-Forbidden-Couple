import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteRequire } from "vite-require";
import dynamicImport from "vite-plugin-dynamic-import";

export default defineConfig({
  base: "./",
  plugins: [
    react({}),
    viteRequire(),
    dynamicImport(),
    {
      name: "custom-hmr",
      handleHotUpdate({ file, server }) {
        if (file.includes("/src/")) {
          server.ws.send({ type: "full-reload" }); // Force un rechargement complet
        }
      },
    },
  ],
  server: {
    open: false, // automatically open the app in the browser
    port: 3333,
    strictPort: true,
  },
  build: {
    outDir: "build",
  },
  define: {
    "process.env": process.env,
  },
  preview: {
    open: true,
    port: 4173,
    strictPort: true,
  },
});
