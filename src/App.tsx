import * as React from 'react'
import { useState } from 'react'
import useSWR from 'swr'
import './App.scss'
import { parse } from 'query-string'
import { getValueByKey } from './Utils/LocalStorageUtils'
import { convertToJSON } from './Utils/ConvertUtils'
import { DASHBOARD_AUTH } from './Constants/Auth'

const GridComponent = React.lazy(() => import('./Components/Grid'))
const AuthComponent = React.lazy(() => import('./Components/Auth/Auth'))

const fetcher = (url: string) => fetch(url).then((res) => res.json())
const defaultColumnCount =
  parseInt(getValueByKey(DASHBOARD_AUTH.COLUMN_COUNT)) || 1
function App() {
  const authConfig: any = {
    org: getValueByKey(DASHBOARD_AUTH.ORG),
    team: getValueByKey(DASHBOARD_AUTH.TEAM),
    search: convertToJSON(getValueByKey(DASHBOARD_AUTH.SEARCH)),
    token: getValueByKey(DASHBOARD_AUTH.TOKEN),
    oncall: convertToJSON(getValueByKey(DASHBOARD_AUTH.ONCALL)),
    isOnlyMainBranch:
      getValueByKey(DASHBOARD_AUTH.IS_ONLY_MAIN_BRANCH) === 'true',
    columnCount: defaultColumnCount,
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
    const { org, team, search, oncall, isOnlyMainBranch } = data
    const authConfig = {
      org,
      team,
      search,
      token: parsed.token,
      oncall,
      isOnlyMainBranch,
      columnCount: defaultColumnCount,
    }
    return (
      <React.Suspense fallback={'loading'}>
        <GridComponent authConfig={authConfig} />
      </React.Suspense>
    )
  } else {
    if (auth.org && auth.token) {
      return (
        <React.Suspense fallback={'loading'}>
          <GridComponent authConfig={auth} />
        </React.Suspense>
      )
    } else {
      return (
        <React.Suspense fallback={'loading'}>
          <AuthComponent onConfigChanged={(auth) => setAuth(auth)} />
        </React.Suspense>
      )
    }
  }
}

export default App
