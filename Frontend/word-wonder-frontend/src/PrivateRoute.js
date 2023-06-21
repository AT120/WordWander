
import { useEffect, useState } from 'react';
import React from 'react'
import { Navigate, Route, useLocation, Outlet } from 'react-router-dom'
import { checkAuth } from './api/api';
import { Spinner } from 'react-bootstrap';


const PrivateWrapper = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
  
    useEffect(() => {
      checkAuth.checkLogin()
        .then(data => {
          setIsAuthenticated(data);
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
    if(props.needAuth){
      return isAuthenticated!=false ? <Outlet context={isAuthenticated}/> : <Navigate to="/login" />;
    }
    else{
      return !isAuthenticated ? <Outlet/> : <Navigate to="/list" />;
    }
  };

    export default PrivateWrapper