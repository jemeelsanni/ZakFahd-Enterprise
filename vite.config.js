import path from "path";

// https://vitejs.dev/config/
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

export default ({ mode }) => {
  // Load environment variables
  // eslint-disable-next-line no-undef
  const env = loadEnv(mode, process.cwd(), "");

  // Define your Vite configuration
  return defineConfig({
    plugins: [react()],
    assetsInclude: ["**/*.tif"],
    preview: {
      host: true,
      port: 5174,
    },
    test: {
      globals: true,
      environment: "jsdom",
      css: true,
      setupFiles: "./src/test/setup.ts",
    },
    resolve: {
      alias: {
        // eslint-disable-next-line no-undef
        "@": path.resolve(__dirname, "./src"),
      },
    },
    define: {
      "process.env.ENV_BACKEND_URL": JSON.stringify(env.ENV_BACKEND_URL),

      // If you want to expose all env variables, which is not recommended
      // 'process.env': env
    },
  });
};
