import * as React from "react";
import { useState } from "react";
import "./App.scss";
import { parse } from "query-string";
import Auth from "@root/Auth/Auth";
import Grid from "./Pipline/Grid";
import { getValueByKey } from "./Utils/LocalStorageUtils";
import { DASHBOARD_AUTH, IAuth } from "./Constants/Auth";
import { splitSearch } from "./Utils/StringUtils";

function App() {
  const authConfig: IAuth = {
    org: getValueByKey(DASHBOARD_AUTH.ORG),
    team: getValueByKey(DASHBOARD_AUTH.TEAM),
    search: splitSearch(getValueByKey(DASHBOARD_AUTH.SEARCH)),
    token: getValueByKey(DASHBOARD_AUTH.TOKEN),
  };
  const [auth, setAuth] = useState(authConfig);

  console.log("app: ", auth);

  if (auth.org && auth.token) {
    return <Grid authConfig={auth} />;
  } else {
    return (
      <Auth
        onConfigChanged={(auth) => {
          console.log("onConfigChanged:", auth);
          setAuth(auth);
        }}
      />
    );
  }
}

export default App;
