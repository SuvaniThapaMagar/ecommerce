import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        console.log("Cart updated:", cartItems);
    }, [cartItems]);

    const addToCart = (product, quantity = 1) => {
        console.log("Adding to cart:", product, "Quantity:", quantity);
        
        // Generate a unique ID for each cart item
        const cartItemId = `${product.id}-${new Date().getTime()}`;

        setCartItems((prevItems) => {
            return [...prevItems, { ...product, quantity, cartItemId }];
        });
    };

    const removeFromCart = (cartItemId) => {
        console.log("Removing from cart:", cartItemId);
        setCartItems(prevItems => prevItems.filter(item => item.cartItemId !== cartItemId));
    };

    const updateQuantity = (cartItemId, newQuantity) => {
        console.log("Updating quantity:", cartItemId, "New quantity:", newQuantity);
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.cartItemId === cartItemId
                    ? { ...item, quantity: newQuantity }
                    : item
            )
        );
    };

    const clearCart = () => {
        console.log("Clearing cart");
        setCartItems([]);
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;
