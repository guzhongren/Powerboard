/// <reference types='cypress' />
import dashboardConfig from '../fixtures/dashboard.json'

describe('show pipeline', () => {

  const inputLabel = 'input'
  const pipelineAreaLabel = 'textarea'
  const token = dashboardConfig.token
  const orgName = dashboardConfig.orgName
  const pipelines = dashboardConfig.pipelines


  beforeEach(() => {
    cy.visit(Cypress.env('url'))
  })


  it('displays buildKite info dialog', () => {
    cy.get(inputLabel).should('have.length', 3)

    cy.get(inputLabel).first().should('have.text', '')
    cy.get(inputLabel).last().should('have.text', '')

    cy.get(pipelineAreaLabel).should('have.length', 1)
  })

  const orgNameTitle = 'Organization Name'
  const accessTokenTitle = 'Access Token'
  const pipelineTitle = '.pipeline__title-content'
  it('should can add pipeline, and update pipeline settings', () => {
    // We'll store our item text in a variable so we can reuse it


    cy.contains(accessTokenTitle)
      .parent()
      .find('input[type=text]')
      .type(token)

    cy.contains(orgNameTitle)
      .parent()
      .find('input[type=text]')
      .type(orgName)

    cy.get('textarea')
      .type(`${pipelines[0]}{enter}`)

    cy.get('.btn').click()

    cy.get(pipelineTitle)
      .first()
      .should('have.text', pipelines[0])


    // should update the pipeline settings

    cy.get('.icon.setting').click()
    cy.contains(accessTokenTitle)
      .parent()
      .find('input[type=text]').should('have.value', token)
    cy.contains(orgNameTitle)
      .parent()
      .find('input[type=text]').should('have.value', orgName)

    cy.get('textarea')
      .should('have.value', `${pipelines[0]}`)

    cy.get('textarea')
      .type(`{enter}${pipelines[1]}{enter}`)

    cy.get('.btn').click()

    cy.get(pipelineTitle)
      .should('have.length', 2)
  })
})
