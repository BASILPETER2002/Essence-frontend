import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { useAuth } from '../../context/AuthContext';
import CustomerLayout from '../../components/layout/CustomerLayout';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [isLoading, setIsLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        setTimeout(() => {
            register(formData.name, formData.email, formData.password);
            setIsLoading(false);
            navigate('/shop');
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
                            <h1 className="text-3xl font-serif font-bold text-earth mb-2">Create Account</h1>
                            <p className="text-earth/60">Join the Essence community today.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <Input
                                label="Full Name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                            />
                            <Input
                                label="Email Address"
                                type="email"
                                placeholder="you@example.com"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                            />
                            <Input
                                label="Create Password"
                                type="password"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                required
                            />

                            <Button type="submit" className="w-full" isLoading={isLoading}>
                                Create Account <ArrowRight size={18} />
                            </Button>
                        </form>

                        <div className="mt-8 text-center text-sm text-earth/60">
                            Already have an account?{' '}
                            <Link to="/login" className="text-leaf font-bold hover:underline">
                                Sign in
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        </CustomerLayout>
    );
};

export default Register;
