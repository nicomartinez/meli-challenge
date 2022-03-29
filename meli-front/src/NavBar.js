import React, { useState } from 'react';
import {
  Link,
  useNavigate,
  createSearchParams
} from 'react-router-dom';
import logo from './assets/Logo_ML.png';
import searchIcon from './assets/ic_Search.png';

const NavBar = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query) {
      console.log('Funciona');
      navigate({
        pathname: "items",
        search: `?${createSearchParams({
            search: query
        })}`
      });
    }
  }

  return (
    <header className="App-header">
      <Link to="/" >
        <img src={logo} className="App-logo" alt="logo" />
      </Link>
      <form onSubmit={handleSubmit} className='Query-form'>
        <label htmlFor="searchInput">
          <input type="text" name="query" placeholder='Nunca dejes de buscar' id="searchInput" autoComplete="off"
                  value={query} onChange={(e) => setQuery(e.target.value)}/>
          <span className="App-search-icon" onClick={handleSubmit}><img src={searchIcon} alt=""/></span>
        </label>
      </form>
    </header>
  );

}

export default NavBar;