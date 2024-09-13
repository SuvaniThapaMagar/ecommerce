import React, { useContext } from 'react';
import { CartContext } from './CartContext';

const Cart = () => {
    const { cartItems, addToCart } = useContext(CartContext);

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h1 className="text-2xl font-semibold mb-6">Shopping Cart</h1>
            {cartItems.length === 0 ? (
                <p>Your shopping cart is empty.</p>
            ) : (
                cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between items-start mb-6 border-b pb-4">
                        {/* Product Image and Details */}
                        <div className="flex space-x-4">
                            <img 
                                src={item.image} 
                                alt={item.name} 
                                className="w-24 h-24 object-cover"
                            />
                            <div>
                                <h2 className="text-lg font-semibold">{item.name}</h2>
                                <div className="flex items-center space-x-2">
                                    <span className="text-red-500 text-lg">${item.discountedPrice}</span>
                                    <span className="text-gray-500 line-through">${item.originalPrice}</span>
                                </div>
                                <p className="text-sm text-gray-500">Art.no: {item.artNo}</p>
                                <p className="text-sm text-gray-500">Color: {item.color}</p>
                                <p className="text-sm text-gray-500">Size: {item.size}</p>
                                <p className="text-sm font-semibold">Total: ${(item.discountedPrice * item.quantity).toFixed(2)}</p>
                            </div>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center space-x-4">
                            <button 
                                className="text-2xl font-bold p-2 border border-black rounded" 
                                onClick={() => addToCart({ ...item, quantity: item.quantity - 1 })}
                                disabled={item.quantity <= 1}
                            >
                                −
                            </button>
                            <span className="text-lg font-medium">{item.quantity}</span>
                            <button 
                                className="text-2xl font-bold p-2 border border-black rounded" 
                                onClick={() => addToCart(item)}
                            >
                                +
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default Cart;
