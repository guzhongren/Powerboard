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

const fs = require('fs')
/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
  const env = process.env.ENV
  if (env === 'production') {
    config.env.url = config.env.prod
  } else if (env === 'docker') {
    config.env.url = config.env.docker
  } else {
    config.env.url = config.env.local
  }

  if (['production', 'docker'].includes(env)) {
    config.video = false
  }

  config.env.BUILDKITE_TOKEN = process.env.BUILDKITE_TOKEN
  console.log(config.env.buildKiteToken)

  generateTestData()

  return config
}

function generateTestData() {
  fs.readFile('cypress/fixtures/mockedImportAuthTemplate.json', (err, data) => {
    if (err) throw err
    let mockedImportAuth = JSON.parse(data)
    mockedImportAuth.token = process.env.BUILDKITE_TOKEN

    fs.writeFile(
      'cypress/fixtures/mockedImportAuth.json',
      JSON.stringify(mockedImportAuth, null, 2),
    )
  })
}
