/// <reference types='cypress' />
import dashboardConfig from '../fixtures/dashboard.json'

describe('show pipeline', () => {
  const pipelinesId = '#pipelines'
  const importId = '#import'
  const inputLabel = 'input'
  const pipelineAreaLabel = 'textarea'
  const goButton = '.btn'
  // const token = Cypress.env('BUILDKITE_TOKEN')
  dashboardConfig.token = Cypress.env('BUILDKITE_TOKEN')
  const orgName = dashboardConfig.orgName
  const pipelinesConfig = dashboardConfig.pipelines

  const DASHBOARD_AUTH = {
    ORG: 'org',
    TEAM: 'team',
    SEARCH: 'search',
    TOKEN: 'token',
    ONCALL: 'oncall',
  }

  const orgNameTitle = 'Organization Name'
  const accessTokenTitle = 'Access Token'
  const pipelineTitle = '.pipeline__title-content'
  const pipelineTitleRepo = '.pipeline__title-repo'

  describe('display pipeline by manuel config', () => {
    beforeEach(() => {
      cy.visit(Cypress.env('url'))
    })

    it('displays buildKite info dialog', () => {
      checkAuthInput()
    })

    it('should can add pipeline, and update pipeline settings', () => {
      cy.contains(accessTokenTitle)
        .parent()
        .find('input[type=text]')
        .type(dashboardConfig.token)

      cy.contains(orgNameTitle).parent().find('input[type=text]').type(orgName)

      cy.get(pipelinesId).type(`${pipelinesConfig[0]}`)
      cy.get('#oncallList').type(`${JSON.stringify(dashboardConfig.oncall)}`, {
        parseSpecialCharSequences: false,
      })

      cy.get(goButton)
        .click()
        .then(() => {
          const newConfig = {
            ...dashboardConfig,
            pipelines: [dashboardConfig.pipelines[0]],
          }
          checkLocalStorageInfo(newConfig)
          checkPipelineTitle(1)
        })
      // should update the pipeline settings

      cy.get('.icon.setting').click()
      cy.contains(accessTokenTitle)
        .parent()
        .find('input[type=text]')
        .should('have.value', dashboardConfig.token)
      cy.contains(orgNameTitle)
        .parent()
        .find('input[type=text]')
        .should('have.value', orgName)

      cy.get(pipelinesId).should('have.value', `${pipelinesConfig[0]}`)

      cy.get(pipelinesId).type(`{enter}${pipelinesConfig[1]}`)

      cy.get(goButton)
        .click()
        .then(() => {
          checkLocalStorageInfo(dashboardConfig)
        })
        .then(() => {
          checkPipelineTitle(2)
          checkPipelineRepo(pipelineTitleRepo)
        })
    })

    it('should import auth config json file into app', () => {
      cy.clearLocalStorage()

      cy.get(importId)
        .attachFile('mockedImportAuth.json')
        .then(() => {
          setTimeout(() => {
            cy.get(pipelinesId).contains(dashboardConfig.pipelines.join('\n'))
            cy.get('#oncallList').contains(dashboardConfig.oncall)
          }, 4000)
        })

      cy.get(goButton)
        .click()
        .then(() => {
          checkLocalStorageInfo(dashboardConfig)
        })
    })
    it('should download the latest auth config when click download button', () => {
      cy.clearLocalStorage()

      cy.get(importId).attachFile('mockedImportAuth.json')

      cy.get('#download')
        .click()
        .then(() => {
          setTimeout(() => {
            cy.readFile('cypress/fixtures/downloads/dashboardConfig.json')
              .should('contain', dashboardConfig.token)
              .should('contain', dashboardConfig.orgName)
              .should('contain', dashboardConfig.pipelines[0])
              .should('contain', dashboardConfig.pipelines[1])
          }, 2000)
        })
      cy.get(goButton).click()
    })

    it('should contain oncall list when click download button', () => {
      cy.clearLocalStorage()

      cy.get(importId).attachFile('mockedImportAuth.json')

      cy.get('#download')
        .click()
        .then(() => {
          setTimeout(() => {
            cy.readFile(
              'cypress/fixtures/downloads/dashboardConfig.json'
            ).should('contain', dashboardConfig.oncall)
          }, 2000)
        })
      cy.get(goButton).click()
    })
  })

  describe('Config in pipeline', async () => {
    it('should show pipeline given config(token & configPath) in url', async() => {
      await cy.visit(
        `${Cypress.env('url')}?token=${dashboardConfig.token}&config=${
          dashboardConfig.configPath
        }`
      )
      checkPipelineTitle(2)
      checkPipelineRepo(pipelineTitleRepo)
    })
  })

  function checkPipelineTitle(countOfPipelines) {
    cy.get(pipelineTitle).should('have.length', countOfPipelines)
    cy.get(pipelineTitle).first().should('have.attr', 'href')
    cy.get(pipelineTitle).first().should('have.attr', 'target', '_blank')
    cy.get(pipelineTitle).first().should('have.text', pipelinesConfig[0])
  }

  function checkPipelineRepo(repoCssSelector) {
    cy.get(repoCssSelector).should('have.length', 2)
    cy.get(repoCssSelector)
      .first()
      .parent()
      .should('have.attr', 'target', '_blank')
  }

  function checkAuthInput() {
    cy.get(inputLabel).should('have.length', 4)

    cy.get(inputLabel).first().should('have.text', '')
    cy.get(inputLabel).last().should('have.text', '')
    cy.get(pipelinesId).should('have.text', '')
    cy.get(pipelinesId).should('have.text', '')

    cy.get(pipelineAreaLabel).should('have.length', 2)
  }

  function checkLocalStorageInfo(dashboardConfig) {
    expect(localStorage.getItem(DASHBOARD_AUTH.ORG)).to.equal(
      dashboardConfig.orgName
    )
    expect(localStorage.getItem(DASHBOARD_AUTH.TEAM)).to.equal(
      dashboardConfig.team
    )
    expect(localStorage.getItem(DASHBOARD_AUTH.SEARCH)).to.equal(
      dashboardConfig.pipelines.join('\n')
    )
    expect(localStorage.getItem(DASHBOARD_AUTH.TOKEN)).to.equal(
      dashboardConfig.token
    )
    expect(localStorage.getItem(DASHBOARD_AUTH.ONCALL)).to.equal(
      JSON.stringify(dashboardConfig.oncall)
    )
  }
})
