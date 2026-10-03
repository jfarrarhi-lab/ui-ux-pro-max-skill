import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { viteSingleFile } from "vite-plugin-singlefile";

/** Baut die komplette Seite als EINE HTML-Datei (JS, CSS, Fonts eingebettet). */
export default defineConfig({
  plugins: [react(), tailwindcss(), viteSingleFile()],
  build: { outDir: "dist-single", assetsInlineLimit: 100_000_000 },
});
