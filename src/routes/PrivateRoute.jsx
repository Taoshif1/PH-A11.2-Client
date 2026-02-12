import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { Navigate, useLocation } from 'react-router';
import LifeStreamLoader from '../components/LifeStreamLoader';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();    
    console.log("Location ", location);
    
    // loading ? <span className="loading loading-spinner loading-lg"></span> : 
    if(loading){
        return (
            <div className="flex justify-center items-center h-screen">
                <LifeStreamLoader></LifeStreamLoader>
            </div>
        );
    }
    
    if (!user) {
        // We pass the entire location object as 'from'
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

export default PrivateRoute;