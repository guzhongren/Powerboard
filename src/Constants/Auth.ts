export const DASHBOARD_AUTH = {
  ORG: "org",
  TEAM: "team",
  SEARCH: "search",
  TOKEN: "token",
  ONCALL: "oncall"
};

export interface IAuth {
  org?: string;
  team?: string;
  search?: string;
  token?: string;
  oncall?: string;

}
