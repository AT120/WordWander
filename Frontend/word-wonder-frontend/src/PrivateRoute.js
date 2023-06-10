// This is used to determine if a user is authenticated and
// if they are allowed to visit the page they navigated to.

// If they are: they proceed to the page
// If not: they are redirected to the login page.
import { useEffect, useState } from 'react';
import React from 'react'
import { Navigate, Route, useLocation, Outlet } from 'react-router-dom'
import { checkAuth } from './Api/api';
import { bookApi } from './Api/api';

const PrivateWrapper = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
  
    useEffect(() => {
      bookApi.getBooks(1, null, null)
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
      return <div>Loading...</div>; // Отображение индикатора загрузки
    }
  
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
  };

    export default PrivateWrapper