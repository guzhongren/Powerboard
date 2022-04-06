/// <reference types='cypress' />
import dashboardConfig from '../fixtures/dashboard.json'
import { convertToString } from '../../src/Utils/ConvertUtils'
import {
  ID_PIPELINES,
  ID_IMPORT,
  CLASS_BUTTON_GO,
  TITLE_ORG_NAME,
  TITLE_ACCESS_TOKEN,
  TITLE_PIPELINE_REPO,
  ID_ONCALL_LIST,
} from '../fixtures/fixtures'

import {
  checkPipelineTitle,
  checkPipelineRepo,
  checkAuthInput,
  checkLocalStorageInfo,
  checkAuthInfo,
} from '../page/check'

describe('show pipeline', () => {
  dashboardConfig.token = Cypress.env('BUILDKITE_TOKEN')
  const orgName = dashboardConfig.orgName
  const pipelinesConfig = dashboardConfig.pipelines

  describe('display pipeline by manuel config', () => {
    beforeEach(() => {
      cy.visit(Cypress.env('url'))
    })

    it('displays buildKite info dialog', () => {
      checkAuthInput()
    })

    it('should can add pipeline, and update pipeline settings', () => {
      cy.contains(TITLE_ACCESS_TOKEN)
        .parent()
        .find('input[type=password]')
        .type(dashboardConfig.token)

      cy.contains(TITLE_ORG_NAME)
        .parent()
        .find('input[type=text]')
        .type(orgName)

      cy.get(ID_PIPELINES).type(pipelinesConfig[0])
      cy.get(ID_ONCALL_LIST).type(convertToString(dashboardConfig.oncall))

      const newConfig = {
        ...dashboardConfig,
        isOnlyMainBranch: false,
        pipelines: [dashboardConfig.pipelines[0]],
      }
      cy.get(CLASS_BUTTON_GO)
        .click()
        .then(() => {
          checkLocalStorageInfo(newConfig)
          checkPipelineTitle(1, pipelinesConfig[0])
        })
      // should update the pipeline settings

      cy.get('.icon.setting').click()
      checkAuthInfo(newConfig)

      cy.get(ID_PIPELINES).type(`{enter}${pipelinesConfig[1]}`)
      cy.get(CLASS_BUTTON_GO)
        .click()
        .then(() => {
          checkLocalStorageInfo({
            ...newConfig,
            pipelines: dashboardConfig.pipelines,
          })
        })
        .then(() => {
          checkPipelineTitle(2, pipelinesConfig[0])
          checkPipelineRepo(TITLE_PIPELINE_REPO)
        })
    })

    it('should import auth config json file into app', () => {
      cy.clearLocalStorage().then(() => {
        cy.get(ID_IMPORT)
          .attachFile('mockedImportAuth.json')
          .then(() => {
            checkAuthInfo(dashboardConfig)

            cy.get(CLASS_BUTTON_GO)
              .click()
              .then(() => {
                checkLocalStorageInfo({
                  ...dashboardConfig,
                  isOnlyMainBranch: true,
                })
              })
              .then(() => {
                cy.get('.icon.setting').click()
                cy.get('input[type="checkbox"]').click()
                cy.get(CLASS_BUTTON_GO)
                  .click()
                  .then(() => {
                    checkLocalStorageInfo({
                      ...dashboardConfig,
                      isOnlyMainBranch: false,
                    })
                  })
              })
          })
      })
    })

    it('should show master branch pipeline when click just only show main/master branch checkbox', () => {
      cy.contains(TITLE_ACCESS_TOKEN)
        .parent()
        .find('input[type=password]')
        .type(dashboardConfig.token)

      cy.contains(TITLE_ORG_NAME)
        .parent()
        .find('input[type=text]')
        .type(orgName)

      cy.get(ID_PIPELINES).type(pipelinesConfig.join('\n'))
      cy.get(ID_ONCALL_LIST).type(convertToString(dashboardConfig.oncall))
      cy.get('input[type="checkbox"]').check()

      const newConfig = {
        ...dashboardConfig,
        pipelines: dashboardConfig.pipelines,
        isOnlyMainBranch: true,
      }
      cy.get(CLASS_BUTTON_GO)
        .click()
        .then(() => {
          checkLocalStorageInfo(newConfig)
          checkPipelineTitle(2, pipelinesConfig[0])
        })
    })
    it('should download the latest auth config when click download button', () => {
      cy.clearLocalStorage().then(() => {
        cy.get(ID_IMPORT).attachFile('mockedImportAuth.json')

        cy.get('#download')
          .click()
          .then(() => {
            cy.readFile('cypress/downloads/dashboardConfig.json').then(
              (content) => {
                cy.wrap(content).then((json) => {
                  console.log(json)
                  expect(json.org).to.equal(dashboardConfig.orgName)
                  expect(json.token).to.equal(dashboardConfig.token)
                  expect(json.search).to.contain(dashboardConfig.pipelines[0])
                  expect(json.search).to.contain(dashboardConfig.pipelines[1])
                })
              },
            )
          })
        cy.get(CLASS_BUTTON_GO).click()
      })
    })

    it('should contain oncall list when click download button', () => {
      cy.clearLocalStorage().then(() => {
        cy.get(ID_IMPORT).attachFile('mockedImportAuth.json')

        cy.get('#download')
          .click()
          .then(() => {
            cy.readFile('cypress/downloads/dashboardConfig.json').then(
              (content) => {
                cy.wrap(content).then((json) => {
                  expect(json.org).to.equal(dashboardConfig.orgName)
                  expect(json.token).to.equal(dashboardConfig.token)
                  expect(json.search).to.contain(dashboardConfig.pipelines[0])
                  expect(json.search).to.contain(dashboardConfig.pipelines[1])
                  expect(json.oncall.toString()).to.equal(
                    dashboardConfig.oncall.toString(),
                  )
                })
              },
            )
          })
        cy.get(CLASS_BUTTON_GO).click()
      })
    })
  })

  describe('Config in pipeline', () => {
    it('should show pipeline given config(token & configPath) in url', () => {
      cy.visit(
        `${Cypress.env('url')}?token=${dashboardConfig.token}&config=${
          dashboardConfig.configPath
        }`,
      )
      checkPipelineTitle(2, pipelinesConfig[0])
      checkPipelineRepo(TITLE_PIPELINE_REPO)
    })
  })
})
