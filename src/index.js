import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Wrapper from './Containers/Wrapper';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import { HashRouter, Route, Redirect } from "react-router-dom";
import Results from './Components/SearchResults'

const Routes = () => {
    return (
        <HashRouter basename='/'>
            <Wrapper>
                <Route exact path="/">
                    <Redirect to="/movie" />
                </Route>
                <Results />
            </Wrapper>
       </HashRouter>
    )
}

ReactDOM.render(<Routes />, document.getElementById('root'));

// If you want your MovieSearch to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
