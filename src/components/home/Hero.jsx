import { motion } from 'framer-motion';
import { ArrowRight, Leaf, Star, Shield, Truck } from 'lucide-react';
import Button from '../../components/ui/Button';
import { Link } from 'react-router-dom';

const Hero = () => {
    const features = [
        { icon: Leaf, label: '100% Organic', color: 'text-primary-500' },
        { icon: Shield, label: 'Quality Guaranteed', color: 'text-success' },
        { icon: Truck, label: 'Free Shipping', color: 'text-secondary-500' },
        { icon: Star, label: '5★ Rated', color: 'text-warning' },
    ];

    return (
        <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-b from-primary-50/50 to-white">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-grain opacity-5" />
            <div className="absolute top-0 left-0 w-96 h-96 bg-primary-100 rounded-full blur-3xl opacity-20 -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary-100 rounded-full blur-3xl opacity-20 translate-x-1/3 translate-y-1/3" />
            
            {/* Animated Floating Elements */}
            <motion.div
                animate={{ y: [0, -30, 0] }}
                transition={{ duration: 8, repeat: Infinity }}
                className="absolute top-1/4 left-10 w-20 h-20 bg-white/10 backdrop-blur-sm rounded-3xl rotate-45 border border-white/20"
            />
            <motion.div
                animate={{ y: [0, 30, 0] }}
                transition={{ duration: 6, repeat: Infinity, delay: 1 }}
                className="absolute bottom-1/4 right-20 w-16 h-16 bg-secondary-100/30 backdrop-blur-sm rounded-2xl rotate-12 border border-secondary-200/30"
            />

            <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center relative z-10 pt-20">
                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center lg:text-left"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-primary-200 rounded-full mb-8 shadow-soft"
                    >
                        <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse" />
                        <span className="text-sm font-medium text-primary-700 tracking-wider">
                            NATURE'S FINEST SELECTION
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold tracking-tight mb-8"
                    >
                        <span className="bg-gradient-to-r from-primary-600 to-secondary-500 bg-clip-text text-transparent">
                            Taste Pure
                        </span>
                        <br />
                        <span className="text-neutral-900">Essence</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-lg md:text-xl text-neutral-600 mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed"
                    >
                        From the misty hills of Wayanad to your home. Experience authentic flavors, 
                        sustainably sourced and crafted with care.
                    </motion.p>

                    {/* Features Grid */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
                    >
                        {features.map((feature, idx) => {
                            const Icon = feature.icon;
                            return (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.6 + idx * 0.1 }}
                                    className="flex flex-col items-center lg:items-start gap-2"
                                >
                                    <div className={`p-2 rounded-xl bg-white shadow-soft ${feature.color}`}>
                                        <Icon size={20} />
                                    </div>
                                    <span className="text-sm font-medium text-neutral-700">
                                        {feature.label}
                                    </span>
                                </motion.div>
                            );
                        })}
                    </motion.div>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className="flex flex-col sm:flex-row items-center gap-4"
                    >
                        <Link to="/shop" className="w-full sm:w-auto">
                            <Button className="w-full h-14 px-10 text-lg rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/40 transition-all duration-300 group">
                                <span>Explore Collection</span>
                                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                        <Link to="/story" className="w-full sm:w-auto">
                            <Button 
                                variant="outline" 
                                className="w-full h-14 px-8 text-lg rounded-xl border-2 border-primary-200 hover:border-primary-300 hover:bg-primary-50/50 text-primary-700"
                            >
                                Discover Story
                            </Button>
                        </Link>
                    </motion.div>
                </motion.div>

                {/* Product Showcase */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="relative"
                >
                    <div className="relative perspective-1000">
                        {/* Main Product Card */}
                        <motion.div
                            whileHover={{ rotateY: -10, rotateX: 5 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            className="relative bg-white rounded-3xl shadow-hard p-8 border border-neutral-100"
                        >
                            {/* Product Image */}
                            <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary-50 to-secondary-50 mb-6 overflow-hidden group">
                                <div className="w-full h-full flex items-center justify-center">
                                    <div className="relative w-64 h-64">
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                                            className="absolute inset-0 border-2 border-dashed border-primary-200/50 rounded-full"
                                        />
                                        <div className="absolute inset-8 flex items-center justify-center">
                                            <Leaf size={120} className="text-primary-400/30" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Product Info */}
                            <div className="text-center">
                                <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary-50 rounded-full mb-3">
                                    <span className="text-xs font-semibold text-primary-700">PREMIUM</span>
                                </div>
                                <h3 className="text-2xl font-serif font-bold text-neutral-900 mb-2">
                                    Wild Forest Honey
                                </h3>
                                <p className="text-neutral-500 mb-4">
                                    Raw, unfiltered honey from deep forests
                                </p>
                                <div className="flex items-center justify-center gap-2 mb-6">
                                    <div className="flex text-amber-400">
                                        {[1, 2, 3, 4, 5].map(i => (
                                            <Star key={i} size={16} fill="currentColor" />
                                        ))}
                                    </div>
                                    <span className="text-sm text-neutral-400">(4.9/5)</span>
                                </div>
                                <div className="text-3xl font-bold text-primary-600">₹550</div>
                            </div>

                            {/* Floating Badges */}
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 4, repeat: Infinity }}
                                className="absolute -top-4 -left-4 bg-white p-3 rounded-xl shadow-medium border border-neutral-100"
                            >
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                                    <span className="text-xs font-medium text-neutral-700">In Stock</span>
                                </div>
                            </motion.div>

                            <motion.div
                                animate={{ y: [0, -15, 0] }}
                                transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
                                className="absolute -top-4 -right-4 bg-white p-3 rounded-xl shadow-medium border border-neutral-100"
                            >
                                <div className="text-center">
                                    <div className="text-xs font-medium text-neutral-500">Origin</div>
                                    <div className="text-sm font-bold text-primary-600">Wayanad</div>
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* Floating Background Elements */}
                        <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-gradient-to-br from-secondary-100 to-secondary-200 rounded-3xl -z-10 blur-xl opacity-50" />
                        <div className="absolute -top-6 -left-6 w-32 h-32 bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl -z-10 blur-xl opacity-50" />
                    </div>

                    {/* Decorative Dots */}
                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
                        {[1, 2, 3, 4, 5].map(i => (
                            <div
                                key={i}
                                className={`w-2 h-2 rounded-full ${i === 3 ? 'bg-primary-500' : 'bg-neutral-300'}`}
                            />
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:block"
            >
                <div className="flex flex-col items-center">
                    <span className="text-xs text-neutral-400 mb-2 tracking-wider">SCROLL</span>
                    <div className="w-px h-12 bg-gradient-to-b from-primary-400 to-transparent" />
                </div>
            </motion.div>
        </section>
    );
};

export default Hero;