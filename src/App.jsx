import React from 'react';
import { Routes, Route, Link } from 'react-router';
import MovieList from './MovieList';
import MovieDetail from './MovieDetail';
import Wishlist from './Wishlist';
import styles from "./App.module.css"

function App() {
  return (
    <>
      <div className={styles.navbar}>
        <h1 className={styles.title}><Link to="/">HalloCiné</Link></h1>
        <nav>
            <Link to="/">Liste</Link>
            <Link to="/wishlist">Wishlist</Link>
        </nav>
      </div>


      <Routes>
        <Route path="/" element={<MovieList />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/wishlist" element={<Wishlist />} />
      </Routes>
    </>
  );
}

export default App;