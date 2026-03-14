import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../Context/AuthProvider';
import Loader from '../Shared Components/Loader/Loader';
const PrivateRoutes = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();
    if (loading) {
        return <Loader />;
    }
    if (user) {
        return children;
    }
    return <Navigate to="/signin" state={{ from: location }} replace></Navigate>;
};

export default PrivateRoutes;