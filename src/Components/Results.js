import React from 'react'
import PropTypes from 'prop-types'
import Movie from './Movie'
import TV from './TV'
import Person from './Person'
import ImageDisplay from './ImageDisplay'
import { Row, Col } from 'reactstrap';

/**
 * Parent component for Results
 */
const Results = ({searchResults, searchType}) => {
  const componentTree = {
    tv: TV,
    movie: Movie,
    person: Person, 
  }
  const SelectedComponent = componentTree[searchType]
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
              { <SelectedComponent {...item} /> }
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