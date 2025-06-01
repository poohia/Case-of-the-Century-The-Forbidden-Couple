const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    defaultCommandTimeout: 600000,
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on("before:browser:launch", (browser = {}, launchOptions) => {
        // Sur Chromium (Chrome, Edge, etc.)
        if (browser.family === "chromium") {
          launchOptions.args.push("--mute-audio");
        }
        // Sur Firefox : on peut aussi, mais moins garanti
        if (browser.name === "firefox") {
          launchOptions.args.push("-headless"); // headless mute souvent
        }
        return launchOptions;
      });
    },
  },
});
