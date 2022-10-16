import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    plugins: [react(), tsconfigPaths()],
    server: {
      proxy: {
        "/api": `${process.env.VITE_APP_PROXY}`,
      },
    },
  });
};
