import React from 'react';
import styles from "./MovieList.module.css";
import { Link } from 'react-router';

function ActorCard({name, character, profile_path, id}) {
  return (
    <div className={styles.movieCard} key={id}>
        <img src={profile_path} alt={name} />
        <div className={styles.movieInfo}>  
            <h2>{name}</h2>
            <p>{character}</p>
        </div>
    </div>
  )
}

export default ActorCard