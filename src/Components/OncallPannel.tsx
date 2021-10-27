import * as React from 'react'
import { useState } from 'react'
import * as dayjs from 'dayjs'
import './OncallPannel.scss'
import * as relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

const OncallPannel: React.FC<{ oncallListJSONString?: string, pipelines: any }> = ({
                                                                                     oncallListJSONString,
                                                                                     pipelines,
                                                                                   }) => {
  const [isEmptyString, setIsEmptyString] = useState(
    oncallListJSONString.length === 0 || !oncallListJSONString
  )
  console.log(pipelines)
  // const [commits, setCommits] = useState(new Map())
  let startDate
  let names
  let index
  let nextIndex
  let commits: any

  if (!isEmptyString) {
    const data = JSON.parse(oncallListJSONString)
    startDate = dayjs(data.startDate)
    names = data.names
    const diffDays = dayjs().diff(startDate, 'day')
    index = Math.floor(diffDays / 7) % names.length
    nextIndex = index + 1 >= names.length ? 0 : index + 1
  }
  if (pipelines.length > 0) {
    const resultMap = new Map()
    pipelines.forEach((pipeline: any) => {
      pipeline?.node?.builds?.edges.filter((item: any) => {
        const startedAt = dayjs(item?.node?.startedAt)
        return dayjs().diff(startedAt, 'day') > 3
      })
        .forEach((item: any) => {
          const authorName = item?.node?.createdBy?.name
          if (!resultMap.has(authorName)) {
            resultMap.set(authorName, 0)
          }
          resultMap.set(authorName, resultMap.get(authorName) + 1)
        })
    })
    commits = resultMap
  }

  const renderCommit = () => {
    console.log(commits)
    if (!commits || commits.size <= 0) {
      return <div>tes</div>
    }
    return Array.from(commits).map((commit: string[]) => {
      // @ts-ignore
      return (<div className={'person__count'}>
        <span>{commit[0]}</span>
        <span>{commit[1]}</span>
      </div>)
    })
  }
  // @ts-ignore
  return (
    <React.Fragment>
      {!isEmptyString && (
        <div className="notice">
          <div className="oncall">
            <div className="oncall__item">
              <span className="oncall__item-title">Primary On-call</span>
              <span className="oncall__item-name">{names[index]}</span>
            </div>
            <div className="oncall__item">
              <span className="oncall__item-title">Secondary On-call</span>
              <span className="oncall__item-name">{names[nextIndex]}</span>
            </div>
          </div>
          <div className={'commit'}>
            {renderCommit()}
          </div>
        </div>
      )}
    </React.Fragment>
  )
}

export default OncallPannel
