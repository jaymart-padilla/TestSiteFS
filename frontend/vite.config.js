import { defineConfig, transformWithEsbuild } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [
        react({
            babel: {
                plugins: ["styled-jsx/babel"],
            },
        }),
        {
            name: "treat-js-files-as-jsx",
            async transform(code, id) {
                if (!id.match(/src\/.*\.js$/)) return null;

                // Use the exposed transform from vite, instead of directly
                // transforming with esbuild
                return transformWithEsbuild(code, id, {
                    loader: "jsx",
                    jsx: "automatic",
                });
            },
        },
    ],

    // enable markdown
    assetsInclude: ["**/*.md"],

    optimizeDeps: {
        force: true,
        esbuildOptions: {
            loader: {
                ".js": "jsx",
            },
        },
    },

    server: {
        proxy: {
            "/api": {
                target: "http://localhost:8080",
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ""),
            },
        },
    },
});
