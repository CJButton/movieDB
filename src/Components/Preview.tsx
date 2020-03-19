import React, { useState } from 'react'
import { Button, Modal, ModalBody, ModalFooter  } from 'reactstrap'
import classnames from 'classnames'
import ReactPlayer from 'react-player'

type Preview = {
  previewID: string;
}

const Preview = ({previewID}: Preview) => {
  const [isOpen, setOpen] = useState(false)

  const displayIcon = !isOpen ? 'fa-play' : 'fa-times'
  const displayText = () => {
    switch(true) {
      case isOpen:
        return 'Close'
      case (!previewID):
        return 'Trailer Unavailable'
      default:
        return 'Play Trailer'
    }
  }

  return(
    <>
      <Button 
        className={classnames('preview-button', { disabled: !previewID })}
        onClick={() => setOpen(!isOpen)}>
          <div className='preview-elements-wrapper'>
            <i className={`preview-elements_icon fa ${displayIcon}`}></i>
            <div className='preview-elements_text'>{ displayText() }</div>
          </div>
      </Button>

      <Modal 
        isOpen={isOpen} 
        toggle={() => setOpen(!isOpen)}
        className={classnames('modal-preview')}
      >
        <ModalBody>
          <ReactPlayer 
            url={`https://www.youtube.com/watch?v=${previewID}`} 
            controls
            // playing 
          />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => setOpen(false)}>Close</Button>
        </ModalFooter>
      </Modal>
      </>
  )
}

export default Preview