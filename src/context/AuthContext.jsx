import { createContext, useContext, useState, useEffect } from 'react';
import api from '../utils/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check local storage on load
        const storedUser = localStorage.getItem('essence_customer');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            setLoading(true);
            const { data } = await api.post('/auth/login', { email, password });
            setUser(data);
            localStorage.setItem('essence_customer', JSON.stringify(data));
            return data;
        } catch (error) {
            console.error(error);
            throw error.response?.data?.message || 'Login failed';
        } finally {
            setLoading(false);
        }
    };

    const register = async (name, email, password) => {
        try {
            setLoading(true);
            const { data } = await api.post('/auth/register', { name, email, password });
            setUser(data);
            localStorage.setItem('essence_customer', JSON.stringify(data));
            return data;
        } catch (error) {
            console.error(error);
            throw error.response?.data?.message || 'Registration failed';
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('essence_customer');
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
