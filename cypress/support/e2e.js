// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import "./commands";

// Ignora erro JS da aplicação que impede o Cypress de digitar no campo de e-mail
Cypress.on("uncaught:exception", (err, runnable) => {
  if (err.message.includes("commandToggleMenu is not defined")) {
    return false;
  }
});

Cypress.on("uncaught:exception", (err, runnable) => {
  // Retorna false para prevenir que o Cypress falhe com erros da aplicação
  if (err.message.includes("reading 'animate'")) {
    return false;
  }
});
