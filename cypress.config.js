const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://app.gerencieaqui.com.br",
    video: true,
    videosFolder: "cypress/videos",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
