import React from 'react';
import { Routes, Route, Link } from 'react-router';
import MovieList from './MovieList';
import MovieDetail from './MovieDetail';
import Wishlist from './Wishlist';
import styles from "./App.module.css"

function App() {
  return (
    <div>
      <h1 className={styles.title}>HalloCiné</h1>
      <nav className={styles.navbar}>
          <Link to="/">Liste</Link>
          <Link to="/wishlist">Wishlist</Link>
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