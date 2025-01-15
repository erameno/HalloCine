import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link  } from 'react-router';
import { Wishlist } from './context/WishlistProvider';
import MovieCard from './MovieCard';
import styles from "./MovieList.module.css";
import ActorCard from './ActorCard';

const key = '71b159e1c71b2c4d021a272528c8214a';
const url = 'https://api.themoviedb.org/3';

function MovieDetail() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [actors, setActors] = useState([]);
    const [similarMovies, setSimilarMovies] = useState([]);
    const { addToWishlist, wishlist, removeFromWishlist } = useContext(Wishlist);

    const addToWishlistWithCheck = (movie) => {
        const movieInWishlist = wishlist.find(item => item.id === movie.id);
        if (movieInWishlist) {
            alert('Ce film est déjà dans votre wishlist');
        } else {
            addToWishlist(movie);
        }
    };

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const response = await fetch(`${url}/movie/${id}?api_key=${key}`);
                const data = await response.json();
                setMovie(data);
            } catch (error) {
                console.error('Error fetching movie details:', error);
            }
        };

        const fetchMovieActors = async () => {
            try {
                const response = await fetch(`${url}/movie/${id}/credits?api_key=${key}`);
                const data = await response.json();
                setActors(data.cast.slice(0, 10));
            } catch (error) {
                console.error('Error fetching movie actors:', error);
            }
        };

        const fetchSimilarMovies = async () => {
            try {
                const response = await fetch(`${url}/movie/${id}/similar?api_key=${key}`);
                const data = await response.json();
                setSimilarMovies(data.results);
            } catch (error) {
                console.error('Error fetching similar movies:', error);
            }
        };

        fetchMovieDetails();
        fetchMovieActors();
        fetchSimilarMovies();
    }, [id]);

    if (!movie) {
        return <p>Chargement en cours…</p>;
    }

    return (
        <div className={styles.body}>
            <h1>{movie.title}</h1>
            <p>{movie.overview}</p>
            <p>Date de sortie: {movie.release_date}</p>
            <p>Note moyenne: {movie.vote_average}</p>
            { wishlist.find(item => item.id === movie.id) ? (
                <button onClick={() => removeFromWishlist(movie.id)}>Ajouter à la Wishlist</button>
                
            ) : 
                (
                    <button onClick={() => addToWishlistWithCheck(movie)}>Retirer de la Wishlist</button>
                )
            }
            <h2>Acteurs Principaux</h2>
            <div className={styles.movieList}>
                {actors.map(actor => (
                    <ActorCard
                        key={actor.id}
                        name={actor.name}
                        character={actor.character}
                        profile_path={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}   
                    />
                ))}
            </div>
            <h2>Films Similaires</h2>
            <div className={styles.movieList}>
                {similarMovies.map(similarMovie => (
                    <MovieCard
                        key={similarMovie.id}
                        title={similarMovie.title}
                        vote_average={similarMovie.vote_average}
                        poster_path={`https://image.tmdb.org/t/p/w200${similarMovie.poster_path}`}
                        id={similarMovie.id}
                        movie={similarMovie}
                    />
                ))}
            </div>
        </div>
    );
}

export default MovieDetail;