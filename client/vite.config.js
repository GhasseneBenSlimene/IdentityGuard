import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
// allow Vite to host the server on the network
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
  },
});
