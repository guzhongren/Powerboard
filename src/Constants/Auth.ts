export const DASHBOARD_AUTH = {
  ORG: 'org',
  TEAM: 'team',
  SEARCH: 'search',
  TOKEN: 'token',
  ONCALL: 'oncall',
  IS_ONLY_MAIN_BRANCH: 'isOnlyMainBranch',
  COLUMN_COUNT: 'columnCount',
}

export interface IOnCall {
  startDate: string
  names: Array<string>
}

export interface IAuth {
  org?: string
  team?: string
  search?: string[]
  token?: string
  oncall?: IOnCall
  isOnlyMainBranch?: boolean
  columnCount?: number
}
