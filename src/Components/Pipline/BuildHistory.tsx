import * as React from 'react'
import * as dayjs from 'dayjs'
import * as relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

const BuildHistory: React.FC<{ build: any }> = ({ build }) => {
  const info = build?.node || {}
  return (
    <a
      href={info?.url}
      target="_blank"
      className={`pipeline__history-build ${info.state}`}
      title={info?.createdBy?.name}
      rel="noreferrer"
    >
      #{info.number}
    </a>
  )
}

export default BuildHistory
