import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";
import pkg from "./package.json" assert { type: "json" };
import autoprefixer from "autoprefixer";
import postcss from "rollup-plugin-postcss";

export default {
    input: "src/index.ts",
    output: {
        file: "dist/bundle/bundle.js",
        format: "es"
    },
    external: [...Object.keys(pkg.dependencies || {})],
    plugins: [
        typescript(),
        postcss({
            plugins: [autoprefixer()],
            modules: true,
            sourceMap: true,
            extract: true,
            minimize: true
        }),
        terser() // minifies generated bundles
    ]
};
