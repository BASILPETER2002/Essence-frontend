import { Link } from 'react-router-dom';
import { 
    Mail, 
    Phone, 
    MapPin, 
    Instagram, 
    Facebook, 
    Twitter, 
    Youtube,
    Leaf,
    Truck,
    Shield,
    CreditCard
} from 'lucide-react';
import { useState } from 'react';

const Footer = () => {
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (email) {
            setSubscribed(true);
            setTimeout(() => {
                setSubscribed(false);
                setEmail('');
            }, 3000);
        }
    };

    const quickLinks = [
        { name: 'Shop All', path: '/shop' },
        { name: 'New Arrivals', path: '/shop/new' },
        { name: 'Best Sellers', path: '/shop/bestsellers' },
        { name: 'Gift Cards', path: '/gift-cards' },
    ];

    const companyLinks = [
        { name: 'Our Story', path: '/story' },
        { name: 'Sustainability', path: '/sustainability' },
        { name: 'Careers', path: '/careers' },
        { name: 'Press', path: '/press' },
    ];

    const supportLinks = [
        { name: 'Contact Us', path: '/contact' },
        { name: 'FAQs', path: '/faq' },
        { name: 'Shipping Info', path: '/shipping' },
        { name: 'Returns & Exchanges', path: '/returns' },
    ];

    const socialLinks = [
        { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
        { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
        { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
        { icon: Youtube, href: 'https://youtube.com', label: 'YouTube' },
    ];

    const trustBadges = [
        { icon: Leaf, label: '100% Organic Certified' },
        { icon: Shield, label: 'Quality Guaranteed' },
        { icon: Truck, label: 'Free Shipping Over ₹999' },
        { icon: CreditCard, label: 'Secure Payments' },
    ];

    return (
        <footer className="bg-gradient-to-b from-white to-neutral-50 border-t border-neutral-100">
            {/* Newsletter Section */}
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-8 md:p-12 border border-primary-100">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/50 rounded-full mb-4">
                                <Mail size={16} className="text-primary-600" />
                                <span className="text-sm font-medium text-primary-700">STAY UPDATED</span>
                            </div>
                            <h3 className="text-3xl font-serif font-bold text-neutral-900 mb-3">
                                Join Our Newsletter
                            </h3>
                            <p className="text-neutral-600">
                                Get exclusive offers, new product launches, and wellness tips directly in your inbox.
                            </p>
                        </div>
                        
                        <form onSubmit={handleSubscribe} className="relative">
                            <div className="flex flex-col sm:flex-row gap-3">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Your email address"
                                    className="flex-1 px-6 py-4 rounded-xl border border-neutral-200 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 bg-white"
                                    required
                                />
                                <button
                                    type="submit"
                                    className="px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-primary-500/25 transition-all duration-300 whitespace-nowrap"
                                >
                                    {subscribed ? 'Subscribed!' : 'Subscribe'}
                                </button>
                            </div>
                            {subscribed && (
                                <div className="absolute -bottom-8 left-0 text-sm text-success">
                                    ✅ Welcome to the Essence family!
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>

            {/* Main Footer */}
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    
                    {/* Brand Column */}
                    <div>
                        <Link to="/" className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center text-white">
                                <span className="font-serif font-bold text-2xl">E</span>
                            </div>
                            <div>
                                <h2 className="font-serif text-2xl font-bold text-primary-700">Essence</h2>
                                <p className="text-sm text-neutral-500 tracking-wider">NATURE'S FINEST</p>
                            </div>
                        </Link>
                        <p className="text-neutral-600 mb-6">
                            Bringing you the purest natural products from the heart of India. 
                            Authentic, organic, and crafted with care since 2020.
                        </p>
                        <div className="flex gap-3">
                            {socialLinks.map((social, idx) => {
                                const Icon = social.icon;
                                return (
                                    <a
                                        key={idx}
                                        href={social.href}
                                        className="w-10 h-10 bg-white border border-neutral-200 rounded-xl flex items-center justify-center text-neutral-600 hover:text-primary-600 hover:border-primary-300 hover:shadow-sm transition-all"
                                        aria-label={social.label}
                                    >
                                        <Icon size={18} />
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-serif text-lg font-bold text-neutral-900 mb-6">Shop</h3>
                        <ul className="space-y-3">
                            {quickLinks.map((link) => (
                                <li key={link.name}>
                                    <Link 
                                        to={link.path}
                                        className="text-neutral-600 hover:text-primary-600 transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h3 className="font-serif text-lg font-bold text-neutral-900 mb-6">Company</h3>
                        <ul className="space-y-3">
                            {companyLinks.map((link) => (
                                <li key={link.name}>
                                    <Link 
                                        to={link.path}
                                        className="text-neutral-600 hover:text-primary-600 transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="font-serif text-lg font-bold text-neutral-900 mb-6">Support</h3>
                        <ul className="space-y-3">
                            {supportLinks.map((link) => (
                                <li key={link.name}>
                                    <Link 
                                        to={link.path}
                                        className="text-neutral-600 hover:text-primary-600 transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Trust Badges */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 pt-8 border-t border-neutral-100">
                    {trustBadges.map((badge, idx) => {
                        const Icon = badge.icon;
                        return (
                            <div key={idx} className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center text-primary-600">
                                    <Icon size={20} />
                                </div>
                                <span className="text-sm font-medium text-neutral-700">{badge.label}</span>
                            </div>
                        );
                    })}
                </div>

                {/* Contact Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 pt-8 border-t border-neutral-100">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center text-primary-600">
                            <MapPin size={20} />
                        </div>
                        <div>
                            <h4 className="font-medium text-neutral-900 mb-1">Visit Us</h4>
                            <p className="text-sm text-neutral-600">
                                Kizhakkenparambil House,<br />
                                Kuppadi PO, Sulthanbathery
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center text-primary-600">
                            <Mail size={20} />
                        </div>
                        <div>
                            <h4 className="font-medium text-neutral-900 mb-1">Email Us</h4>
                            <a 
                                href="mailto:essencemakeinindia@gmail.com"
                                className="text-sm text-neutral-600 hover:text-primary-600 transition-colors"
                            >
                                essencemakeinindia@gmail.com
                            </a>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center text-primary-600">
                            <Phone size={20} />
                        </div>
                        <div>
                            <h4 className="font-medium text-neutral-900 mb-1">Call Us</h4>
                            <a 
                                href="tel:+918281094184"
                                className="text-sm text-neutral-600 hover:text-primary-600 transition-colors"
                            >
                                +91 82810 94184
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-neutral-100">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="text-center md:text-left">
                            <p className="text-sm text-neutral-500">
                                &copy; {new Date().getFullYear()} Essence Natural Products. All rights reserved.
                            </p>
                            <p className="text-xs text-neutral-400 mt-1">
                                Made with ❤️ in Wayanad, India
                            </p>
                        </div>
                        
                        <div className="flex items-center gap-6 text-sm text-neutral-500">
                            <Link to="/privacy" className="hover:text-primary-600 transition-colors">
                                Privacy Policy
                            </Link>
                            <Link to="/terms" className="hover:text-primary-600 transition-colors">
                                Terms of Service
                            </Link>
                            <Link to="/cookies" className="hover:text-primary-600 transition-colors">
                                Cookie Policy
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;