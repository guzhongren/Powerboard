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

  const {data, error} = useSWR([
      buildKiteQuery(params.orz, params.team, params.search),
      params.token,
    ],
    fetcher,
    {
      refreshInterval: 20 * 1000,
    }
  )

  if (error) {
    console.log(error?.response.errors)
    return (
      <div className="global-error">
        <pre>
        {JSON.stringify(error?.response.errors, null, 2)}
        </pre>
      </div>
    )
  }

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
