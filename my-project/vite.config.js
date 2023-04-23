import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    // Listen on all available network interfaces
    host: "0.0.0.0",
    // The port to listen on
    port: 3000,
  },
});
