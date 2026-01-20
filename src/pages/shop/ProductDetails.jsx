import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Truck, ShieldCheck, Leaf, Loader, Minus, Plus, ShoppingBag } from 'lucide-react';
import Button from '../../components/ui/Button';
import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import PageWrapper from '../../animations/pageWrapper';
import { fadeUp } from '../../animations/variants';

const ProductDetails = () => {
    const { id } = useParams();
    const [selectedWeight, setSelectedWeight] = useState('500g'); // Default weight
    const [quantity, setQuantity] = useState(1);
    const { addToCart, setIsCartOpen } = useCart();

    const PRODUCT_DATA = [
        {
            _id: '1',
            name: 'Wild Forest Honey',
            price: 550,
            image: '/assets/products/honey.jpg',
            category: 'Honey',
            rating: 4.8,
            reviews: 128,
            description: '100% raw, organic honey sourced mainly from the deep forests of Wayanad. Unprocessed and rich in natural enzymes.',
            tags: ['Organic', 'Raw'],
            weights: ['250g', '500g', '1kg']
        },
        {
            _id: '2',
            name: 'Wayanad Cardamom',
            price: 850,
            image: '/assets/products/cardamom.jpg',
            category: 'Spices',
            rating: 4.9,
            reviews: 85,
            description: 'Handpicked green cardamom pods with intense aroma and authentic flavor.',
            tags: ['Premium', 'Aromatic'],
            weights: ['50g', '100g', '250g']

        },
        {
            _id: '3',
            name: 'Black Pepper',
            price: 400,
            image: '/assets/products/pepper.jpg',
            category: 'Spices',
            rating: 4.7,
            reviews: 92,
            description: 'Premium quality black pepper, sun-dried and packed with spice.',
            tags: ['Spicy', 'Fresh'],
            weights: ['100g', '250g', '500g']
        },
        {
            _id: '4',
            name: 'Instant Mushroom Soup',
            price: 150,
            image: '/assets/products/soup.jpg',
            category: 'Instant',
            rating: 4.6,
            reviews: 45,
            description: 'Delicious and creamy mushroom soup, ready in minutes.',
            tags: ['Quick', 'Tasty'],
            weights: ['5 packs', '10 packs']
        }
    ];

    const getProductImage = (product) => {
        if (!product) return '';
        return product.image;
    };

    const product = PRODUCT_DATA.find(p => p._id === id);

    if (!product) {
        return (
            <PageWrapper>
                <div className="min-h-screen flex items-center justify-center bg-stone-50">
                    <div className="text-center">
                        <h2 className="text-2xl font-serif font-bold text-earth mb-2">Product Not Found</h2>
                        <p className="text-earth/60">We couldn't find the product you're looking for.</p>
                    </div>
                </div>
            </PageWrapper>
        );
    }

    const handleAddToCart = () => {
        addToCart(product, quantity);
        setIsCartOpen(true);
    };

    return (
        <PageWrapper>
            <div className="pt-24 pb-20 min-h-screen bg-stone-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start">
                        {/* Image Section */}
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={fadeUp}
                            className="relative aspect-square rounded-3xl overflow-hidden bg-white shadow-lg border border-stone-100 group"
                        >
                            <img
                                src={getProductImage(product)}
                                alt={product.name}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute top-6 left-6">
                                <span className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest text-leaf shadow-sm border border-white/50">
                                    {product.category}
                                </span>
                            </div>
                        </motion.div>

                        {/* Details Section */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="space-y-8"
                        >
                            <div>
                                <h1 className="text-4xl md:text-5xl font-serif font-bold text-earth mb-4 leading-tight">{product.name}</h1>

                                <div className="flex items-center gap-4 mb-6">
                                    <div className="flex items-center text-amber-400 gap-1 bg-amber-50 px-3 py-1 rounded-full border border-amber-100">
                                        <Star size={16} fill="currentColor" />
                                        <span className="text-sm font-bold text-amber-700">{product.rating}</span>
                                    </div>
                                    <span className="text-earth/40 text-sm font-medium">{product.reviews} verified reviews</span>
                                </div>

                                <p className="text-lg text-earth/70 leading-relaxed font-light">{product.description}</p>
                            </div>

                            <div className="h-px bg-stone-200" />

                            {/* Options */}
                            <div className="space-y-6">
                                {/* Weight Selection */}
                                <div>
                                    <label className="block text-sm font-bold text-earth/80 uppercase tracking-wider mb-3">Select Weight</label>
                                    <div className="flex flex-wrap gap-3">
                                        {(product.weights || ['Standard']).map(w => (
                                            <button
                                                key={w}
                                                onClick={() => setSelectedWeight(w)}
                                                className={`px-6 py-3 rounded-xl border-2 transition-all font-medium ${selectedWeight === w
                                                        ? 'border-leaf bg-leaf/10 text-leaf shadow-sm'
                                                        : 'border-stone-200 text-earth/60 hover:border-leaf/30 hover:bg-stone-50'
                                                    }`}
                                            >
                                                {w}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Quantity */}
                                <div>
                                    <label className="block text-sm font-bold text-earth/80 uppercase tracking-wider mb-3">Quantity</label>
                                    <div className="flex items-center gap-4 bg-white border border-stone-200 rounded-xl w-max p-1 shadow-sm">
                                        <button
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-stone-100 text-earth/60 transition-colors"
                                        >
                                            <Minus size={18} />
                                        </button>
                                        <span className="w-8 text-center font-bold text-lg text-earth">{quantity}</span>
                                        <button
                                            onClick={() => setQuantity(quantity + 1)}
                                            className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-stone-100 text-earth/60 transition-colors"
                                        >
                                            <Plus size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-6 pt-4">
                                <div>
                                    <p className="text-sm text-earth/40 font-medium mb-1">Total Price</p>
                                    <p className="text-4xl font-serif font-bold text-earth">₹{product.price * quantity}</p>
                                </div>
                                <Button className="flex-1 h-16 text-lg relative group overflow-hidden" onClick={handleAddToCart}>
                                    <span className="relative z-10 flex items-center justify-center gap-2">
                                        Add to Cart <ShoppingBag size={20} />
                                    </span>
                                </Button>
                            </div>

                            {/* Features */}
                            <div className="grid grid-cols-2 gap-4 pt-8">
                                <div className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-stone-100 shadow-sm">
                                    <div className="w-10 h-10 bg-leaf/10 rounded-full flex items-center justify-center text-leaf">
                                        <Leaf size={20} />
                                    </div>
                                    <div>
                                        <p className="font-bold text-earth text-sm">100% Organic</p>
                                        <p className="text-xs text-earth/50">Certified Natural</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-stone-100 shadow-sm">
                                    <div className="w-10 h-10 bg-leaf/10 rounded-full flex items-center justify-center text-leaf">
                                        <Truck size={20} />
                                    </div>
                                    <div>
                                        <p className="font-bold text-earth text-sm">Free Shipping</p>
                                        <p className="text-xs text-earth/50">On orders over ₹999</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </PageWrapper>
    );
};

export default ProductDetails;
