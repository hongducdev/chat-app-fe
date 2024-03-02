import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  proxy: {
    "/api": {
      target: "http://54.254.151.131:4090",
    },
  },
});
