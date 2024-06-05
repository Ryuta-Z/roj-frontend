const { defineConfig } = require("@vue/cli-service");
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: "/roj/",
  chainWebpack(config) {
    config.plugin("monaco").use(
      new MonacoWebpackPlugin({
        languages: ["java", "cpp"],
      })
    );
  },
});
