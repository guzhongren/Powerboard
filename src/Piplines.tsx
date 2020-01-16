import * as React from 'react'
import useSWR from 'swr'
import { buildKiteQuery, fetcher } from '@root/fetcher'
import Pipline from '@root/Pipline'
import { parse } from 'query-string'

const Piplines: React.FC = () => {

  const params = parse(location.search) as {
    orz: string
    team: string
    search: string
    token: string
  }

  const {data} = useSWR([
      buildKiteQuery(params.orz, params.team, params.search),
      params.token,
    ],
    fetcher,
    {
      refreshInterval: 20 * 1000,
    }
  )

  const piplines = data?.organization?.pipelines?.edges || []

  return (
    <div className="container">
      {piplines.map((pipline: any) => (
        <Pipline pipline={pipline} key={pipline.node.name}/>
      ))}
    </div>
  )
}

export default Piplines
