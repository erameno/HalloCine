import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import styles from "./MovieList.module.css";

const key = '71b159e1c71b2c4d021a272528c8214a';
const url = 'https://api.themoviedb.org/3';

const MovieList = () => {
    const [movies, setMovies] = useState([]);
    const [category, setCategory] = useState('popular');
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);

    useEffect(() => {
        const fetchMovies = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${url}/movie/${category}?api_key=${key}&page=${page}`);
                const data = await response.json();
                setMovies(data.results);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching movies:', error);
                setLoading(false);
            }
        };

        fetchMovies();
    }, [category, page]);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (searchTerm) {
            setLoading(true);
            try {
                const response = await fetch(`${url}/search/movie?api_key=${key}&query=${searchTerm}&page=${page}`);
                const data = await response.json();
                setMovies(data.results);
                setLoading(false);
            } catch (error) {
                console.error('Error searching movies:', error);
                setLoading(false);
            }
        }
    };

    const handlePreviousPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    const handleNextPage = () => {
        setPage(page + 1);
    };

    if (loading) {
        return <p>Chargement en cours…</p>;
    }

    return (
        <div className={styles.body}>
            <h1>Liste des Films</h1>
            <div className={styles.filterList}>
              <button className={styles.filterButton} onClick={() => setCategory('popular')} 
                style={{ backgroundColor: category === 'popular' ? '#ff5500' : 'white' }}>Popular</button>
              <button className={styles.filterButton} onClick={() => setCategory('now_playing')}
                style={{ backgroundColor: category === 'now_playing' ? '#ff5500' : 'white' }}>Now Playing</button>
              <button className={styles.filterButton} onClick={() => setCategory('top_rated')}
                style={{ backgroundColor: category === 'top_rated' ? '#ff5500' : 'white' }}>Top Rated</button>
              <button className={styles.filterButton} onClick={() => setCategory('upcoming')}
                style={{ backgroundColor: category === 'upcoming' ? '#ff5500' : 'white' }}>Upcoming</button>
              
              <form onSubmit={handleSearch}>
                  <input
                      type="text"
                      placeholder="Rechercher un film"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <button className={styles.filterButton} type="submit">Rechercher</button>
              </form>
            </div>
            <div className={styles.movieList}>
                {movies.map(movie => (
                    <div className={styles.movieCard} key={movie.id}>
                        <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
                        <div className={styles.movieInfo}>  
                          <h2>{movie.title}</h2>
                          <p>Note moyenne: {movie.vote_average}</p>
                          <Link to={`/movie/${movie.id}`}>Voir les détails</Link>
                        </div>
                    </div>
                ))}
            </div>
            <div  className={styles.pagination}>
                <button onClick={handlePreviousPage} disabled={page === 1}>Précédent</button>
                <button onClick={handleNextPage}>Suivant</button>
            </div>
        </div>
    );
};

export default MovieList;