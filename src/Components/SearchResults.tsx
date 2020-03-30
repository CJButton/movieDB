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
import { useLocation } from 'react-router-dom'

const getQuery = (location: any) => {
    const params = new URLSearchParams(location.search)
    return params.get('query') || ''
}

type ComponentTree = {
    [key: string]: (props: any) => JSX.Element
}
const Results = () => {
    const location = useLocation()

    const [urlData, updateUrlData] = useState({ query: '', searchType: location.pathname.slice(1) })
    const [searchResults, setSearchResults] = useState([])
    const [currentPages, setCurrentPage] = useState({ current: 1, total: 0 })
    const [loader, setLoader] = useState(true)

    const { query, searchType } = urlData

    const setResults = useCallback((media: any) => {

        const { results, page, total_pages } = media
        setSearchResults(results)
        setCurrentPage({ current: page, total: total_pages });

      }, [])

    useEffect(() => {

        const getMediaList = async () => {
            const type = location.pathname.slice(1)
            const query = getQuery(location)

            updateUrlData({ query, searchType: type })
            setLoader(true)
            try {
                const promise = !query ? fetchTrending(type) : fetchType(type, query, 1)

                return setResults(await promise)
            } catch(error) {
                console.error(error)
            } finally {
                setLoader(false)
            }

        }
        getMediaList();
    }, [location, query, searchType, setResults]);

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

    if (!searchResults?.length) {
        return (
            <div className='results-wrapper'>
                No results to display
            </div>
        );
    }
    
    return (
        <div className='results-wrapper'>
            {loader && <Loader />}
            {query && (
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
                            {!loader && (
                                <LazyLoad
                                    offsetVertical={200}
                                    debounce
                                    once
                                    height={'100%'}>
                                    <SelectedComponent {...item} />
                                </LazyLoad>
                            )}
                        </Col>
                    </Row>
                </div>
            ))}
        </div>
    )
}

export default Results