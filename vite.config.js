import { config } from "dotenv";
import { execSync } from "child_process";
import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import purgecss from "@fullhuman/postcss-purgecss";

// load dotenv
config();

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [svelte()],

    css: {
        preprocessorOptions: {
            scss: {
                additionalData: '@use "src/variables.scss" as *;',
            },
        },

        postcss: {
            plugins: [
                purgecss({
                    content: ["./src/**/*.svelte"],
                    safelist: ["html", "body", "button"],
                }),
            ],
        },
    },

    define: {
        BUILD_DATE: JSON.stringify(new Date().toISOString()),
        GIT_HASH: JSON.stringify(execSync("git rev-parse HEAD").toString().trim()),
        GIT_REMOTE: JSON.stringify(execSync("git remote get-url origin").toString().trim()),
        APP_VERSION: JSON.stringify(process.env.npm_package_version),
        // data from dotenv
        NAME: JSON.stringify(process.env.c_NAME),
        GITHUB: JSON.stringify(process.env.c_GITHUB),
        EMAIL: JSON.stringify(process.env.c_EMAIL),
        REPORT_EMAIL: JSON.stringify(process.env.c_REPORT_EMAIL),
        API_HOST: JSON.stringify(process.env.c_API_HOST),
        STATUS_URL: JSON.stringify(process.env.c_STATUS_URL),
    },
});
