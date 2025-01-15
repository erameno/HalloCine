import React, { useContext } from 'react';
import { Wishlist as WishlistContext } from './context/WishlistProvider';
import styles from "./MovieList.module.css";
import MovieCard from './MovieCard';

function Wishlist() {
    const { wishlist, removeFromWishlist } = useContext(WishlistContext);

    return (
        <div className={styles.body}>
            <h1>Ma Wishlist ({wishlist.length})</h1>
            {wishlist.length === 0 ? (
                <p>Votre wishlist est vide.</p>
            ) : (
                <div className={styles.movieList}>
                    {wishlist.map(movie => (
                        <MovieCard
                          key={movie.id}
                          title={movie.title}
                          vote_average={movie.vote_average}
                          poster_path={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                          id={movie.id}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Wishlist;