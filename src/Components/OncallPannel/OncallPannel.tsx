import * as React from 'react'
import { useState } from 'react'
import * as dayjs from 'dayjs'
import './OncallPannel.scss'
import * as relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

const OncallPannel: React.FC<{ oncallListJSON?: any }> = ({
  oncallListJSON,
}) => {
  const [isEmpty] = useState(
    !oncallListJSON || oncallListJSON.names.length === 0,
  )
  let startDate
  let names
  let index
  let nextIndex

  if (!isEmpty) {
    startDate = dayjs(oncallListJSON.startDate)
    names = oncallListJSON.names
    const diffDays = dayjs().diff(startDate, 'day')
    index = Math.floor(diffDays / 7) % names.length
    nextIndex = index + 1 >= names.length ? 0 : index + 1
  }

  return (
    <React.Fragment>
      {!isEmpty && (
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
        </div>
      )}
    </React.Fragment>
  )
}

export default OncallPannel
