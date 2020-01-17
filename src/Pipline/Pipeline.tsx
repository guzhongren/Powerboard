import * as React from 'react'
import { first } from 'lodash'
import * as dayjs from 'dayjs'
import * as relativeTime from 'dayjs/plugin/relativeTime'
import Jobs from '@root/Pipline/Jobs'
import './Pipeline.scss'

dayjs.extend(relativeTime)

const Pipeline: React.FC<{ pipeline: any }> = ({pipeline}) => {

  const builds: any[] = pipeline?.node?.builds?.edges || []
  const lastBuild = first(builds)?.node || {}

  const startAt = dayjs(lastBuild.startedAt)
  const finishAt = dayjs(lastBuild.finishedAt)
  const jobs = lastBuild.jobs?.edges || []

  return (
    <div className={`pipeline ${lastBuild.state}`}>
      <div className="pipeline__title">
        {pipeline?.node?.name}
      </div>
      <div className="pipeline__commit-info">
        [{lastBuild.branch}] {lastBuild.message}
      </div>

      <Jobs jobs={jobs}/>

      <div className="pipeline__trigger">
        <div>{lastBuild.createdBy?.name}</div>
        <div>
          Finished at {dayjs().from(finishAt)} and ran for {finishAt.diff(startAt, 'minute')} minutes
        </div>
      </div>
      <div className="pipeline__overview">
        <div>#{lastBuild.number}</div>
        <div>{lastBuild.state}</div>
      </div>
    </div>
  )
}

export default Pipeline
