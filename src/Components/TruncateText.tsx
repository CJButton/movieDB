import React, { useState } from 'react'
import Truncate from 'react-truncate';

type TruncateTextProps = {
  children: string
}

const TruncateText = (props: TruncateTextProps) => {
  const [expanded, updateExpand] = useState(false)
  return(
    <>
      <Truncate 
        lines={!expanded ? 4 : 0} 
        ellipsis={<span onClick={() => updateExpand(true)}>... more</span>}>
          { props.children }
      </Truncate>
      {expanded && (
        <span onClick={() => updateExpand(false)}>...less</span>
      )}
    </>
  )
}

export default TruncateText