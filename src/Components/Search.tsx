
import React, { useState } from 'react'
import { Form, FormGroup, Input, Button, Row } from 'reactstrap';

/**
 * Search Component
 * Displays search text and fires request for search
 */
type SearchType = {
    initialSearch: string,
    searchForItem: (query: string) => void,
    searchType: string
}

type SearchInterface = {
    [key: string]: string
}

const searches: SearchInterface = {
    'movie': ' a movie...',
    'tv': ' a tv show...',
    'person': ' people...',
}

const Search = ({initialSearch, searchForItem, searchType}: SearchType) => {
const [currentSearch, updateSearch] = useState(initialSearch)

const searchForType = searches[searchType] || '...'

return (
    <div className="input-icons"> 
        <Form onSubmit={() => searchForItem(currentSearch)}>
            <FormGroup>
                <Row>
                    <i className="fa fa-search icon"></i>
                    <Input
                        placeholder={`Search for${searchForType}`}
                        type="text" 
                        name="query"
                        onChange={(e) => updateSearch(e.target.value)}
                        className="input-field"
                        value={currentSearch}
                    />
                    <Button 
                        className='search-button'
                        type="submit"
                        onClick={() => searchForItem(currentSearch)}>
                        Search
                    </Button>
                </Row>
            </FormGroup>
        </Form>
    </div>
)
}

export default Search