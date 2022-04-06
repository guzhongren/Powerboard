import { defineConfig } from 'cypress'

export default defineConfig({
  env: {
    local: 'http://localhost:4321/',
    docker: 'http://web',
    prod: 'https://guzhongren.github.io/Powerboard/',
  },
  viewportWidth: 1000,
  viewportHeight: 860,
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.ts')(on, config)
    },
  },
})
