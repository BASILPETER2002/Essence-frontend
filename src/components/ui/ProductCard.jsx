import { motion } from 'framer-motion';
import { Star, ShoppingBag } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useCart } from '../../context/CartContext';

const ProductCard = ({ product, index }) => {
    const [isHovered, setIsHovered] = useState(false);
    const { addToCart } = useCart();
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/shop/${product.id}`);
    };

    const handleAddToCart = (e) => {
        e.stopPropagation();
        e.preventDefault();
        addToCart(product);
    };

    // ... (keep formatPrice and getProductImage helpers) ...

    // Format price with commas
    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-IN', {
            maximumFractionDigits: 0,
        }).format(price);
    };

    // Get product image based on category (Fallback logic)
    const getProductImage = (category, name) => {
        const images = {
            'Honey': [
                'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&q=80&w=600',
                'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=600',
                'https://images.unsplash.com/photo-1559056199-5a0e5b21f5bc?auto=format&fit=crop&q=80&w=600'
            ],
            'Spices': [
                'https://images.unsplash.com/photo-1629196911526-73bc4544d62b?auto=format&fit=crop&q=80&w=600',
                'https://images.unsplash.com/photo-1563729784474-d779b95f3ea5?auto=format&fit=crop&q=80&w=600',
                'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=80&w=600',
                'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&q=80&w=600'
            ],
            'Instant Mushrooms': [
                'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=600',
                'https://images.unsplash.com/photo-1579113800032-c38bd7635818?auto=format&fit=crop&q=80&w=600'
            ]
        };

        const categoryImages = images[category] || ['https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=600'];
        const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        return categoryImages[hash % categoryImages.length];
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className="group relative cursor-pointer"
            onClick={handleCardClick}
        >
            {/* Card Container */}
            <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm hover:shadow-hard transition-all duration-300 overflow-hidden h-full flex flex-col">

                {/* Image Section */}
                <div className="relative aspect-square overflow-hidden bg-neutral-100 flex-shrink-0">
                    <img
                        src={product.image || getProductImage(product.category, product.name)}
                        alt={product.name}
                        className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Category Badge */}
                    <div className="absolute top-3 left-3">
                        <span className="px-3 py-1 bg-white/95 backdrop-blur-sm rounded-full text-xs font-semibold text-neutral-700 shadow-sm">
                            {product.category}
                        </span>
                    </div>

                    {/* Add to Cart Button */}
                    <motion.button
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
                        onClick={handleAddToCart}
                        className="absolute bottom-3 right-3 w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center hover:bg-primary-700 transition-colors shadow-lg z-10"
                    >
                        <ShoppingBag size={18} />
                    </motion.button>
                </div>

                {/* Content Section */}
                <div className="p-4 flex flex-col flex-1">
                    {/* Title */}
                    <Link to={`/shop/${product.id}`}>
                        <h3 className="font-serif text-lg font-bold text-neutral-900 mb-1 hover:text-primary-600 transition-colors line-clamp-1">
                            {product.name}
                        </h3>
                    </Link>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-2">
                        <div className="flex text-amber-400">
                            {[1, 2, 3, 4, 5].map(i => (
                                <Star key={i} size={12} fill="currentColor" />
                            ))}
                        </div>
                        <span className="text-xs text-neutral-400">(124)</span>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-neutral-500 mb-4 line-clamp-2 h-10">
                        {product.description}
                    </p>

                    {/* Price and Stock */}
                    <div className="flex items-center justify-between mt-auto">
                        <div>
                            <div className="text-xl font-bold text-primary-700">₹{formatPrice(product.price)}</div>
                            <div className="flex items-center gap-2 mt-1">
                                <div className={`w-2 h-2 rounded-full ${product.stock > 0 ? 'bg-green-500' : 'bg-red-500'}`} />
                                <span className="text-xs font-medium text-neutral-500">
                                    {product.stock > 0 ? `${product.stock} left` : 'Out of stock'}
                                </span>
                            </div>
                        </div>

                        {/* Tags */}
                        <div className="text-right">
                            <div className="flex items-center gap-1 text-xs text-secondary-600 mb-1">
                                <span className="font-medium">Bestseller</span>
                            </div>
                            <div className="text-xs text-neutral-400">Free Shipping</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Hover Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
        </motion.div>
    );
};

export default ProductCard;
