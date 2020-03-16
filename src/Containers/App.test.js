import React from 'react';
import ReactDOM from 'react-dom';
import MovieSearch from './MovieSearch.tsx';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MovieSearch />, div);
  ReactDOM.unmountComponentAtNode(div);
});
