import React, { useEffect, useState } from 'react'
import LazyLoad from 'react-lazy-load';
import Movie from './Movie'
import TV from './TV'
import Person from './Person'
import ImageDisplay from './ImageDisplay'
import { Row, Col } from 'reactstrap';
import { fetchType, fetchTrending } from '../requests'

/**
 * Parent component for Results
 */
type ResultsType = {
    query: string
    searchType: string
    page?: number
}

type MediaType = {
    movie: Array<any>,
    tv: Array<any>,
    person: Array<any>,
    [key: string]: Array<any>
  }

  type PageType = {
    movie: number,
    tv: number,
    person: number,
    [key: string]: number
  }

type ComponentTree = {
    [key: string]: (props: any) => JSX.Element
}
const Results = ({ query, searchType, page = 1 }: ResultsType) => {
    const [searchResults, setSearchResults] = useState<MediaType>({ movie: [], tv: [], person: [] })
    const [currentQuery, setCurrentQuery] = useState('')
    const [currentPages, setCurrentPage] = useState<PageType>({ movie: 0, tv: 0, person: 0 })

    useEffect(() => {
        const getMediaList = async () => {
            if (!query) {
                try {
                    const trending = await fetchTrending();

                    return setResults(trending);
                } catch(error) {
                    console.error(error)
                }
            }

            if (!searchType) return;

            if (currentPages[searchType] === 1) return;

            try {
                const results = await fetchType(searchType, query);

                setResults(results);
                const pages = { ...currentPages }
                pages[searchType] = results.page
                setCurrentPage(pages);
            } catch(error) {
                console.error(error);
            }
        }
        getMediaList();
    }, [query, searchType]);

    const setResults = (media: any) => {
        const values = query === currentQuery ? searchResults : { movie: [], tv: [], person: [] };
        media.results.map((work: any) => values[work.media_type || searchType].push(work));

        setCurrentQuery(query)
        setSearchResults(values)
      }

    const componentTree: ComponentTree = {
        tv: TV,
        movie: Movie,
        person: Person, 
    }

    const SelectedComponent = componentTree[searchType]

    return (
        <div className='results-wrapper'>
            {searchType && searchResults[searchType].length ? 
                searchResults[searchType].map(item => (
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
                                    height={'100%'}>
                                    <SelectedComponent {...item} />
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