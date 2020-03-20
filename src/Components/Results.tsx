import React, { useEffect, useState } from 'react'
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
    page?: number
}

type MediaType = {
    movie: Array<any>,
    tv: Array<any>,
    person: Array<any>,
    [key: string]: Array<any>
  }

  type PageType = {
    movie: {
        current: number,
        total: number
    },
    tv: {
        current: number,
        total: number
    },
    person: {
        current: number,
        total: number
    },
    [key: string]: {
        current: number,
        total: number
    }
  }

type ComponentTree = {
    [key: string]: (props: any) => JSX.Element
}
const Results = ({ query, searchType, page = 1 }: ResultsType) => {
    const [searchResults, setSearchResults] = useState<MediaType>({ movie: [], tv: [], person: [] })
    const [currentQuery, setCurrentQuery] = useState('')
    const [currentPages, setCurrentPage] = useState<PageType>({ 
        movie: { current: 0, total: 0 }, 
        tv: { current: 0, total: 0 },
        person: { current: 0, total: 0 } 
    })

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

            if (currentPages[searchType].current === 1) return;

            try {
                const results = await fetchType(searchType, query, 1);
                setResults(results);
            } catch(error) {
                console.error(error);
            }
        }
        getMediaList();
    }, [query, searchType]);

    const fetchPage = async (page: number) => {
        const results = await fetchType(searchType, query, page);
        setResults(results);
    }

    const setResults = (media: any) => {
        // const values = query === currentQuery ? searchResults : { movie: [], tv: [], person: [] };
        const values: MediaType = { movie: [], tv: [], person: [] };
        media.results.map((work: any) => values[work.media_type || searchType].push(work));

        setCurrentQuery(query)
        setSearchResults(values)

        const pages = { ...currentPages }
        pages[searchType].current = media.page
        pages[searchType].total = media.total_pages

        setCurrentPage(pages);
      }

    const componentTree: ComponentTree = {
        tv: TV,
        movie: Movie,
        person: Person, 
    }

    const SelectedComponent = componentTree[searchType]

    return (
        <div className='results-wrapper'>
            {searchType && <Paginator
                currentPage={currentPages[searchType].current}
                totalPages={currentPages[searchType].total}
                fetchPage={fetchPage}
            />}

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