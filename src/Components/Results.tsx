import React from 'react'
import Movie from './Movie'
import TV from './TV'
import Person from './Person'
import ImageDisplay from './ImageDisplay'
import { Row, Col } from 'reactstrap';

/**
 * Parent component for Results
 */
type ResultsType = {
  searchResults: Array<any>,
  searchType: string
}

interface ComponentTree {
  [key: string]: (props: any) => JSX.Element
}
const Results = ({ searchResults = [], searchType }: ResultsType) => {

  const componentTree: ComponentTree = {
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

export default Results