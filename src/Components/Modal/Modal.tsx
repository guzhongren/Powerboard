import * as React from 'react'
import * as ReactDOM from 'react-dom'
import './Modal.scss'

const Modal: React.FC<{
  visible: boolean
  onClose: (event?: any) => any
}> = (props) => {
  return props.visible
    ? ReactDOM.createPortal(
        <div className="modal">
          <div
            className="modal__wrapper"
            onClick={() => {
              props.onClose()
            }}
          />
          <div className="modal__content">{props.children}</div>
        </div>,
        document.body,
      )
    : null
}

export default Modal
