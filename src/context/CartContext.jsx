import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
    return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem('essence_cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });
    const [isCartOpen, setIsCartOpen] = useState(false);

    useEffect(() => {
        localStorage.setItem('essence_cart', JSON.stringify(cartItems));
    }, [cartItems]);

    // Add to cart
    const addToCart = (product, quantity = 1) => {
        setCartItems(prevItems => {
            // Use _id for MongoDB compatibility, fallback to id if _id missing
            const productId = product._id || product.id;

            const existingItem = prevItems.find(item => (item._id || item.id) === productId);

            if (existingItem) {
                return prevItems.map(item =>
                    (item._id || item.id) === productId
                        ? { ...item, quantity: (item.quantity || 0) + quantity }
                        : item
                );
            }
            // Ensure the new item has the correct structure
            return [...prevItems, { ...product, quantity }];
        });
        setIsCartOpen(true);
    };

    const removeFromCart = (productId) => {
        setCartItems(prevItems => prevItems.filter(item => (item._id || item.id) !== productId));
    };

    const updateQuantity = (productId, newQuantity) => {
        if (newQuantity < 1) {
            removeFromCart(productId);
            return;
        }
        setCartItems(prevItems =>
            prevItems.map(item =>
                (item._id || item.id) === productId
                    ? { ...item, quantity: newQuantity }
                    : item
            )
        );
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const cartCount = cartItems.reduce((acc, item) => acc + (item.quantity || 0), 0);
    const cartTotal = cartItems.reduce((acc, item) => acc + (item.price * (item.quantity || 0)), 0);

    const value = {
        cartItems,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};
