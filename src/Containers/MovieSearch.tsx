import React, { useState, useEffect } from 'react';
import '../App.css';
import Tabs from '../Components/Tabs'
import Results from '../Components/Results'
import { fetchSearchResults } from '../requests'
import TAB_ITEMS from './TabItems'
import Search from '../Components/Search'

type ResultsInterface = {
  movie: Array<any>,
  tv: Array<any>,
  person: Array<any>,
  [key: string]: Array<any>
}

const MovieSearch = () => {
  const [searchType, updateSearchType] = useState('')
  const [searchResults, updateResults] = useState<ResultsInterface>({ movie: [], tv: [], person: []});

  useEffect(() => {
    const queryValue = getQueryValue();

    if (queryValue) {
      fetchQuery(queryValue)
    }
  }, [])

  const getQueryValue = () => {
    const searchParams = new URLSearchParams(window.location.search)
    return searchParams.get('query')
  }

  const getTabValueFromUrl = () => {
    return searchType || window.location.pathname.slice(1)
  }

  const setUrl = (query = '') => {
    const tabValue = getTabValueFromUrl()
    const queryValue = query || getQueryValue()
    const state = { 'tab': tabValue, 'query': queryValue }

    const builtUpURL = tabValue + (queryValue ? `?query=${queryValue}` : '');

    window.history.pushState(state, '', builtUpURL)
  }

  const setTab = (searchType: string) => {
    updateSearchType(searchType)
    setUrl();
  }

  const fetchQuery = async (query: string) => {
    if(!query) return

    const res = await fetchSearchResults(query)
    setUrl(query)

    if(res.status_message) throw new Error(res.status_message)

    const values: ResultsInterface = { movie: [], tv: [], person: [] }
    await res.results.map((media: any) => values[media.media_type].push(media))

    updateResults(values)
  }

  return (
    <div className="App">
      <Tabs
        initialTab={getTabValueFromUrl()}
        tabItems={TAB_ITEMS} 
        setParentTab={setTab} />
      <Search
        initialSearch={getQueryValue() || ''}
        searchForItem={fetchQuery}
        searchType={searchType} />
      <Results
        searchResults={searchResults[searchType]}
        searchType={searchType} />
    </div>
  );
}

export default MovieSearch;
