import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router';
import { Wishlist } from './context/WishlistProvider';

const key = '71b159e1c71b2c4d021a272528c8214a';
const url = 'https://api.themoviedb.org/3';

function MovieDetail() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [actors, setActors] = useState([]);
    const { addToWishlist } = useContext(Wishlist);

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

        fetchMovieDetails();
        fetchMovieActors();
    }, [id]);

    if (!movie) {
        return <p>Chargement en cours…</p>;
    }

    return (
        <div>
            <h1>{movie.title}</h1>
            <p>{movie.overview}</p>
            <p>Date de sortie: {movie.release_date}</p>
            <p>Note moyenne: {movie.vote_average}</p>
            <button onClick={() => addToWishlist(movie)}>Ajouter à la Wishlist</button>
            <h2>Acteurs Principaux</h2>
            <ul>
                {actors.map(actor => (
                    <li key={actor.id}>
                        <p>{actor.name} as {actor.character}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default MovieDetail;