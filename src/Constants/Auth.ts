export const DASHBOARD_AUTH = {
  ORG: "org",
  TEAM: "team",
  SEARCH: "search",
  TOKEN: "token",
};

export interface IAuth {
  org: string;
  team: string;
  search: string | string[];
  token: string;
}
