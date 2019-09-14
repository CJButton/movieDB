
import React, { useState } from 'react';
import '../App.css';
import Tabs from '../Components/Tabs'
import Results from '../Components/Results'
import { fetchSearchResults } from '../requests'
import Search from '../Components/Search';
/*
 * MovieSearch Component
 *  Children components are placed inside as needed
 *  Will need a Tabs Bar which should be reusable
 *  a Search Bar
 *  and a Results Component
 */

 /**
  * Further Tasks
  * Complete basic info for Moive/ TV/ Person Components
  * Get video and images working where necessary
  * Basic CSS but nothing too fancy
  * Clean up call system for getting crew - bottlenecking!
  */
export const TAB_ITEMS = [
  {
    title: 'MOVIES',
    value: 'movie',
  },
  {
    title: 'TV SHOWS',
    value: 'tv',
  },
  {
    title: 'PEOPLE',
    value: 'person',
  },
]

const MovieSearch = () => {
  const [searchType, updateSearchType] = useState('movie')
  const [searchResults, updateResults] = useState({movie: [], tv: [], people: []})

  const fetchQuery = async (query) => {
    if(!query) return
    const res = await fetchSearchResults(query)

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
