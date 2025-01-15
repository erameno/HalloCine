# HalloCiné

HalloCiné est une application web qui permet aux utilisateurs de rechercher des films, de consulter les détails des films, d'ajouter des films à une wishlist et de voir des films similaires.

## Fonctionnalités

- Recherche de films avec un mécanisme de debounce pour éviter les appels API fréquents.
- Affichage des films populaires, en cours de diffusion, les mieux notés et à venir.
- Pagination pour naviguer entre les pages de résultats.
- Affichage des détails d'un film, y compris le titre, le résumé, la date de sortie, la note moyenne et les acteurs principaux.
- Affichage des films similaires dans la page des détails d'un film.
- Ajout de films à une wishlist.
- Affichage de la wishlist avec la possibilité de supprimer des films.
- Affichage en temps réel du nombre total de films dans la wishlist dans la barre de navigation.

## Installation

1. Clonez le dépôt :
   ```bash
   git clone https://github.com/votre-utilisateur/hallocine.git
   cd hallocine

2. Installez les dépendances : 
    ```bash
    npm install

3. Démarrez l'application :
   ```bash
   npm start

3. Accéder à l'application :
    ```bash
    http://localhost:5173/