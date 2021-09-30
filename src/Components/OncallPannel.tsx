import * as React from 'react'
import {useState} from 'react'
import * as dayjs from 'dayjs'
import {useEffect} from 'react'
import "./OncallPannel.scss";
import * as relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime)

const OncallPannel: React.FC<{ message?: string; }> = ({message}) => {
  const jsonInput = '{"startDate": "2021-09-15", "names":["PengChong","FengWen","YiChen","Lina","ZhongRen","XuDong","Zhang Yu"]}'
  const data = message ? JSON.parse(message) :jsonInput
  const startDate = dayjs(data.startDate)
  const names = data.names
  console.log("names: ", names)
  console.log("this is start Date: ", startDate)
  const diffDays = dayjs().diff(startDate, 'day')
  const index = (Math.floor(diffDays / 7)) % names.length
  const nextIndex = index + 1 >= names.length ? 0 : index + 1
  console.log("index: ", index)
  return (
    <>
      <div className="oncall">
        <div className="oncall_item">
          <span className="oncall_title">
            Primary On-call
          </span>
          <span className="oncall_name">
            {names[index]}
          </span>
        </div>
        <div className="oncall_item">
          <span className="oncall_title">
            Secondary On-call
          </span>
          <span className="oncall_name">
            {names[nextIndex]}
          </span>
        </div>
      </div>
    </>
  )
}

export default OncallPannel;
