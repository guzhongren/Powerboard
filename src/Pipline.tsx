import * as React from 'react'
import { first } from 'lodash'
import * as dayjs from 'dayjs'
import * as relativeTime from 'dayjs/plugin/relativeTime'
import Jobs from '@root/Jobs'

dayjs.extend(relativeTime)

const Pipline: React.FC<{ pipline: any }> = ({pipline}) => {

  const builds: any[] = pipline?.node?.builds?.edges || []
  const lastBuild = first(builds)?.node || {}

  const startAt = dayjs(lastBuild.startedAt)
  const finishAt = dayjs(lastBuild.finishedAt)
  const jobs = lastBuild.jobs?.edges || []

  return (
    <div className={`pipline ${lastBuild.state}`}>
      <div className="pipline__title">
        {pipline?.node?.name}
      </div>
      <div className="pipline__commit-info">
        [{lastBuild.branch}] {lastBuild.message}
      </div>

      <Jobs jobs={jobs}/>

      <div className="pipline__trigger">
        <div>{lastBuild.createdBy?.name}</div>
        <div>
          Finished at {dayjs().from(finishAt)} and ran for {finishAt.diff(startAt, 'minute')} minutes
        </div>
      </div>
      <div className="pipline__overview">
        <div>#{lastBuild.number}</div>
        <div>{lastBuild.state}</div>
      </div>
    </div>
  )
}

export default Pipline
