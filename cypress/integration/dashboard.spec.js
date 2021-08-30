/// <reference types='cypress' />

// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

describe('show pipeline', () => {
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit('http://localhost:4321/');
  });
  const inputLabel = 'input';
  const pipelineAreaLabel = 'textarea';

  it('displays buildKite info dialog', () => {
    cy.get(inputLabel).should('have.length', 3);

    cy.get(inputLabel).first().should('have.text', '');
    cy.get(inputLabel).last().should('have.text', '');

    cy.get(pipelineAreaLabel).should('have.length', 1);
  });

  it('should can add pipeline, and update pipeline settings', () => {
    // We'll store our item text in a variable so we can reuse it
    const token = '1d03bce0997fa7376600db8819a5b64a612afe61';
    const orgName = 'elastic';
    const pipelines = ['apm-onweek-alerts-as-code', 'kibana / on merge'];

    cy.contains('Access Token')
      .parent()
      .find('input[type=text]')
      .type(token);

    cy.contains('Organization Name')
      .parent()
      .find('input[type=text]')
      .type(orgName);

    cy.get('textarea')
      .type(`${pipelines[0]}{enter}`);

    cy.get('.btn').click();

    cy.get('.pipeline__title-content')
      .first()
      .should('have.text', pipelines[0]);


    // should update the pipeline settings

    cy.get('.icon.setting').click()
    cy.contains('Access Token')
      .parent()
      .find('input[type=text]').should('have.value', token)
    cy.contains('Organization Name')
      .parent()
      .find('input[type=text]').should('have.value', orgName)

    cy.get('textarea')
      .should('have.value', `${pipelines[0]}`);

    cy.get('textarea')
      .type(`{enter}${pipelines[1]}{enter}`);

    cy.get('.btn').click();

    cy.get('.pipeline__title-content')
      .should('have.length', 2)
  });
});
