import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import { Menu, Bell, User, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AdminLayout = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/admin/login');
    };

    return (
        <div className="flex min-h-screen bg-cream">
            <Sidebar />

            <div className="flex-1 flex flex-col">
                {/* Header */}
                <header className="h-20 bg-white/80 backdrop-blur-md border-b border-stone-100 sticky top-0 z-30 px-8 flex items-center justify-between">
                    <h2 className="text-lg font-serif font-semibold text-earth">Dashboard</h2>

                    <div className="flex items-center gap-4">
                        <button className="p-2 relative text-earth/60 hover:text-earth transition-colors rounded-lg hover:bg-stone-50">
                            <Bell size={20} />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
                        </button>

                        <div className="relative">
                            <button
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                                className="flex items-center gap-3 pl-4 border-l border-stone-100 hover:bg-stone-50 p-2 rounded-xl transition-colors"
                            >
                                <div className="text-right hidden sm:block">
                                    <p className="text-sm font-medium text-earth">{user?.name || 'Admin User'}</p>
                                    <p className="text-xs text-earth/50">Super Admin</p>
                                </div>
                                <div className="w-10 h-10 bg-honey/10 rounded-full flex items-center justify-center text-honey border border-honey/20">
                                    <User size={20} />
                                </div>
                            </button>

                            {/* Dropdown */}
                            {isProfileOpen && (
                                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-stone-100 py-2">
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left px-4 py-2 text-red-500 hover:bg-red-50 flex items-center gap-2 text-sm"
                                    >
                                        <LogOut size={16} />
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="p-8 flex-1 overflow-x-hidden">
                    <div className="max-w-6xl mx-auto">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
