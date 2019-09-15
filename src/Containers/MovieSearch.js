
import React, { useState, useEffect } from 'react';
import '../App.css';
import Tabs from '../Components/Tabs'
import Results from '../Components/Results'
import { fetchSearchResults } from '../requests'
import TAB_ITEMS from './TabItems'
import Search from '../Components/Search'

const MovieSearch = () => {
  const [searchType, updateSearchType] = useState('movie')
  const [searchResults, updateResults] = useState({movie: [], tv: [], people: []})

  useEffect(() => {
    const params = window.location.search.replace('%20', ' ').slice(1)
    fetchQuery(params)
  }, [])

  const fetchQuery = async (query) => {
    if(!query) return
    const res = await fetchSearchResults(query)

    window.history.pushState('', "query", `?${query}`)

    if(res.statusCode) throw new Error(res.status_message)

    const values = {movie: [], tv: [], person: []}
    await res.results.map(media => values[media.media_type].push(media))

    updateResults(values)
  }
  return (
    <div className="App">
      <Tabs
        tabItems={TAB_ITEMS} 
        setParentTab={updateSearchType} />
      <Search 
        searchForItem={fetchQuery}
        searchType={searchType} />
      <Results
        searchResults={searchResults[searchType]}
        searchType={searchType} />
    </div>
  );
}

export default MovieSearch;
