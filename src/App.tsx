import * as React from 'react'
import { useState } from 'react'
import useSWR from 'swr'
import './App.scss'
import { parse } from 'query-string'
import Grid from './Components/Grid'
import { getValueByKey } from './Utils/LocalStorageUtils'
import { DASHBOARD_AUTH, IAuth } from './Constants/Auth'
import Auth from './Components/Auth/Auth'
import { convertToJSON } from './Utils/ConvertUtils'

const fetcher = (url: string) => fetch(url).then((res) => res.json())
function App() {
  const authConfig: any = {
    org: getValueByKey(DASHBOARD_AUTH.ORG),
    team: getValueByKey(DASHBOARD_AUTH.TEAM),
    search: convertToJSON(getValueByKey(DASHBOARD_AUTH.SEARCH)),
    token: getValueByKey(DASHBOARD_AUTH.TOKEN),
    oncall: convertToJSON(getValueByKey(DASHBOARD_AUTH.ONCALL)),
  }

  const [auth, setAuth] = useState(authConfig)

  const parsed = parse(window.location.search) as any

  const { data, error } = useSWR(parsed?.config, fetcher, {
    refreshInterval: 1000 * 60 * 60,
  })

  if (error) {
    console.log('no config in URL')
  }

  if (data && data.org && parsed.token) {
    const { org, team, search, oncall } = data
    const authConfig = {
      org,
      team,
      search,
      token: parsed.token,
      oncall,
    }
    return <Grid authConfig={authConfig} />
  } else {
    if (auth.org && auth.token) {
      return <Grid authConfig={auth} />
    } else {
      return <Auth onConfigChanged={(auth) => setAuth(auth)} />
    }
  }
}

export default App
