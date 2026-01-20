import axios from 'axios';

const api = axios.create({
    baseURL: 'https://essence-backend-ggxt.onrender.com/api', // Production URL
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add valid token to requests if available
api.interceptors.request.use((config) => {
    const storedUser = localStorage.getItem('essence_customer');
    if (storedUser) {
        const user = JSON.parse(storedUser);
        if (user.token) {
            config.headers.Authorization = `Bearer ${user.token}`;
        }
    }
    return config;
});

export default api;
