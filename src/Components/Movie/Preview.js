import React, { useState } from 'react'
import { Button } from 'reactstrap'
import classnames from 'classnames'
import ReactPlayer from 'react-player'

const Preview = ({previewID}) => {
  const [isPlayerOpen, updatePlayer] = useState(false)

  return(
    <>
      <Button 
        className={classnames('preview-button', { disabled: !previewID })}
        onClick={() => updatePlayer(!isPlayerOpen)}>
          <div className='preview-elements-wrapper'>
            <i className="preview-elements_icon fa fa-play"></i>
            <div className='preview-elements_text'>{ previewID ? 'Play Trailer' : 'Trailer Unavailable' }</div>
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