import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

export const extendRelativeTimeForDayjs = () => {
  dayjs.extend(relativeTime)
}
