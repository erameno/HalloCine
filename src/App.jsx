import React from 'react';
import { Routes, Route, Link } from 'react-router';
import MovieList from './MovieList';
import MovieDetail from './MovieDetail';
import Wishlist from './Wishlist';

function App() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Liste</Link>
          </li>
          <li>
            <Link to="/wishlist">Wishlist</Link>
          </li>
        </ul>
      </nav>


      <Routes>
        <Route path="/" element={<MovieList />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/wishlist" element={<Wishlist />} />
      </Routes>
    </div>
  );
}

export default App;