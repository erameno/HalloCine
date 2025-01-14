import React, { useState, useEffect, useContext } from 'react';
import { CartContext } from './context/CartProvider';
import "./store.css";

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { addToCart, cartItems } = useContext(CartContext);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('https://fakestoreapi.com/products');
                const data = await response.json();
                setProducts(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching products:', error);
                setLoading(false);
            }
        };

        console.log(cartItems)
        fetchProducts();
    }, []);

    if (loading) {
        return <p>Chargement en cours…</p>;
    }

    const addToCartWithCheck = (product) => {
        const productInCart = cartItems.find(item => item.id === product.id);
        if (productInCart) {
            alert('Ce produit est déjà dans votre panier');
        } else {
            addToCart(product);
        }
    };

    return (
        <div style={{
            width:"50%"
        }}>
            <h1>Liste des Produits</h1>

            <div className="productList">
                {products.map(product => (
                    <div className="productCard" key={product.id}>
                        <h2>{product.title}</h2>
                        <p>{product.description}</p>
                        <p>Prix: {product.price}€</p>
                        <img src={product.image} alt={product.title} width="100" />
                        <button className="addToCart" onClick={() => addToCartWithCheck(product)}>Ajouter au panier</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;