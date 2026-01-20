import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
    ShoppingBag,
    User,
    Search,
    Menu,
    X,
    ChevronDown,
    Heart,
    Package
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import CartDrawer from '../cart/CartDrawer';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    // Use Global Cart Context
    const { cartCount, setIsCartOpen } = useCart();

    const [wishlistItems] = useState(0); // Wishlist count initialized to 0
    const location = useLocation();
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', path: '/' },
        {
            name: 'Shop', path: '/shop', submenu: [
                { name: 'All Products', path: '/shop' },
                { name: 'Honey Collection', path: '/shop?category=honey' },
                { name: 'Premium Spices', path: '/shop?category=spices' },
                { name: 'Instant Mushrooms', path: '/shop?category=mushrooms' },
            ]
        },
        { name: 'Our Story', path: '/story' },
        { name: 'Contact', path: '/contact' },
    ];

    const userMenu = [
        { name: 'My Profile', path: '/profile', icon: User },
        { name: 'My Orders', path: '/orders', icon: Package },
        { name: 'Wishlist', path: '/wishlist', icon: Heart },
    ];

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                    ? 'bg-white/95 backdrop-blur-xl shadow-soft border-b border-neutral-100 py-3'
                    : 'bg-transparent py-5'
                    }`}
            >
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <Link to="/" className="flex items-center gap-3 group">
                            <img src="/essence_logo.jpg" alt="Essence" className="h-16 w-auto object-contain" />
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center gap-8">
                            {navLinks.map((link) => (
                                <div key={link.name} className="relative group">
                                    <Link
                                        to={link.path}
                                        className={`flex items-center gap-1 font-medium transition-colors ${location.pathname === link.path
                                            ? 'text-primary-600'
                                            : 'text-neutral-700 hover:text-primary-600'
                                            }`}
                                    >
                                        {link.name}
                                        {link.submenu && (
                                            <ChevronDown size={16} className="group-hover:rotate-180 transition-transform" />
                                        )}
                                    </Link>

                                    {/* Submenu */}
                                    {link.submenu && (
                                        <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                            <div className="bg-white rounded-xl shadow-hard border border-neutral-100 p-2 min-w-[200px]">
                                                {link.submenu.map((item) => (
                                                    <Link
                                                        key={item.name}
                                                        to={item.path}
                                                        className="block px-4 py-2 rounded-lg hover:bg-primary-50 text-neutral-700 hover:text-primary-600 transition-colors"
                                                    >
                                                        {item.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-4">
                            {/* Search */}
                            <button
                                onClick={() => setIsSearchOpen(!isSearchOpen)}
                                className="p-2 text-neutral-600 hover:text-primary-600 transition-colors"
                            >
                                <Search size={20} />
                            </button>

                            {/* Wishlist */}
                            <Link to="/wishlist" className="p-2 text-neutral-600 hover:text-primary-600 transition-colors relative">
                                <Heart size={20} />
                                {wishlistItems > 0 && (
                                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                                        {wishlistItems}
                                    </span>
                                )}
                            </Link>

                            {/* Cart */}
                            <button
                                onClick={() => setIsCartOpen(true)}
                                className="p-2 text-neutral-600 hover:text-primary-600 transition-colors relative"
                            >
                                <ShoppingBag size={20} />
                                {cartCount > 0 && (
                                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary-600 text-white text-xs rounded-full flex items-center justify-center animate-bounce">
                                        {cartCount}
                                    </span>
                                )}
                            </button>

                            {/* User/Auth */}
                            {user ? (
                                <div className="relative group">
                                    <button className="flex items-center gap-2 pl-3">
                                        <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                                            {user.name.charAt(0).toUpperCase()}
                                        </div>
                                    </button>

                                    {/* User Dropdown */}
                                    <div className="absolute right-0 top-full pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                        <div className="bg-white rounded-xl shadow-hard border border-neutral-100 p-2 min-w-[200px]">
                                            <div className="px-4 py-3 border-b border-neutral-100">
                                                <p className="font-medium text-neutral-900">{user.name}</p>
                                                <p className="text-sm text-neutral-500">{user.email}</p>
                                            </div>
                                            {userMenu.map((item) => {
                                                const Icon = item.icon;
                                                return (
                                                    <Link
                                                        key={item.name}
                                                        to={item.path}
                                                        className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-primary-50 text-neutral-700 hover:text-primary-600 transition-colors"
                                                    >
                                                        <Icon size={16} />
                                                        {item.name}
                                                    </Link>
                                                );
                                            })}
                                            <button
                                                onClick={logout}
                                                className="w-full text-left px-4 py-2 rounded-lg hover:bg-red-50 text-red-600 transition-colors mt-2"
                                            >
                                                Sign Out
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <Link
                                    to="/login"
                                    className="px-5 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-primary-500/25 transition-all duration-300"
                                >
                                    Sign In
                                </Link>
                            )}

                            {/* Mobile Menu Toggle */}
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="md:hidden p-2 text-neutral-600"
                            >
                                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>

                    {/* Search Bar */}
                    <AnimatePresence>
                        {isSearchOpen && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                            >
                                <div className="pt-4">
                                    <div className="relative">
                                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={20} />
                                        <input
                                            type="text"
                                            placeholder="Search products, categories, brands..."
                                            className="w-full pl-12 pr-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
                                            autoFocus
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="md:hidden bg-white/95 backdrop-blur-xl border-t border-neutral-100 overflow-hidden"
                        >
                            <div className="max-w-7xl mx-auto px-6 py-6">
                                <div className="space-y-4">
                                    {navLinks.map((link) => (
                                        <div key={link.name}>
                                            <Link
                                                to={link.path}
                                                className="block py-3 text-lg font-medium text-neutral-900 hover:text-primary-600 transition-colors"
                                                onClick={() => setIsMobileMenuOpen(false)}
                                            >
                                                {link.name}
                                            </Link>
                                            {link.submenu && (
                                                <div className="pl-4 space-y-2 mt-2">
                                                    {link.submenu.map((item) => (
                                                        <Link
                                                            key={item.name}
                                                            to={item.path}
                                                            className="block py-2 text-neutral-600 hover:text-primary-600 transition-colors"
                                                            onClick={() => setIsMobileMenuOpen(false)}
                                                        >
                                                            {item.name}
                                                        </Link>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.nav>

            {/* Cart Drawer */}
            <CartDrawer />
        </>
    );
};

export default Navbar;