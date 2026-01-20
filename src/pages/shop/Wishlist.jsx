import { motion } from 'framer-motion';
import { Heart, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

const Wishlist = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-20">
            <div className="text-center px-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                    <Heart className="w-12 h-12 text-red-500 fill-current" />
                </motion.div>
                <h1 className="text-3xl font-serif font-bold text-neutral-900 mb-4">
                    Your Wishlist is Empty
                </h1>
                <p className="text-neutral-500 max-w-md mx-auto mb-8">
                    Save your favorite items here to purchase later. Explore our collection of premium spices and honey.
                </p>
                <Link
                    to="/shop"
                    className="inline-flex items-center gap-2 px-8 py-3 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 transition-colors"
                >
                    <ShoppingBag size={20} />
                    <span>Start Shopping</span>
                </Link>
            </div>
        </div>
    );
};

export default Wishlist;
