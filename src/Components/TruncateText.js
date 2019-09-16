import React, { useState } from 'react'
import Truncate from 'react-truncate';

const TruncateText = ({text}) => {
  const [expanded, updateExpand] = useState(false)
  return(
    <>
      <Truncate 
        lines={!expanded ? 4 : 0} 
        ellipsis={<span onClick={() => updateExpand(true)}>... more</span>}>
          {text}
      </Truncate>
      {expanded && (
        <span onClick={() => updateExpand(false)}>...less</span>
      )}
    </>
  )
}

export default TruncateText