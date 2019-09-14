import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MovieSearch from './Containers/MovieSearch';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css';

ReactDOM.render(<MovieSearch />, document.getElementById('root'));

// If you want your MovieSearch to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
