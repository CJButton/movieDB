import React, { useState } from 'react'
import { Button } from 'reactstrap'
import classnames from 'classnames'
import ReactPlayer from 'react-player'

type Preview = {
  previewID: string;
}

const Preview = ({previewID}: Preview) => {
  const [isPlayerOpen, updatePlayer] = useState(false)

  const displayIcon = !isPlayerOpen ? 'fa-play' : 'fa-times'
  const displayText = () => {
    switch(true) {
      case isPlayerOpen:
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
        onClick={() => updatePlayer(!isPlayerOpen)}>
          <div className='preview-elements-wrapper'>
            <i className={`preview-elements_icon fa ${displayIcon}`}></i>
            <div className='preview-elements_text'>{ displayText() }</div>
          </div>
      </Button>

      {isPlayerOpen && 
        <ReactPlayer 
          url={`https://www.youtube.com/watch?v=${previewID}`} 
          controls
          playing />}
      </>
  )
}

export default Preview