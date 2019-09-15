
import React, { useState } from 'react'
import { Button } from 'reactstrap';

/**
 * Search Component
 */

const Search = ({searchForItem, searchType}) => {
  const [currentSearch, updateSearch] = useState('')

  const searches = {
    'movie': 'a movie...',
    'tv': 'a tv show...',
    'person': 'people...',
  }

  const updateCurrentSearch = (e) => {
    if(e.keyCode === 13) searchForItem(currentSearch)
  }

  return (
      <div className="input-icons"> 
        <i className="fa fa-search icon"></i>
        <input
          placeholder={`Search for ${searches[searchType]}`}
          onKeyUp={(e) => updateCurrentSearch(e)}
          onChange={(e) => updateSearch(e.target.value)}
          className="input-field" 
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