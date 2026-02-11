import { fileURLToPath } from "node:url";
import { resolve, dirname } from "node:path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";
import dts from "vite-plugin-dts";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    dts({
      tsconfigPath: "./tsconfig.app.json",
      rollupTypes: true,
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "PriscopeDesignSystem",
      formats: ["es"],
      fileName: "index",
    },
    rollupOptions: {
      // Externalize deps that shouldn't be bundled into the library
      external: [
        "vue",
        "vue-router",
        "@heroicons/vue/24/outline",
        "@heroicons/vue/20/solid",
        "@heroicons/vue/16/solid",
        "@vueuse/core",
        "lodash-es",
        "date-fns",
        "date-fns-tz",
        "tippy.js",
        "tippy.js/dist/tippy.css",
        "tippy.js/themes/light.css",
        "maska/vue",
        "@vuepic/vue-datepicker",
        "@vuepic/vue-datepicker/dist/main.css",
      ],
      output: {
        globals: {
          vue: "Vue",
        },
      },
    },
    cssCodeSplit: false,
  },
});
