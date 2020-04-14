import React, { useEffect, useState, useCallback } from 'react'
import LazyLoad from 'react-lazy-load';
import Movie from './Movie'
import TV from './TV'
import Person from './Person'
import ImageDisplay from './ImageDisplay'
import Paginator from './Paginator'
import { fetchType, fetchTrending } from '../requests'
import { useLocation } from 'react-router-dom'
import { useLoaderStore } from '../Stores/Loader.store';

const getQuery = (location: any) => {
    const params = new URLSearchParams(location.search)
    return params.get('query') || ''
}

type ComponentTree = {
    [key: string]: (props: any) => JSX.Element
}
const Results = () => {
    const location = useLocation()
    const { loading, activate, deactivate } = useLoaderStore(
        state => ({
            loading: state.loading,
            activate: state.activate,
            deactivate: state.deactivate
        })
    );

    const [urlData, updateUrlData] = useState({ query: '', searchType: location.pathname.slice(1) })
    const [searchResults, setSearchResults] = useState([])
    const [currentPages, setCurrentPage] = useState({ current: 1, total: 0 })

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
            activate();
            try {
                const promise = !query ? fetchTrending(type) : fetchType(type, query, 1)

                return setResults(await promise)
            } catch(error) {
                console.error(error)
            } finally {
                deactivate();
            }

        }
        getMediaList();
    }, [location, query, searchType, setResults, activate, deactivate]);

    const fetchPage = async (page: number) => {
        activate();
        try {
            const results = await fetchType(searchType, query, page);
            setResults(results);
        } finally {
            deactivate();
        }
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
                    <div className='results-wrapper-block'>
                        <ImageDisplay 
                            image={item.poster_path || item.profile_path}
                            title={item.title || item.name} />
                            {!loading && (
                                <LazyLoad
                                    offsetVertical={200}
                                    debounce
                                    once
                                    width={'100%'}>
                                    <SelectedComponent {...item} />
                                </LazyLoad>
                            )}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Results