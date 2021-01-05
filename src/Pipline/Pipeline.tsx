import * as React from 'react'
import { first, tail } from 'lodash'
import * as dayjs from 'dayjs'
import * as relativeTime from 'dayjs/plugin/relativeTime'
import Jobs from '@root/Pipline/Jobs'
import './Pipeline.scss'
import Timer from '@root/Components/Timer'

dayjs.extend(relativeTime)

const BuildHistory: React.FC<{ build: any }> = ({ build }) => {
  const info = build?.node || {}
  return (
    <div className={`pipeline__history-build ${info.state}`}>
      #{info.number}
    </div>
  )
}

const Pipeline: React.FC<{ pipeline: any, style?: React.CSSProperties }> = ({ pipeline, style }) => {

  const builds: any[] = pipeline?.node?.builds?.edges || []
  const lastBuild = first(builds)?.node || {}
  const historyBuilds = tail(builds)

  const startAt = dayjs(lastBuild.startedAt)
  const finishAt = dayjs(lastBuild.finishedAt)
  const jobs = lastBuild.jobs?.edges || []

  const openHandler = () => {
    window.open(lastBuild.url)
  }

  return (
    <div className="pipeline" style={style}>
      <div className={`pipeline__current ${lastBuild.state}`} onClick={openHandler}>
        <div className="pipeline__title">
          <a target="_blank"
           href={lastBuild?.url}>
             {pipeline?.node?.name}</a>
        </div>
        <div className="pipeline__commit-info">
          [{startAt.format('MM-DD HH:mm')}] [{lastBuild.branch}] {lastBuild.message}
        </div>

        <Jobs jobs={jobs} />

        <div className="pipeline__trigger">
          <div>{lastBuild.createdBy?.name}</div>

          {['PASSED', 'FAILED'].includes(lastBuild.state) && (
            <div>
              Finished at <i>{dayjs().from(finishAt)}</i> and ran for <i>{finishAt.diff(startAt, 'minute')}</i> minutes
            </div>
          )}
          {
            ['BLOCKED'].includes(lastBuild.state) && (
              <div>
                Trigger at <i>{dayjs().from(startAt)}</i>
              </div>
            )
          }

          {['RUNNING'].includes(lastBuild.state) && <Timer startAt={startAt} />}

        </div>
        <div className="pipeline__overview">
          <div>#{lastBuild.number}</div>
          <div>{lastBuild.state}</div>
        </div>
      </div>
      <div className="pipeline__history">
        {historyBuilds.map((build) => (
          <BuildHistory build={build} key={build?.node?.id} />
        ))}
      </div>
    </div>
  )
}

export default Pipeline
