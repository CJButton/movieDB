import React from 'react'
import { Row } from 'reactstrap'
import Ratings from './Ratings'
import Preview from './Preview'
import TruncateText from './TruncateText'

type ResultsBodyType = {
  header: string,
  subtitle?: string | null,
  leftOfHyphen: string | null,
  type: string,
  rightOfHyphen: string | null,
  overview: string,
  displayVotes?: boolean | undefined,
  voteAverage?: number
  preview?: string | null
}

interface HyphenTextInterface {
  [key: string]: {
    left: string,
    right: string
  }
}

const ResultBody = (props: ResultsBodyType) => {
  const {
    subtitle = null,
    leftOfHyphen = null,
    rightOfHyphen = null,
    preview = null,
    voteAverage = null,
    displayVotes = true,
    header,
    type,
    overview
  } = props;

  const hyphenText: HyphenTextInterface = {
    movie: {
      left: 'Director: ',
      right: 'Runtime: ',
    },
    tv: {
      left: 'Created By: ',
      right: 'Runtime: ',
    },
    person: {
      left: 'Known for: ',
      right: 'Gender: ',
    },
  }

  // Move the hyphen section to another component
  
  return(
    <div className='type-wrapper'>
      <div>
        <Row>
          <h5 className='type-title'>{header}</h5>
          {subtitle && 
            <h5 className='type-year'>{subtitle}</h5>}
        </Row>
        <Row className='movie-extras'>
          { !!leftOfHyphen && 
            <p className='movie-director'>
              {hyphenText[type].left}
              {leftOfHyphen}
            </p>
          }
          { !!leftOfHyphen && !!rightOfHyphen && <p className='extras_hyphen'>-</p> }
          { !!rightOfHyphen && <p className='movie-runtime'>
              {hyphenText[type].right}
              {rightOfHyphen}
            </p>}
        </Row>
        <Row>
          <p className='movie-overview'>
            <TruncateText>
            { overview}
            </TruncateText>
          </p>
        </Row>
      </div>
      <Row className='movie-ratings'>
        { displayVotes && <Ratings votes={voteAverage} />}
        { preview && <Preview previewID={preview} />}
      </Row>
    </div>
  )
}

export default ResultBody