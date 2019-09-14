import React from 'react'
import PropTypes from 'prop-types'
import Movie from './Movie'
import TV from './TV'
import Person from './Person'
import LazyLoad from 'react-lazy-load';
import { Row, Col } from 'reactstrap';

/**
 * Parent component for Results
 * 
 */
const Results = ({searchResults, searchType}) => {
  const selectComponent = (props) => {
    switch(searchType) {
      case 'movie':
        return <Movie {...props} />
      case 'tv':
          return <TV {...props} />
      case 'person':
          return <Person {...props} />
      default:
        return null
    }
  }

  const displayPoster = (poster_path, title) => (
    <LazyLoad 
      width={100}
      height={100}
      debounce={false}
      offsetVertical={500}
    >
      <img
        src={`https://image.tmdb.org/t/p/original/${poster_path}`}
        alt={`${title}-poster`}
        style={{'maxHeight': '15rem', 'textAlign': 'auto'}}
      />
    </LazyLoad>
  )

  return (
    <div>
      {searchResults.map(item => (
        <div key={item.id}>
          <Row>
            <Col xs="3">
              {item.poster_path && displayPoster(item.poster_path, item.title)}
            </Col>
            <Col>
              {selectComponent(item)}
            </Col>
          </Row>
        </div>
      ))}
    </div>
  )
}

Results.propTypes = {
  searchResults: PropTypes.array,
}

Results.defaultProps = {
  searchResults: []
}

export default Results