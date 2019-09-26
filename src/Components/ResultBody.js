import React from 'react'
import { Row } from 'reactstrap'
import Ratings from './Ratings'
import Preview from './Preview'
import TruncateText from './TruncateText'
import PropTypes from 'prop-types'

const ResultBody = (props) => {
  const hyphenText = {
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
  
  return(
    <div className='type-wrapper'>
      <div>
        <Row>
          <h5 className='type-title'>{props.header}</h5>
          {props.subtitle && 
            <h5 className='type-year'>{props.subtitle}</h5>}
        </Row>
        <Row className='movie-extras'>
          { !!props.leftOfHyphen && <p className='movie-director'>
              {hyphenText[props.type].left}
              {props.leftOfHyphen}
            </p>}
          { !!props.leftOfHyphen && !!props.rightOfHyphen && <p className='extras_hyphen'>-</p> }
          { !!props.rightOfHyphen && <p className='movie-runtime'>
              {hyphenText[props.type].right}
              {props.rightOfHyphen}
            </p>}
        </Row>
        <Row>
          <p className='movie-overview'>
            <TruncateText text={props.overview} />
          </p>
        </Row>
      </div>
      <Row className='movie-ratings'>
        { props.displayVotes && <Ratings votes={props.voteAverage} />}
        { props.preview && <Preview previewID={props.preview} />}
      </Row>
    </div>
  )
}

export default ResultBody

ResultBody.propTypes = {
  type: PropTypes.string.isRequired,
  header: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  leftOfHyphen: PropTypes.string,
  rightOfHyphen: PropTypes.string,
  overview: PropTypes.string.isRequired,
  preview: PropTypes.string,
  voteAverage: PropTypes.number,
  displayVotes: PropTypes.bool,
}

ResultBody.defaultProps = {
  subtitle: null,
  leftOfHyphen: null,
  rightOfHyphen: null,
  preview: null,
  voteAverage: null,
  displayVotes: true,
}