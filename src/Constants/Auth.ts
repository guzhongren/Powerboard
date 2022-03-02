export const DASHBOARD_AUTH = {
  ORG: 'org',
  TEAM: 'team',
  SEARCH: 'search',
  TOKEN: 'token',
  ONCALL: 'oncall',
  IS_ONLY_MAIN_BRANCH: 'isOnlyMainBranch',
}

export interface IAuth {
  org?: string
  team?: string
  search?: string[]
  token?: string
  oncall?: any
  isOnlyMainBranch?: boolean
}
