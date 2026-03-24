import { Navigate, useLocation } from "react-router-dom";
import Loader from "../Shared Components/Loader/Loader";
import useAdmin from "../Context/useAdmin";
import useAuth from "../Context/UseAuth";

const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const [isAdmin, isAdminLoading] = useAdmin();
    const location = useLocation();
    if (loading || isAdminLoading) {
        return <div className="min-h-screen flex justify-center items-center">
            <Loader></Loader>
        </div>;
    }

    if (user && isAdmin) {
        return children;
    }

    return <Navigate to="/" state={{ from: location }} replace></Navigate>;
};

export default AdminRoute;