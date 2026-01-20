import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductCard from '../ui/ProductCard';

const FeaturedProducts = () => {
    const products = [
        {
            id: 1,
            name: 'Wild Forest Honey',
            category: 'Honey',
            price: 550,
            description: 'Raw, unfiltered honey collected from deep forests of Wayanad.',
            stock: 15,
            image: '/assets/products/honey.jpg'
        },
        {
            id: 2,
            name: 'Premium Cardamom',
            category: 'Spices',
            price: 850,
            description: 'Handpicked green cardamom pods with intense aroma.',
            stock: 10,
            image: '/assets/products/cardamom.jpg'
        },
        {
            id: 3,
            name: 'Black Pepper',
            category: 'Spices',
            price: 400,
            description: 'Export quality black pepper corns from Kerala.',
            stock: 25,
            image: '/assets/products/pepper.jpg'
        },
    ];

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">
                        Featured Products
                    </h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Discover our most popular natural products, loved by customers across India
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {products.map((product, index) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            index={index}
                        />
                    ))}
                </div>

                <div className="text-center">
                    <Link
                        to="/shop"
                        className="inline-flex items-center gap-2 px-8 py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors group"
                    >
                        <span>View All Products</span>
                        <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default FeaturedProducts;