import React, { useContext} from 'react';
import styles from "./MovieList.module.css";
import { Link } from 'react-router';
import { Wishlist } from './context/WishlistProvider';

function MovieCard({title, vote_average, poster_path, id, movie}) {

  const { addToWishlist, wishlist, removeFromWishlist } = useContext(Wishlist);
  
  const addToWishlistWithCheck = (id) => {
      const movieInWishlist = wishlist.find(item => item.id === id);
      if (movieInWishlist) {
          alert('Ce film est déjà dans votre wishlist');
      } else {
          addToWishlist(movie);
      }
  };

  return (
    <div className={styles.movieCard} key={id}>
        <img src={poster_path} alt={title} />
        <div className={styles.movieInfo}>  
            <h2>{title}</h2>
            <p>Note moyenne: {vote_average}</p>
            <Link to={`/movie/${id}`}>Voir les détails</Link>
            {wishlist.find(item => item.id === id) ? (
                <button onClick={() => removeFromWishlist(id)}>Retirer de la Wishlist</button>
            ) : (
                <button onClick={() => addToWishlistWithCheck(id)}>Ajouter à la Wishlist</button>
            )}
        </div>
    </div>
  )
}

export default MovieCard