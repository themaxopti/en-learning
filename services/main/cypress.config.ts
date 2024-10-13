import { defineConfig } from "cypress";
import webpackConfig from "./webpack.config";

export default defineConfig({
  component: {
    chromeWebSecurity:false,
    supportFile: './cypress/support/component.tsx',
    devServer: {
      framework: "react",
      bundler: "webpack",
      // optionally pass in webpack config
      //   webpackConfig({})
      // or a function - the result is merged with any
      // webpack.config that is found
      webpackConfig: async () => {
        // ... do things ...
        const modifiedConfig = webpackConfig({ port: 4000 });
        return modifiedConfig;
      },
    },
  },

  e2e: {
    specPattern:'./src/**/*.cy.ts',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
