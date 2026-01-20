import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';
import {
    LayoutDashboard,
    Package,
    ShoppingBag,
    Users,
    Settings,
    LogOut,
    Leaf
} from 'lucide-react';
import clsx from 'clsx';

const Sidebar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { logout } = useAuth();

    const menuItems = [
        { icon: LayoutDashboard, label: 'Overview', path: '/admin/dashboard' },
        { icon: Package, label: 'Products', path: '/admin/products' },
        { icon: ShoppingBag, label: 'Orders', path: '/admin/orders' },
        { icon: Users, label: 'Customers', path: '/admin/customers' },
        { icon: Settings, label: 'Settings', path: '/admin/settings' },
    ];

    const SidebarItem = ({ item }) => {
        const isActive = location.pathname === item.path;
        const Icon = item.icon;

        return (
            <Link to={item.path} className="block mb-2">
                <div className="relative overflow-hidden group">
                    <motion.div
                        className={clsx(
                            "flex items-center gap-3 px-4 py-3 rounded-xl transition-colors relative z-10",
                            isActive ? "text-white" : "text-earth/70 hover:text-earth"
                        )}
                        whileHover={{ x: 4 }}
                    >
                        <Icon size={20} />
                        <span className="font-medium">{item.label}</span>
                    </motion.div>

                    {/* Active Background (Animated) */}
                    {isActive && (
                        <motion.div
                            layoutId="sidebar-active"
                            className="absolute inset-0 bg-leaf rounded-xl z-0"
                            initial={false}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                    )}

                    {/* Hover Background (Subtle) */}
                    {!isActive && (
                        <div className="absolute inset-0 bg-stone-100 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity z-0" />
                    )}
                </div>
            </Link>
        );
    };

    return (
        <div className="w-64 bg-white border-r border-stone-200 h-screen sticky top-0 flex flex-col p-6 shadow-sm">
            <div className="mb-10 px-2">
                <img src="/essence_logo.jpg" alt="Essence" className="h-16 w-auto object-contain" />
            </div>

            {/* Navigation */}
            <nav className="flex-1">
                {menuItems.map((item) => (
                    <SidebarItem key={item.path} item={item} />
                ))}
            </nav>

            {/* Logout */}
            <button
                onClick={() => {
                    logout();
                    navigate('/admin/login');
                }}
                className="flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors mt-auto group"
            >
                <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
                <span className="font-medium">Logout</span>
            </button>
        </div>
    );
};

export default Sidebar;
