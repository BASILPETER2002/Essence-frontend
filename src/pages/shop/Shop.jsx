import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, ChevronDown, Search, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductCard from '../../components/ui/ProductCard';
import PageWrapper from '../../animations/pageWrapper';
import { fadeUp, stagger } from '../../animations/variants';

const Shop = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [priceRange, setPriceRange] = useState(1000);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const PRODUCT_DATA = [
        {
            _id: '1',
            name: 'Wild Forest Honey',
            price: 550,
            image: '/assets/products/honey.jpg',
            category: 'Honey',
            rating: 4.8,
            reviews: 128,
            tags: ['Organic', 'Raw'],
            stock: 15
        },
        {
            _id: '2',
            name: 'Wayanad Cardamom',
            price: 850,
            image: '/assets/products/cardamom.jpg',
            category: 'Spices',
            rating: 4.9,
            reviews: 85,
            tags: ['Premium', 'Aromatic'],
            stock: 10
        },
        {
            _id: '3',
            name: 'Black Pepper',
            price: 400,
            image: '/assets/products/pepper.jpg',
            category: 'Spices',
            rating: 4.7,
            reviews: 92,
            tags: ['Spicy', 'Fresh'],
            stock: 25
        },
        {
            _id: '4',
            name: 'Instant Mushroom Soup',
            price: 150,
            image: '/assets/products/soup.jpg',
            category: 'Instant',
            rating: 4.6,
            reviews: 45,
            tags: ['Quick', 'Tasty'],
            stock: 30
        }
    ];

    const categories = ['All', 'Honey', 'Spices', 'Instant', 'Oils'];

    const filteredProducts = useMemo(() => {
        return PRODUCT_DATA.filter(product => {
            const matchCategory = selectedCategory === 'All' || product.category === selectedCategory;
            const matchPrice = product.price <= priceRange;
            const matchSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
            return matchCategory && matchPrice && matchSearch;
        });
    }, [selectedCategory, priceRange, searchQuery]);

    return (
        <PageWrapper>
            <div className="pt-24 pb-20 min-h-screen bg-stone-50">
                {/* Header */}
                <div className="bg-white border-b border-stone-100 py-12 mb-8">
                    <div className="max-w-7xl mx-auto px-6">
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={fadeUp}
                            className="text-center max-w-2xl mx-auto"
                        >
                            <span className="text-leaf uppercase tracking-widest text-xs font-bold mb-3 block">Our Collection</span>
                            <h1 className="text-4xl md:text-5xl font-serif font-bold text-earth mb-4">Curated by Nature</h1>
                            <p className="text-earth/60">Explore our premium selection of organic products, sourced directly from the pristine forests of Wayanad.</p>
                        </motion.div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Filters - Desktop */}
                        <div className="hidden lg:block w-64 flex-shrink-0">
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 sticky top-28">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="font-serif font-bold text-lg text-earth">Filters</h3>
                                    <Filter size={18} className="text-earth/40" />
                                </div>

                                {/* Categories */}
                                <div className="mb-8">
                                    <h4 className="text-sm font-bold text-earth/80 uppercase tracking-wider mb-4">Categories</h4>
                                    <div className="space-y-2">
                                        {categories.map(cat => (
                                            <button
                                                key={cat}
                                                onClick={() => setSelectedCategory(cat)}
                                                className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${selectedCategory === cat
                                                        ? 'bg-leaf/10 text-leaf font-medium'
                                                        : 'text-earth/60 hover:bg-stone-50 hover:text-earth'
                                                    }`}
                                            >
                                                {cat}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Price Range */}
                                <div>
                                    <h4 className="text-sm font-bold text-earth/80 uppercase tracking-wider mb-4">Price Range</h4>
                                    <input
                                        type="range"
                                        min="0"
                                        max="2000"
                                        step="50"
                                        value={priceRange}
                                        onChange={(e) => setPriceRange(Number(e.target.value))}
                                        className="w-full accent-leaf mb-2 cursor-pointer"
                                    />
                                    <div className="flex justify-between text-xs text-earth/60 font-medium">
                                        <span>₹0</span>
                                        <span>Max: ₹{priceRange}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Mobile Filter Toggle */}
                        <div className="lg:hidden mb-4">
                            <button
                                onClick={() => setIsFilterOpen(true)}
                                className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-stone-200 text-earth font-medium"
                            >
                                <Filter size={18} />
                                <span>Filters</span>
                            </button>
                        </div>

                        {/* Product Grid */}
                        <div className="flex-1">
                            {/* Search & Sort Bar */}
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                                <div className="relative flex-1 max-w-md">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-earth/40" size={18} />
                                    <input
                                        type="text"
                                        placeholder="Search products..."
                                        className="w-full pl-10 pr-4 py-2.5 bg-white border border-stone-200 rounded-xl focus:outline-none focus:border-leaf/50 focus:ring-2 focus:ring-leaf/10 transition-all"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                                <p className="text-sm text-earth/60">Showing {filteredProducts.length} results</p>
                            </div>

                            {/* Grid */}
                            {filteredProducts.length > 0 ? (
                                <motion.div
                                    variants={stagger}
                                    initial="hidden"
                                    animate="visible"
                                    className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
                                >
                                    {filteredProducts.map((product) => (
                                        <ProductCard key={product._id} product={product} />
                                    ))}
                                </motion.div>
                            ) : (
                                <div className="bg-white rounded-2xl p-12 text-center border border-stone-100">
                                    <div className="w-16 h-16 bg-stone-50 rounded-full flex items-center justify-center mx-auto mb-4 text-stone-400">
                                        <Search size={24} />
                                    </div>
                                    <h3 className="text-lg font-serif font-bold text-earth mb-2">No products found</h3>
                                    <p className="text-earth/60">Try adjusting your filters or search query.</p>
                                    <button
                                        onClick={() => { setSelectedCategory('All'); setPriceRange(2000); setSearchQuery(''); }}
                                        className="mt-4 text-leaf font-medium hover:underline"
                                    >
                                        Clear all filters
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Mobile Filter Drawer */}
                <AnimatePresence>
                    {isFilterOpen && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/20 z-50 lg:hidden"
                            onClick={() => setIsFilterOpen(false)}
                        >
                            <motion.div
                                initial={{ x: '100%' }}
                                animate={{ x: 0 }}
                                exit={{ x: '100%' }}
                                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                                className="absolute right-0 top-0 bottom-0 w-80 bg-white p-6 shadow-2xl"
                                onClick={e => e.stopPropagation()}
                            >
                                <div className="flex items-center justify-between mb-8">
                                    <h3 className="font-serif font-bold text-xl text-earth">Filters</h3>
                                    <button onClick={() => setIsFilterOpen(false)} className="p-2 hover:bg-stone-100 rounded-full">
                                        <X size={24} />
                                    </button>
                                </div>
                                {/* Mobile filter content */}
                                <div className="space-y-6">
                                    <div>
                                        <h4 className="font-bold mb-3">Category</h4>
                                        {categories.map(cat => (
                                            <button
                                                key={cat}
                                                onClick={() => { setSelectedCategory(cat); setIsFilterOpen(false); }}
                                                className={`block w-full text-left py-2 ${selectedCategory === cat ? 'text-leaf font-bold' : ''}`}
                                            >
                                                {cat}
                                            </button>
                                        ))}
                                    </div>
                                    <div>
                                        <h4 className="font-bold mb-3">Price Range</h4>
                                        <input
                                            type="range"
                                            min="0"
                                            max="2000"
                                            step="50"
                                            value={priceRange}
                                            onChange={(e) => setPriceRange(Number(e.target.value))}
                                            className="w-full accent-leaf"
                                        />
                                        <div className="flex justify-between text-sm mt-2">
                                            <span>₹0</span>
                                            <span>Max: ₹{priceRange}</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </PageWrapper>
    );
};

export default Shop;