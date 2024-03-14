import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  proxy: {
    "/api": {
      target: "https://chatapp-be.datdev.id.vn",
    },
  },
  server: {
    // if branch is main then use post 5173 else if branch is develop then use port 4953
    port: process.env.BRANCH === "main" ? 5173 : 4953,
  }
});
