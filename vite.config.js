import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/react-kadai/",   // ← これを追加（リポジトリ名）
  plugins: [react()],
});
