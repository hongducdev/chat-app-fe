import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  proxy: {
    "/api": {
      target: "https://chatapp-be.datdev.id.vn",
    },
  },
});
