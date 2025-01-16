const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: process.env.CYPRESS,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
