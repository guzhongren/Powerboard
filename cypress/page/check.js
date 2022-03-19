import {
  ID_PIPELINES,
  LABEL_INPUT,
  LABEL_PIPELINE_AREA,
  TITLE_ORG_NAME,
  TITLE_ACCESS_TOKEN,
  TITLE_PIPELINE,
  ID_ONCALL_LIST,
} from '../fixtures/fixtures'

import { convertToString } from '../../src/Utils/ConvertUtils.ts'

const DASHBOARD_AUTH = {
  ORG: 'org',
  TEAM: 'team',
  SEARCH: 'search',
  TOKEN: 'token',
  ONCALL: 'oncall',
  IS_ONLY_MAIN_BRANCH: 'isOnlyMainBranch',
}

export function checkPipelineTitle(countOfPipelines, firstPipelineName) {
  cy.get(TITLE_PIPELINE).should('have.length', countOfPipelines)
  cy.get(TITLE_PIPELINE).first().should('have.attr', 'href')
  cy.get(TITLE_PIPELINE).first().should('have.attr', 'target', '_blank')
  cy.get(TITLE_PIPELINE).first().should('have.text', firstPipelineName)
}

export function checkPipelineRepo(repoCssSelector) {
  cy.get(repoCssSelector).should('have.length', 2)
  cy.get(repoCssSelector)
    .first()
    .parent()
    .should('have.attr', 'target', '_blank')
}

export function checkAuthInput() {
  cy.get(LABEL_INPUT).should('have.length', 5)

  cy.get(LABEL_INPUT).first().should('have.text', '')
  cy.get(LABEL_INPUT).last().should('have.text', '')
  cy.get(ID_PIPELINES).should('have.text', '')
  cy.get('input[type="checkbox"]').should('not.be.checked')

  cy.get(LABEL_PIPELINE_AREA).should('have.length', 2)
}

export function checkLocalStorageInfo(dashboardConfig) {
  expect(dashboardConfig.orgName).to.equal(
    localStorage.getItem(DASHBOARD_AUTH.ORG),
  )
  expect(dashboardConfig.team).to.equal(
    localStorage.getItem(DASHBOARD_AUTH.TEAM),
  )
  expect(convertToString(dashboardConfig.pipelines)).to.equal(
    localStorage.getItem(DASHBOARD_AUTH.SEARCH),
  )
  expect(dashboardConfig.token).to.equal(
    localStorage.getItem(DASHBOARD_AUTH.TOKEN),
  )
  expect(convertToString(dashboardConfig.oncall)).to.equal(
    localStorage.getItem(DASHBOARD_AUTH.ONCALL),
  )
  expect(`${dashboardConfig.isOnlyMainBranch}`).to.equal(
    localStorage.getItem(DASHBOARD_AUTH.IS_ONLY_MAIN_BRANCH),
  )
}

export function checkAuthInfo(dashboardConfig) {
  cy.contains(TITLE_ACCESS_TOKEN)
    .parent()
    .find('input[type=password]')
    .should('have.value', dashboardConfig.token)
  cy.contains(TITLE_ORG_NAME)
    .parent()
    .find('input[type=text]')
    .should('have.value', dashboardConfig.orgName)
  cy.get(ID_PIPELINES).should(
    'have.value',
    dashboardConfig.pipelines.join('\n'),
  )
  cy.get(ID_ONCALL_LIST).should(
    'have.value',
    convertToString(dashboardConfig.oncall),
  )
  cy.get('input[type="checkbox"]').should(
    `${dashboardConfig.isOnlyMainBranch ? '' : 'not.'}be.checked`,
  )
}
