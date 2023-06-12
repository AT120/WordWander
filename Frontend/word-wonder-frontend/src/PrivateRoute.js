
import { useEffect, useState } from 'react';
import React from 'react'
import { Navigate, Route, useLocation, Outlet } from 'react-router-dom'
import { checkAuth } from './Api/api';
import { Spinner } from 'react-bootstrap';


const PrivateWrapper = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
  
    useEffect(() => {
      checkAuth.checkLogin()
        .then(data => {
          setIsAuthenticated(data !== undefined);
          setIsLoading(false);
        })
        .catch(error => {
          console.error(error);
          setIsAuthenticated(false);
          setIsLoading(false);
        });
    }, []);
  
    if (isLoading) {
      return (
        <div className="d-flex justify-content-center align-items-center ">
          <Spinner animation="border" variant="primary" />
        </div>
      );
    }
  
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
  };

    export default PrivateWrapper