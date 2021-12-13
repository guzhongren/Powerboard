/// <reference types="cypress" />

// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
  const env = process.env.ENV;
  console.log(env);
  if (env === "production") {
    config.env.url = config.env.prod;
  } else if (env === "docker") {
    config.env.url = config.env.docker;
  } else {
    config.env.url = config.env.local;
  }
  return config;
};
