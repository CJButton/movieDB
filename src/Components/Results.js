import React from 'react'
import PropTypes from 'prop-types'
import Movie from './Movie/Movie'
import TV from './TV'
import Person from './Person'
import ImageDisplay from './ImageDisplay'
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

  return (
    <div className='results-wrapper'>
      {searchResults.length ? 
        searchResults.map(item => (
        <div key={item.id}>
          <hr />
          <Row className='results-wrapper-block'>
            <Col xs='3'>
              <ImageDisplay 
                image={item.poster_path || item.profile_path}
                title={item.title || item.name} />
            </Col>
            <Col xs='9'>
              {selectComponent(item)}
            </Col>
          </Row>
        </div>
      )) :
          'No results to display... Try typing something in the search bar and hit Enter!'
      }
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