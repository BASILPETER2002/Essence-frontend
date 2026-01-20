import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Leaf, ArrowRight } from 'lucide-react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { useAuth } from '../../context/AuthContext';
import CustomerLayout from '../../components/layout/CustomerLayout';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/shop';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API delay
        setTimeout(() => {
            login(formData.email, formData.password);
            setIsLoading(false);
            navigate(from, { replace: true });
        }, 1000);
    };

    return (
        <CustomerLayout>
            <div className="pt-32 pb-20 px-6 min-h-[80vh] flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-md"
                >
                    <div className="bg-white p-8 rounded-3xl border border-stone-100 shadow-xl">
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-serif font-bold text-earth mb-2">Welcome Back</h1>
                            <p className="text-earth/60">Sign in to continue your natural journey.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <Input
                                label="Email Address"
                                type="email"
                                placeholder="you@example.com"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                            />
                            <Input
                                label="Password"
                                type="password"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                required
                            />

                            <div className="text-right">
                                <a href="#" className="text-sm text-leaf hover:underline">Forgot password?</a>
                            </div>

                            <Button type="submit" className="w-full" isLoading={isLoading}>
                                Sign In <ArrowRight size={18} />
                            </Button>
                        </form>

                        <div className="mt-8 text-center text-sm text-earth/60">
                            Don't have an account?{' '}
                            <Link to="/register" className="text-leaf font-bold hover:underline">
                                Create one
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        </CustomerLayout>
    );
};

export default Login;
