import React, { useState } from 'react';
import { render } from 'react-dom';
import { Router, Link } from '@reach/router';
import Details from './Details';
import SearchParams from './SearchParams';
import ThemeContext from './ThemeContext';

const App = () => {
  const theme = useState({
    buttonColor: "darkblue",
    modalColor: "pink"
  });
  return (
    <ThemeContext.Provider value={theme}>
      <div>
        <header>
          <Link to='/'>Adopt me!</Link>
        </header>
        <Router>
          <SearchParams path='/' />
          <Details path='/details/:id' />
        </Router>
      </div>
    </ThemeContext.Provider>
  );
};

render(<App />, document.getElementById('root'));
