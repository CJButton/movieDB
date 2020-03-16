import React, { useState, useEffect } from 'react';
import '../App.css';
import Tabs from '../Components/Tabs'
import Results from '../Components/Results'
import { fetchSearchResults } from '../requests'
import TAB_ITEMS from './TabItems'
import Search from '../Components/Search'

interface ResultsInterface {
  movie: Array<any>,
  tv: Array<any>,
  person: Array<any>,
  [key: string]: Array<any>
}

const MovieSearch = () => {
  const [searchType, updateSearchType] = useState('')
  const [searchResults, updateResults] = useState<ResultsInterface>({ movie: [], tv: [], person: []});

  useEffect(() => {
    const searchParams = window.location.search.replace('%20', ' ').slice(1)
    fetchQuery(searchParams)
  }, [])

  const setTab = (searchType: string) => {
    updateSearchType(searchType)
    const query = window.location.search ? `?${window.location.search.replace('%20', ' ').slice(1)}` : ''
    const builtUpURL =  `${searchType}${query}`
    window.history.pushState('', "query", `${builtUpURL}`)
  }

  const fetchQuery = async (query: string) => {
    if(!query) return
    const res = await fetchSearchResults(query)

    const type = searchType || window.location.pathname.slice(1)
    window.history.pushState('', "query", `${type}?${query}`)
    if(res.status_message) throw new Error(res.status_message)

    const values: ResultsInterface = { movie: [], tv: [], person: [] }
    await res.results.map((media: any) => values[media.media_type].push(media))

    updateResults(values)
  }

  return (
    <div className="App">
      <Tabs
        initialTab={window.location.pathname.slice(1)}
        tabItems={TAB_ITEMS} 
        setParentTab={setTab} />
      <Search
        initialSearch={window.location.search.replace('%20', ' ').slice(1)}
        searchForItem={fetchQuery}
        searchType={searchType} />
      <Results
        searchResults={searchResults[searchType]}
        searchType={searchType} />
    </div>
  );
}

export default MovieSearch;
