import React, { useEffect, useState, useCallback } from 'react'
import LazyLoad from 'react-lazy-load';
import Movie from './Movie'
import TV from './TV'
import Person from './Person'
import ImageDisplay from './ImageDisplay'
import Paginator from './Paginator'
import Loader from './Loader'
import { Row, Col } from 'reactstrap';
import { fetchType, fetchTrending } from '../requests'

/**
 * Parent component for Results
 */
type ResultsType = {
    query: string
    searchType: string
}

type ComponentTree = {
    [key: string]: (props: any) => JSX.Element
}
const Results = ({ query, searchType }: ResultsType) => {
    const [searchResults, setSearchResults] = useState([])
    const [currentPages, setCurrentPage] = useState({ current: 1, total: 0 })
    const [loader, setLoader] = useState(true)

    const setResults = useCallback((media: any) => {

        const { results, page, total_pages } = media
        setSearchResults(results)
        setCurrentPage({ current: page, total: total_pages });

      }, [])

    useEffect(() => {
        if (!searchType) return

        const getMediaList = async () => {
            setLoader(true)
            try {
                const promise = !query ? fetchTrending(searchType) : fetchType(searchType, query, 1)

                return setResults(await promise)
            } catch(error) {
                console.error(error)
            } finally {
                setLoader(false)
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
            {loader && <Loader />}
            {query && searchType && (
                <Paginator
                    currentPage={currentPages.current}
                    totalPages={currentPages.total}
                    fetchPage={fetchPage}
                />
            )}

            {searchResults.map((item: any) => (
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