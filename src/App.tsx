import * as React from 'react'
import './App.scss'
import { parse } from 'query-string'
import Piplines from '@root/Piplines'
import Auth from '@root/Auth/Auth'

function App() {

  const params = parse(location.search) as {
    orz: string
    team: string
    search: string
    token: string
  }

  if (params.orz && params.team && params.search && params.token) {
     return (
       <Piplines/>
     )
  } else {
    return (
      <Auth />
    )
  }
}

export default App
