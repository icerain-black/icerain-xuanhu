import { defineConfig } from "vite";
import vueJsx from "@vitejs/plugin-vue-jsx";
import vue from "@vitejs/plugin-vue";
import { svgstore } from "./src/vite_plugins/svgstore";
import styleImport, { VantResolve } from "vite-plugin-style-import";
// https://vitejs.dev/config/
export default defineConfig(({command}) => {
  return {
    define: command === 'build' ? {
      DEBUG: false
    } : {
      DEBUG: true
    },
    plugins: [
      vue(),
      vueJsx({
        transformOn: true,
        mergeProps: true,
      }),
      svgstore(),
      styleImport({
        resolves: [VantResolve()],
      }),
    ],
    server: {
      proxy: {
        "/api/v1": {
          target: "https://mangosteen2.hunger-valley.com",
          secure: false,
        },
      },
    },
  };
});
