import React, { useContext } from 'react';
import { CartContext } from './context/CartProvider';

function Cart() {
    const { cartItems, removeFromCart } = useContext(CartContext);

    const total = cartItems.reduce((somme, item) => somme + item.price, 0).toFixed(2);

    return (
        <div style={{
            width:"50%"
        }}>
            <h1>Panier ({cartItems.length})</h1>
            {cartItems.length === 0 ? (
                <p>Votre panier est vide.</p>
            ) : (
                <ul>
                    {cartItems.map(item => (
                        <li className='productCard' key={item.id}>
                            <p>{item.title}</p>
                            <p>Prix: ${item.price}</p>
                            <button className="addToCart" onClick={() => removeFromCart(item.id)}>Retirer</button>
                        </li>
                    ))}
                </ul>
            )}
            <p>Nombre de produit : {cartItems.length}</p>
            <p>Total : {total}€</p>
        </div>
    );
}

export default Cart;