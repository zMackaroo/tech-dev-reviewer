import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// GitHub project pages: https://<user>.github.io/<repo>/
// Set VITE_BASE_PATH=/ when deploying to a user site (username.github.io repo).
const base = "/";

export default defineConfig({
  base,
  plugins: [react()],
});
