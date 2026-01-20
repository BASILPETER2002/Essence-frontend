import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Leaf, Lock, Mail, ArrowRight } from 'lucide-react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { useAuth } from '../../context/AuthContext';

const AdminLogin = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth(); // Assuming useAuth exposes login

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const email = e.target[0].value;
        const password = e.target[1].value;

        try {
            const user = await login(email, password);
            if (user.role === 'admin') {
                navigate('/admin/dashboard');
            } else {
                setError('Access Denied: Not an admin');
            }
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-cream flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Decor */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
                className="absolute -top-40 -right-40 text-leaf/5"
            >
                <Leaf size={600} />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-md"
            >
                <div className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/50 relative z-10">
                    <div className="text-center mb-8">
                        <motion.img
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                            src="/essence_logo.jpg"
                            alt="Essence"
                            className="h-24 w-auto mx-auto mb-4 object-contain"
                        />
                        <h1 className="text-3xl font-serif text-earth font-bold mb-2">Welcome Back</h1>
                        <p className="text-earth/60">Enter your credentials to access the admin panel</p>
                        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                    </div>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <Input
                            type="email"
                            placeholder="admin@essence.com"
                            label="Email Address"
                            required
                        />
                        <Input
                            type="password"
                            placeholder="••••••••"
                            label="Password"
                            required
                        />

                        <div className="flex items-center justify-between text-sm mb-6">
                            <label className="flex items-center gap-2 cursor-pointer text-earth/70 hover:text-earth">
                                <input type="checkbox" className="accent-leaf rounded" />
                                <span>Remember me</span>
                            </label>
                            <a href="#" className="text-leaf hover:underline font-medium">Forgot Password?</a>
                        </div>

                        <Button
                            type="submit"
                            className="w-full group"
                            isLoading={loading}
                            variant="primary"
                        >
                            <span>Sign In</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </form>

                    <div className="mt-8 text-center text-sm text-earth/40">
                        &copy; {new Date().getFullYear()} Essence Admin Panel
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default AdminLogin;
