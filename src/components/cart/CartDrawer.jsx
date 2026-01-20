import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useCart } from '../../context/CartContext';

const CartDrawer = () => {
    const {
        cartItems,
        isCartOpen,
        setIsCartOpen,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal
    } = useCart();

    const deliveryCharge = 50;
    const total = cartTotal + deliveryCharge;

    const onClose = () => setIsCartOpen(false);

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 30 }}
                        className="fixed top-0 right-0 h-full w-full md:w-96 bg-white shadow-hard z-50 flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-neutral-100">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center text-primary-600">
                                    <ShoppingBag size={20} />
                                </div>
                                <div>
                                    <h3 className="font-serif text-xl font-bold text-neutral-900">Your Cart</h3>
                                    <p className="text-sm text-neutral-500">
                                        {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-neutral-100 rounded-xl transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Cart Items */}
                        <div className="flex-1 overflow-y-auto p-6">
                            {cartItems.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center">
                                    <div className="w-24 h-24 bg-neutral-100 rounded-full flex items-center justify-center mb-6">
                                        <ShoppingBag size={40} className="text-neutral-400" />
                                    </div>
                                    <h4 className="text-xl font-serif font-bold text-neutral-900 mb-2">
                                        Your cart is empty
                                    </h4>
                                    <p className="text-neutral-500 mb-8">
                                        Add some products to get started
                                    </p>
                                    <button
                                        onClick={onClose}
                                        className="px-6 py-3 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 transition-colors"
                                    >
                                        Continue Shopping
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {cartItems.map(item => (
                                        <div key={item.id} className="flex gap-4 p-4 bg-neutral-50 rounded-xl">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-20 h-20 object-cover rounded-lg"
                                            />
                                            <div className="flex-1">
                                                <div className="flex justify-between items-start mb-2">
                                                    <div>
                                                        <h4 className="font-medium text-neutral-900">{item.name}</h4>
                                                        <p className="text-sm text-neutral-500">₹{item.price}</p>
                                                    </div>
                                                    <button
                                                        onClick={() => removeItem(item.id)}
                                                        className="p-1 hover:bg-neutral-200 rounded-lg transition-colors"
                                                    >
                                                        <Trash2 size={16} className="text-neutral-400" />
                                                    </button>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2">
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.qty - 1)}
                                                            className="w-8 h-8 flex items-center justify-center bg-white border border-neutral-200 rounded-lg hover:bg-neutral-50"
                                                        >
                                                            <Minus size={14} />
                                                        </button>
                                                        <span className="w-8 text-center font-medium">{item.qty}</span>
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.qty + 1)}
                                                            className="w-8 h-8 flex items-center justify-center bg-white border border-neutral-200 rounded-lg hover:bg-neutral-50"
                                                        >
                                                            <Plus size={14} />
                                                        </button>
                                                    </div>
                                                    <span className="font-medium text-neutral-900">
                                                        ₹{item.price * item.qty}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        {cartItems.length > 0 && (
                            <div className="border-t border-neutral-100 p-6 space-y-4">
                                <div className="space-y-2">
                                    <div className="flex justify-between text-neutral-600">
                                        <span>Subtotal</span>
                                        <span className="font-medium">₹{cartTotal}</span>
                                    </div>
                                    <div className="flex justify-between text-neutral-600">
                                        <span>Delivery</span>
                                        <span className="font-medium">₹{deliveryCharge}</span>
                                    </div>
                                    <div className="flex justify-between text-lg font-bold text-neutral-900 pt-2 border-t border-neutral-100">
                                        <span>Total</span>
                                        <span>₹{total}</span>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <Link
                                        to="/cart"
                                        onClick={onClose}
                                        className="flex w-full px-6 py-3 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 transition-colors items-center justify-center gap-2"
                                    >
                                        <span>Checkout Now</span>
                                        <ArrowRight size={18} />
                                    </Link>
                                    <button
                                        onClick={clearCart}
                                        className="w-full px-6 py-3 bg-neutral-100 text-neutral-700 rounded-xl font-medium hover:bg-neutral-200 transition-colors"
                                    >
                                        Clear Cart
                                    </button>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CartDrawer;