import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth(); // Assuming loading state exists in AuthContext

    if (loading) return <div>Loading...</div>; // Simple loading state

    if (!user || user.role !== 'admin') {
        return <Navigate to="/admin/login" replace />;
    }

    return children;
};

export default AdminRoute;
