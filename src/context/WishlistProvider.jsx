import React, { createContext, useState, useEffect } from 'react';

export const Wishlist = createContext();

const WishlistProvider = ({ children }) => {
    const [wishlist, setWishlist] = useState(() => {
        const savedWishlist = localStorage.getItem('wishlist');
        return savedWishlist ? JSON.parse(savedWishlist) : [];
    });

    useEffect(() => {
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }, [wishlist]);

    const addToWishlist = (movie) => {
        setWishlist((prevItems) => [...prevItems, movie]);
    };

    const removeFromWishlist = (productId) => {
        setWishlist((prevItems) => prevItems.filter(item => item.id !== productId));
    };

    return (
        <Wishlist.Provider value={{ wishlist, addToWishlist, removeFromWishlist }}>
            {children}
        </Wishlist.Provider>
    );
};

export default WishlistProvider;