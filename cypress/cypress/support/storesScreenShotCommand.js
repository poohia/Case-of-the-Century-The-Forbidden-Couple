const SizesLandscape = [
  // Android
  // Landscape
  {
    directory: "android/phone",
    name: "phone_landscape_android",
    width: 2532,
    height: 1170,
  },
  {
    directory: "android/tablet/7Inch",
    name: "tablet_7_inch_landscape_android",
    width: 2266,
    height: 1488,
  },
  {
    directory: "android/tablet/10Inch",
    name: "tablet_10_inch_landscape_android",
    width: 2360,
    height: 1640,
  },
  // iOS
  // Landscape
  {
    directory: "ios/phone/69Inch",
    name: "phone_6_9_inch_landscape_ios",
    width: 2796,
    height: 1290,
  },
  {
    directory: "ios/phone/65Inch",
    name: "phone_6_5_inch_landscape_ios",
    width: 2778,
    height: 1284,
  },
  {
    directory: "ios/phone/55Inch",
    name: "phone_5_5_inch_landscape_ios",
    width: 2208,
    height: 1242,
  },
  {
    directory: "ios/tablet/13Inch",
    name: "tablet_13_inch_landscape_ios",
    width: 2752,
    height: 2064,
  },
  {
    directory: "ios/tablet/129InchIpadPro",
    name: "tablet_12_9_ipad_pro_inch_landscape_ios",
    width: 2732,
    height: 2048,
  },
];

const SizesPortrait = [
  // Android
  // Portrait
  {
    directory: "android/phone",
    name: "phone_portrait_android",
    width: 1242,
    height: 2208,
  },
  {
    directory: "android/tablet/7Inch",
    name: "tablet_7_inch_portrait_android",
    width: 2048,
    height: 2732,
  },
  {
    directory: "android/tablet/10Inch",
    name: "tablet_10_inch_portrait_android",
    width: 2048,
    height: 2732,
  },
  // iOS
  // Portrait
  {
    directory: "ios/phone/69Inch",
    name: "phone_6_9_inch_portrait_ios",
    width: 1290,
    height: 2796,
  },
  {
    directory: "ios/phone/65Inch",
    name: "phone_6_5_inch_portrait_ios",
    width: 1284,
    height: 2778,
  },
  {
    directory: "ios/phone/55Inch",
    name: "phone_5_5_inch_portrait_ios",
    width: 1242,
    height: 2208,
  },
  {
    directory: "ios/tablet/13Inch",
    name: "tablet_13_inch_portrait_ios",
    width: 2064,
    height: 2752,
  },
  {
    directory: "ios/tablet/129InchIpadPro",
    name: "tablet_12_9_ipad_pro_inch_portrait_ios",
    width: 2048,
    height: 2732,
  },
];

const SizesSteams = [
  {
    directory: "steam/1080x1920",
    name: "1080x1920px",
    width: 1920,
    height: 1080,
  },
];

const SizesItchio = [
  {
    directory: "itchio/1080x1920",
    name: "1080x1920px",
    width: 1920,
    height: 1080,
  },
];

const DPR = 3; // Définissez le Device Pixel Ratio ici pour le réutiliser

Cypress.Commands.add("storesScreenShotLandscape", (namespace = "default") => {
  const originalWidth = Cypress.config("viewportWidth");
  const originalHeight = Cypress.config("viewportHeight");

  SizesLandscape.forEach((size) => {
    // Calculez les dimensions CSS pour le viewport
    const cssWidth = size.width / DPR;
    const cssHeight = size.height / DPR;

    cy.viewport(cssWidth, cssHeight, {
      deviceScaleFactor: DPR, // Utilisez la constante DPR
      isMobile: true,
    });
    cy.wrap(
      Cypress.automation("remote:debugger:protocol", {
        command: "Emulation.setDeviceMetricsOverride",
        params: {
          // target DPR here
          deviceScaleFactor: DPR,
          // width and height set to 0 remove overrides
          width: 0,
          height: 0,
          mobile: true,
        },
      })
    );
    cy.wait(700); // Donnez du temps pour le re-rendu
    cy.screenshot(`${namespace}/${size.directory}/${size.name}`);
  });
  cy.viewport(originalWidth, originalHeight); // Rétablissez le viewport original
});

Cypress.Commands.add("storesScreenShotPortrait", (namespace = "default") => {
  const width = Cypress.config("viewportWidth");
  const height = Cypress.config("viewportHeight");

  SizesPortrait.forEach((size) => {
    // Calculez les dimensions CSS pour le viewport
    const cssWidth = size.width / DPR;
    const cssHeight = size.height / DPR;

    cy.viewport(cssWidth, cssHeight, {
      deviceScaleFactor: DPR,
      isMobile: true,
    });
    cy.wrap(
      Cypress.automation("remote:debugger:protocol", {
        command: "Emulation.setDeviceMetricsOverride",
        params: {
          deviceScaleFactor: DPR,
          width: 0,
          height: 0,
          mobile: true,
        },
      })
    );
    cy.wait(700);
    cy.screenshot(`${namespace}/${size.directory}/${size.name}`);
  });
  cy.viewport(width, height);
});

Cypress.Commands.add("storesScreenShotSteam", (namespace = "default") => {
  const width = Cypress.config("viewportWidth");
  const height = Cypress.config("viewportHeight");

  SizesSteams.forEach((size) => {
    // Calculez les dimensions CSS pour le viewport
    const cssWidth = size.width / 1;
    const cssHeight = size.height / 1;

    cy.viewport(cssWidth, cssHeight, {
      deviceScaleFactor: 1,
      isMobile: true,
    });
    cy.wrap(
      Cypress.automation("remote:debugger:protocol", {
        command: "Emulation.setDeviceMetricsOverride",
        params: {
          deviceScaleFactor: 1,
          width: 0,
          height: 0,
          mobile: true,
        },
      })
    );
    cy.wait(700);
    cy.screenshot(`${namespace}/${size.directory}/${size.name}`);
  });
  cy.viewport(width, height);
});

Cypress.Commands.add("storesScreenShotItchio", (namespace = "default") => {
  const width = Cypress.config("viewportWidth");
  const height = Cypress.config("viewportHeight");

  SizesItchio.forEach((size) => {
    // Calculez les dimensions CSS pour le viewport
    const cssWidth = size.width / 1;
    const cssHeight = size.height / 1;

    cy.viewport(cssWidth, cssHeight, {
      deviceScaleFactor: 1,
      isMobile: true,
    });
    cy.wrap(
      Cypress.automation("remote:debugger:protocol", {
        command: "Emulation.setDeviceMetricsOverride",
        params: {
          deviceScaleFactor: 1,
          width: 0,
          height: 0,
          mobile: true,
        },
      })
    );
    cy.wait(700);
    cy.screenshot(`${namespace}/${size.directory}/${size.name}`);
  });
  cy.viewport(width, height);
});
