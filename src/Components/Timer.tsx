import * as React from 'react'
import { useState, useEffect } from 'react'
import * as dayjs from 'dayjs'

const Timer: React.FC<{ startAt: any }> = ({ startAt }) => {
  const [now, setNow] = useState(dayjs())

  useEffect(() => {
    let time: any
    const setTime = () => {
      setNow(dayjs())
      time = setTimeout(setTime, 1000)
    }
    setTime()
    return () => {
      clearTimeout(time)
    }
  }, [])

  const min = now.diff(startAt, 'm')
  const s = now.diff(startAt, 's') - min * 60

  return (
    <div>
      Running {min > 0 && `${min} minutest`} {s} s
    </div>
  )
}

export default Timer
