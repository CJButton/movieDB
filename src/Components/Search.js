
import React, { useState } from 'react'
import { Button, Row } from 'reactstrap';

/**
 * Search Component
 */

const Search = ({searchForItem, searchType}) => {
  const [currentSearch, updateSearch] = useState('')
  // let's move this to the parent or another file
  const searches = {
    'movie': 'a movie...',
    'tv': 'a tv show...',
    'person': 'people...',
  }

  const updateCurrentSearch = (e) => {
    if(e.keyCode === 13) searchForItem(currentSearch)
  }

  return (
      <Row>
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
      </Row>
  )
}

export default Search