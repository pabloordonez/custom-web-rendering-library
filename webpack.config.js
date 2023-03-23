// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isProduction = process.env.NODE_ENV == "production";
const stylesHandler = MiniCssExtractPlugin.loader;

const config = {
    entry: "./src/index.ts",
    output: {
        filename: "library.js",
        path: path.resolve(__dirname, "dist/bundle/"),
        globalObject: "this"
    },
    devServer: {
        static: {
            directory: path.join(__dirname, "public")
        },
        compress: true,
        port: 3000,
        open: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html"
        }),
        new MiniCssExtractPlugin()
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

module.exports = () => {
    if (isProduction) {
        config.mode = "production";
    } else {
        config.mode = "development";
    }
    return config;
};
