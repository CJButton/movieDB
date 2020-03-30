import React from 'react';
import '../App.css';
import Tabs from '../Components/Tabs'
import TAB_ITEMS from './TabItems'
import Search from '../Components/Search'

const AppWrapper = ({ children }: any) => {
  return (
        <div className="App">
            <Tabs tabItems={TAB_ITEMS} />
            <Search />
            { children }
        </div>
  );
}

export default AppWrapper;
