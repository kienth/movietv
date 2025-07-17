import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://api.movietv.invesystem.xyz", // your backend server
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
