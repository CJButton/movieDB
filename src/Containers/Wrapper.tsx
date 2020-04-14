import React from 'react';
import '../App.scss';
import Tabs from '../Components/Tabs'
import TAB_ITEMS from './TabItems'
import Search from '../Components/Search'
import ThemeSwitch from '../Components/ThemeSwitch'
import Loader from '../Components/Loader';
import { useLoaderStore } from '../Stores/Loader.store';

const AppWrapper = ({ children }: any) => {
    const { loading } = useLoaderStore(
        state => ({
            loading: state.loading
        })
    );

    return (
        <div>
            {loading && <Loader />}
            <Tabs tabItems={TAB_ITEMS} />
            <Search />
            <ThemeSwitch />
            { children }
        </div>
    );
}

export default AppWrapper;
