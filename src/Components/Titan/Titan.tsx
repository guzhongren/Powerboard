import * as React from 'react'
import './Titan.scss'
import Modal from '../Modal/Modal'
import Auth from '../Auth/Auth'
import { useState } from 'react'
import { IAuth } from '../../Constants/Auth'

const Titan: React.FC<{
  lastUpdate: any
  onConfigChanged?: (auth: IAuth) => void
}> = ({ lastUpdate, onConfigChanged }) => {
  const [settingVisible, setSettingVisible] = useState(false)
  const configChangeHandler = (auth: IAuth) => {
    onConfigChanged(auth)
    setSettingVisible(false)
  }

  return (
    <>
      <div className="titan">
        <div className="titan__action">
          <i
            className="icon setting"
            onClick={() => {
              setSettingVisible(true)
            }}
          />
        </div>
        <div className="titan__info">
          Last updated at {lastUpdate.format('MM-DD HH:mm')}
        </div>
      </div>
      <Modal
        visible={settingVisible}
        onClose={() => {
          setSettingVisible(false)
        }}
      >
        <Auth onConfigChanged={configChangeHandler} />
      </Modal>
    </>
  )
}

export default Titan
