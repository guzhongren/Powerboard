import * as React from 'react'
import useSWR from 'swr'
import { buildKiteQuery, fetcher } from '@root/fetcher'
import { parse } from 'query-string'
import { mergePipelinesWithResponse } from '@root/help'
import Pipeline from '@root/Pipline/Pipeline'
import Titan from '@root/Titan/Titan'
import { useState } from 'react'
import * as dayjs from 'dayjs'
import Auth from '@root/Auth/Auth'

const Pipelines: React.FC = () => {

  const [lastUpdateTime, setLastUpdateTime] = useState(dayjs())

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
      onSuccess: () => {
        setLastUpdateTime(dayjs())
      },
    }
  )

  if (error) {
    console.log(error?.response.errors)
    return (
      <>
        <div className="global-error">
        <pre>
        {JSON.stringify(error?.response.errors, null, 2)}
        </pre>
        </div>
        <Auth message="API ERROR, Please check your config"/>
      </>
    )
  }

  const mergedData = mergePipelinesWithResponse(data)

  const pipelines = mergedData?.organization?.pipelines?.edges || []

  return (
    <>
      <Titan lastUpdate={lastUpdateTime}/>
      {pipelines.length === 0 && data && (
        <Auth message="No pipelines found, Please check your config"/>
      )}
      <div className="container">
        {pipelines.map((pipeline: any) => (
          <Pipeline pipeline={pipeline} key={pipeline.node.name}/>
        ))}
      </div>
    </>
  )
}

export default Pipelines
