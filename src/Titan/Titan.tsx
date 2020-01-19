import * as React from 'react'
import './Titan.scss'
import Modal from '@root/Modal/Modal'
import Auth from '@root/Auth/Auth'
import { useState } from 'react'

const Titan: React.FC<{ lastUpdate: any }> = ({lastUpdate}) => {

  const [settingVisible, setSettingVisible] = useState(false)

  return (
    <>
      <div className="titan">
        <div className="titan__action">
          <i className="icon setting" onClick={() => {setSettingVisible(true)}}/>
        </div>
        <div className="titan__info">
          Last update at {lastUpdate.format('MM-DD HH:mm')}
        </div>
      </div>
      <Modal
        visible={settingVisible}
        onClose={() => {
          setSettingVisible(false)
        }}>
        <Auth/>
      </Modal>
    </>
  )
}

export default Titan
