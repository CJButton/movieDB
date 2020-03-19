import React from 'react'
import LazyLoad from 'react-lazy-load';
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

type ComponentTree = {
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
                        <LazyLoad
                            offsetVertical={500}
                            debounce={false}
                            once
                        >
                                { <SelectedComponent {...item} /> }
                        </LazyLoad>
                    </Col>
                    </Row>
                </div>
            )) :
                'No results to display'
            }
        </div>
    )
}

export default Results