import * as React from 'react'
import { extendRelativeTimeForDayjs } from '../../Utils/dayjsUtils'

extendRelativeTimeForDayjs()

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
