import * as React from 'react'
import { first, tail } from 'lodash'
import * as dayjs from 'dayjs'
import * as relativeTime from 'dayjs/plugin/relativeTime'
import Jobs from '@root/Pipline/Jobs'
import './Pipeline.scss'
import Timer from '@root/Components/Timer'

dayjs.extend(relativeTime)

const BuildHistory: React.FC<{ build: any }> = ({build}) => {
  const info = build?.node || {}
  return (
    <div className={`pipeline__history-build ${info.state}`}>
      #{info.number}
    </div>
  )
}

const Pipeline: React.FC<{ pipeline: any }> = ({pipeline}) => {

  const builds: any[] = pipeline?.node?.builds?.edges || []
  const lastBuild = first(builds)?.node || {}
  const historyBuilds = tail(builds)

  const startAt = dayjs(lastBuild.startedAt)
  const finishAt = dayjs(lastBuild.finishedAt)
  const jobs = lastBuild.jobs?.edges || []

  return (
    <div className="pipeline">
      <div className={`pipeline__current ${lastBuild.state}`}>
        <div className="pipeline__title">
          {pipeline?.node?.name}
        </div>
        <div className="pipeline__commit-info">
          [{lastBuild.branch}] {lastBuild.message}
        </div>

        <Jobs jobs={jobs}/>

        <div className="pipeline__trigger">
          <div>{lastBuild.createdBy?.name}</div>

          {['PASSED', 'FAILED'].includes(lastBuild.state) && (
            <div>
              Finished at {dayjs().from(finishAt)} and ran for {finishAt.diff(startAt, 'minute')} minutes
            </div>
          )}

          {['RUNNING'].includes(lastBuild.state) && <Timer startAt={startAt}/>}

        </div>
        <div className="pipeline__overview">
          <div>#{lastBuild.number}</div>
          <div>{lastBuild.state}</div>
        </div>
      </div>
      <div className="pipeline__history">
        {historyBuilds.map((build) => (
          <BuildHistory build={build} key={build?.node?.id}/>
        ))}
      </div>
    </div>
  )
}

export default Pipeline
