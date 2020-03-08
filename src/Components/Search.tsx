
import React, { useState } from 'react'
import { Button } from 'reactstrap';

/**
 * Search Component
 * Displays search text and fires request for search
 */
type SearchType = {
  initialSearch: string,
  searchForItem: (query: string) => Promise<void>,
  searchType: string
}

interface SearchInterface {
  [key: string]: string
}
const Search = ({initialSearch, searchForItem, searchType}: SearchType) => {
  const [currentSearch, updateSearch] = useState(initialSearch || '')

  const searches: SearchInterface = {
    'movie': ' a movie...',
    'tv': ' a tv show...',
    'person': ' people...',
  }

  const updateCurrentSearch = (e: React.KeyboardEvent) => {
    if(e.keyCode === 13) searchForItem(currentSearch)
  }

  const searchForType = searches[searchType] || '...'

  return (
      <div className="input-icons"> 
        <i className="fa fa-search icon"></i>
        <input
          placeholder={`Search for${searchForType}`}
          onKeyUp={(e) => updateCurrentSearch(e)}
          onChange={(e) => updateSearch(e.target.value)}
          className="input-field"
          value={currentSearch}
          type="text" />
        <Button 
          className='search-button'
          onClick={() => searchForItem(currentSearch)}>
          Search
        </Button>
      </div>
  )
}

export default Search