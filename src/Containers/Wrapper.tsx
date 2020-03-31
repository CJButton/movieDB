import React from 'react';
import '../App.scss';
import Tabs from '../Components/Tabs'
import TAB_ITEMS from './TabItems'
import Search from '../Components/Search'
import ThemeSwitch from '../Components/ThemeSwitch'

const AppWrapper = ({ children }: any) => {
  return (
        <div className="App">
            <Tabs tabItems={TAB_ITEMS} />
            <Search />
            <ThemeSwitch />
            { children }
        </div>
  );
}

export default AppWrapper;
