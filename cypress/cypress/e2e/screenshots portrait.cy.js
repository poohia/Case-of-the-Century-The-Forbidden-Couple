describe("ScreenShots portrait", () => {
  it("waits for multiple manual triggers then takes screenshots", () => {
    cy.visit("http://localhost:3333");

    // 1) Expose la fonction takeShot(name)
    cy.window().then((win) => {
      win.__takeShot = false;
      win.takeShot = () => {
        console.log("⚡ takeShot() called with");
        win.__takeShot = true;
      };
    });

    // 2) Pause pour pouvoir appeler takeShot('foo') plusieurs fois
    // cy.pause();

    // 3) Boucle infinie qui scrute le flag et capture à chaque fois
    const waitAndCapture = () => {
      // on crée une promesse qui ne résout que quand __takeShot passe à true
      return cy
        .window()
        .then((win) => {
          return new Cypress.Promise((resolve) => {
            const check = () => {
              if (win.__takeShot) {
                win.__takeShot = false; // reset
                resolve(String(new Date().getTime())); // on passe le nom
              } else {
                setTimeout(check, 200);
              }
            };
            check();
          });
        })
        .then((namespace) => {
          // on fait la capture avec le nom récupéré
          cy.storesScreenShotPortrait(namespace);
        })
        .then(() => {
          // relance la boucle pour attendre une nouvelle invocation
          return waitAndCapture();
        });
    };

    // 4) Lance la boucle (ne sortira jamais à moins d'un timeout Cypress)
    waitAndCapture();
  });
});
