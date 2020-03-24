import React, { useEffect, useState, useCallback } from 'react'
import LazyLoad from 'react-lazy-load';
import Movie from './Movie'
import TV from './TV'
import Person from './Person'
import ImageDisplay from './ImageDisplay'
import Paginator from './Paginator'
import { Row, Col } from 'reactstrap';
import { fetchType, fetchTrending } from '../requests'

/**
 * Parent component for Results
 */
type ResultsType = {
    query: string
    searchType: string
}

type PageType = {
    movie: { current: number, total: number },
    tv: { current: number, total: number },
    person: { current: number, total: number },
    [key: string]: { current: number, total: number }
}

type ComponentTree = {
    [key: string]: (props: any) => JSX.Element
}
const Results = ({ query, searchType }: ResultsType) => {

    const [searchResults, setSearchResults] = useState([])
    const [currentPages, setCurrentPage] = useState<PageType>({ 
        movie: { current: 0, total: 0 }, 
        tv: { current: 0, total: 0 },
        person: { current: 0, total: 0 } 
    })

    const setResults = useCallback((media: any) => {
        setSearchResults(media.results)

        if (!query) return

        const pages = { ...currentPages }
        pages[searchType].current = media.page
        pages[searchType].total = media.total_pages

        setCurrentPage(pages);
      }, [currentPages, query, searchType])

    useEffect(() => {
        if (!searchType) return

        const getMediaList = async () => {
            try {
                const promise = !query ? fetchTrending(searchType) : fetchType(searchType, query, 1)

                return setResults(await promise)
            } catch(error) {
                console.error(error)
            }

        }
        getMediaList();
    }, [query, searchType, setResults]);

    const fetchPage = async (page: number) => {
        const results = await fetchType(searchType, query, page);
        setResults(results);
    }

    const componentTree: ComponentTree = {
        tv: TV,
        movie: Movie,
        person: Person, 
    }

    const SelectedComponent = componentTree[searchType]

    if (!searchResults.length) {
        return (
            <div className='results-wrapper'>
                No results to display
            </div>
        );
    }

    return (
        <div className='results-wrapper'>
            {query && searchType && (
                <Paginator
                    currentPage={currentPages[searchType].current}
                    totalPages={currentPages[searchType].total}
                    fetchPage={fetchPage}
                />
            )}

            {searchResults && searchResults.map((item: any) => (
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
            ))}
        </div>
    )
}

export default Results