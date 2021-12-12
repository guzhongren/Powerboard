import * as React from "react";
import useSWR from "swr";
import "./App.scss";
import { parse } from "query-string";
import Grid from "./Pipline/Grid";
import { getValueByKey } from "./Utils/LocalStorageUtils";
import { DASHBOARD_AUTH, IAuth } from "./Constants/Auth";
import { splitSearch } from "./Utils/StringUtils";

const fetcher = (url: string) => fetch(url).then((res) => res.json());
function App() {
  let authConfig: any = {
    org: getValueByKey(DASHBOARD_AUTH.ORG),
    team: getValueByKey(DASHBOARD_AUTH.TEAM),
    search: splitSearch(getValueByKey(DASHBOARD_AUTH.SEARCH)),
    token: getValueByKey(DASHBOARD_AUTH.TOKEN),
    oncall: getValueByKey(DASHBOARD_AUTH.ONCALL),
  };

  const parsed = parse(window.location.search) as any;

  const { data, error } = useSWR(parsed?.config, fetcher);

  if (error) {
    console.log("no config in URL");
  }

  if (data) {
    const {org, team, search, oncall} = data
    const authConfig = {
      org,
      team,
      search,
      token: parsed.token,
      oncall,
    };
    if (data.org && parsed.token) {
      return <Grid authConfig={authConfig} />;
    } else {
      return <div>Error config schema</div>
    }
  } else {
      return <div>Wait for config</div>
  }

  // const [auth, setAuth] = useState(authConfig);

  // if (auth.org && auth.token) {
  //   return <Grid authConfig={auth} />;
  // } else {
  //   return <Auth onConfigChanged={(auth) => setAuth(updateAuth(auth))} />;
  // }
}

export default App;
