import * as React from "react";
import { useState } from "react";
import "./App.scss";
import Auth from "@root/Auth/Auth";
import Grid from "./Pipline/Grid";
import { getValueByKey } from "./Utils/LocalStorageUtils";
import { DASHBOARD_AUTH, IAuth } from "./Constants/Auth";
import { splitSearch } from "./Utils/StringUtils";
import {updateAuth} from './Utils/ConvertAuth'

function App() {
  const authConfig: any = {
    org: getValueByKey(DASHBOARD_AUTH.ORG),
    team: getValueByKey(DASHBOARD_AUTH.TEAM),
    search: splitSearch(getValueByKey(DASHBOARD_AUTH.SEARCH)),
    token: getValueByKey(DASHBOARD_AUTH.TOKEN),
    oncall: getValueByKey(DASHBOARD_AUTH.ONCALL),
  };
  const [auth, setAuth] = useState(authConfig);

  if (auth.org && auth.token) {
    return <Grid authConfig={auth} />;
  } else {
    return (
      <Auth
        onConfigChanged={(auth) => setAuth(updateAuth(auth))}
      />
    );
  }
}

export default App;
