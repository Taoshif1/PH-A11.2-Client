import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({ children }) => {
    
    const { user, loading } = useAuth();
    const location = useLocation();    
    
    // loading ? <span className="loading loading-spinner loading-lg"></span> : 
    if(loading){
        return <span className="loading loading-spinner loading-lg"></span>;
    }
    
    return (

        !user ? <Navigate to="/login" state={{ from: location }} replace ></Navigate> : children

    );
};

export default PrivateRoute;