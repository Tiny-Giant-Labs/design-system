import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  root: "docs",
  plugins: [vue(), tailwindcss()],
  server: {
    port: 5174,
  },
});
