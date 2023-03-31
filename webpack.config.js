// Generated using webpack-cli https://github.com/webpack/webpack-cli

module.exports = (env, _) => {
    const path = require("path");
    const HtmlWebpackPlugin = require("html-webpack-plugin");
    const MiniCssExtractPlugin = require("mini-css-extract-plugin");
    const NpmDtsPlugin = require("npm-dts-webpack-plugin");
    const DotEnvPlugin = require("dotenv-webpack");

    const isBundle = env.mode === "bundle";
    const environment = process.env.NODE_ENV ?? "development";
    const isProduction = process.env.NODE_ENV === "production";
    const stylesHandler = MiniCssExtractPlugin.loader;
    const distPath = path.resolve(__dirname, isBundle ? "dist/bundle" : "dist/esm");

    console.info("============================================");
    console.info(`Starting build for: ${env.mode}`);
    console.info(`Environment: ${environment}`);
    console.info(`Destination path: ${distPath}`);
    console.info("============================================");

    console.info("");
    console.info("");

    console.info("█▄                                                                          ▄▄");
    console.info("████▄                                                                ▄▄████▀▀ ");
    console.info("███████▄                                                      ▄▄████████▀    ▄▀");
    console.info("██████████▄                                            ▄▄▄███████████▀    ▄██▀");
    console.info("█████████████▄                                  ▄▄▄███████████████▀    ▄███▀   ▄");
    console.info("████████████████▄                         ▄▄███████████████████▀    ▄█████▀  ▄██");
    console.info("███████████████████▄               ▄▄███████████████████████▀    ▄██████▀   ████");
    console.info("██████████████████▀▀▀       ▄▄▄██████████████████████████▀    ▄███████▀   ▄█████");
    console.info("███████████▀▀▀       ▄▄▄██████████████████████████████▀    ▄█████████▀   ███████");
    console.info("█████▀▀       ▄▄▄██████████████████████████████████▀    ▄██████████▀   ▄████████");
    console.info("▀       ▄▄██████████████████████████████████████▀    ▄████████████   ▄██████████");
    console.info(" ▄▄██████████████████████████████████████████▀    ▄█████████████▀   ████████████");
    console.info("██████████████████████████████████████████▀    ▄███████████████   ▄█████████████");
    console.info("███████████████████████████████████████▀    ▄████████████████▀   ███████████████");
    console.info("████████████████████████████████████▀    ▄█████████████████▀   ▄████████████████");
    console.info("█████████████████████████████████▀    ▄███████████████████   ▄██████████████████");
    console.info("██████████████████████████████▀    ▄████████████████████▀   ████████████████████");
    console.info("███████████████████████████▀    ▄██████████████████████   ▄█████████████████████");
    console.info("████████████████████████▀    ▄███████████████████████▀   ███████████████████████");
    console.info("█████████████████████▀      ▀██████████████████████▀      ▀█████████████████████");
    console.info("██████████████████▀           ████████████████████           ▀██████████████████");
    console.info("███████████████▀               ▀████████████████▀               ▀███████████████");
    console.info("████████████▀                    ██████████████                    ▀████████████");
    console.info("█████████▀                        ▀██████████▀                        ▀█████████");
    console.info("██████▀                            ▀███████▀                             ▀██████");
    console.info("███▀                                 █████                                  ▀▀██");
    console.info("█▀                                    ▀█▀                                      ▀");
    console.info("");
    console.info("");

    console.info("         ____        _ _     _    _____ _             _           _ _ ");
    console.info("        |  _ \\      (_) |   | |  / ____| |           | |         | | |");
    console.info("        | |_) |_   _ _| | __| | | (___ | |_ __ _ _ __| |_ ___  __| | |");
    console.info("        |  _ <| | | | | |/ _` |  \\___ \\| __/ _` | '__| __/ _ \\/ _` | |");
    console.info("        | |_) | |_| | | | (_| |  ____) | || (_| | |  | ||  __/ (_| |_|");
    console.info("        |____/ \\__,_|_|_|\\__,_| |_____/ \\__\\__,_|_|   \\__\\___|\\__,_(_)");

    console.info("");
    console.info("");

    const config = {
        entry: "./src/index.ts",
        output: {
            path: distPath,
            filename: "library.js",
            globalObject: "this"
        },
        plugins: [
            new MiniCssExtractPlugin(),
            new DotEnvPlugin({
                path: path.resolve(__dirname, `./.env.${environment}`)
            })
        ],
        module: {
            rules: [
                {
                    test: /\.(ts|js)$/i,
                    loader: "ts-loader",
                    exclude: /node_modules/,
                    options: {
                        compilerOptions: {
                            documentation: false
                        }
                    }
                },
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        stylesHandler,
                        {
                            loader: "css-loader",
                            options: {
                                esModule: true,
                                modules: {
                                    localIdentName: "[name]__[local]--[hash:base64:5]"
                                }
                            }
                        },
                        "postcss-loader",
                        "sass-loader"
                    ]
                },
                {
                    test: /\.css$/i,
                    use: [
                        stylesHandler,
                        {
                            loader: "css-loader",
                            options: {
                                esModule: true,
                                modules: {
                                    localIdentName: "[name]__[local]--[hash:base64:5]"
                                }
                            }
                        },
                        "postcss-loader"
                    ]
                },
                {
                    test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                    type: "asset"
                }

                // Add your rules for custom modules here
                // Learn more about loaders from https://webpack.js.org/loaders/
            ]
        },
        resolve: {
            extensions: [".ts", ".js", ".css", ".scss"],
            alias: {
                components: path.join(__dirname, "src", "components"),
                library: path.join(__dirname, "src", "library")
            }
        }
    };

    config.mode = isProduction ? "production" : "development";

    if (isBundle) {
        config.devServer = {
            static: {
                directory: path.join(__dirname, "public")
            },
            compress: true,
            port: 3000,
            open: true
        };

        config.plugins.push(new HtmlWebpackPlugin({ template: "./public/index.html" }));
    } else {
        config.output.library = {
            type: "module"
        };
        config.experiments = {
            outputModule: true
        };
        config.plugins.push(new NpmDtsPlugin({ entry: "./src/index.d.ts", output: "./dist/esm/library.d.ts" }));
    }

    return config;
};
