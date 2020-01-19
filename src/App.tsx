import * as React from 'react'
import './App.scss'
import { parse } from 'query-string'
import Auth from '@root/Auth/Auth'
import Pipelines from '@root/Pipline/Pipelines'

function App() {

  const params = parse(location.search) as {
    orz: string
    team: string
    search: string
    token: string
  }

  if (params.orz && params.token) {
    return (
      <Pipelines/>
    )
  } else {
    return (
      <Auth/>
    )
  }
}

export default App
