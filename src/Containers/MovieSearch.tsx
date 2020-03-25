import React, { useState } from 'react';
import '../App.css';
import Tabs from '../Components/Tabs'
import Results from '../Components/Results'
import TAB_ITEMS from './TabItems'
import Search from '../Components/Search'

const getQueryValue = () => {
    const searchParams = new URLSearchParams(window.location.search)
    return searchParams.get('query') || ''
  }

const MovieSearch = () => {
  const [searchType, updateSearchType] = useState('')
  const [query, updateQuery] = useState<string>(getQueryValue());

    const getTabValue = () => {
        return searchType || window.location.pathname.slice(9)
    }

    const setUrl = (query = '') => {
        const tabValue = getTabValue()
        const queryValue = query || getQueryValue()
        const state = { 'tab': tabValue, 'query': queryValue }

        const builtUpURL = 'movieDB/' + tabValue + (queryValue ? `?query=${queryValue}` : '');
        console.log(window.location, 'window location')
        console.log(builtUpURL, 'builtUpURLbuiltUpURL')
        window.history.pushState(state, '', builtUpURL)
    }

  const setTab = (searchType: string) => {
    updateSearchType(searchType)
    setUrl();
  }

  const fetchQuery = (query: string) => {
    if(!query) return

    updateQuery(query);
    setUrl(query)
  }

  return (
        <div className="App">
            <Tabs
                initialTab={getTabValue()}
                tabItems={TAB_ITEMS} 
                setParentTab={setTab} />
            <Search
                initialSearch={getQueryValue() || ''}
                searchForItem={fetchQuery}
                searchType={searchType} />
            <Results
                query={query}
                searchType={searchType} />
        </div>
  );
}

export default MovieSearch;
