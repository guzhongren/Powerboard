import * as React from 'react'
import useSWR from 'swr'
import { buildKiteQuery, fetcher } from '@root/fetcher'
import { parse } from 'query-string'
import { mergePipelinesWithResponse } from '@root/help'
import Pipeline from '@root/Pipline/Pipeline'

const Pipelines: React.FC = () => {

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

  const mergedData = mergePipelinesWithResponse(data)

  const pipelines = mergedData?.organization?.pipelines?.edges || []

  return (
    <div className="container">
      {pipelines.map((pipeline: any) => (
        <Pipeline pipeline={pipeline} key={pipeline.node.name}/>
      ))}
    </div>
  )
}

export default Pipelines
