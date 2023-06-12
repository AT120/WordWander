import React from 'react';
import { Navbar, Nav} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import logo from './favicon.ico'
import { useEffect, useState } from 'react';
import { authApi, checkAuth } from '../../api/api';
import { useNavigate } from "react-router-dom";

function Navigation() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const handleClick = () =>{
    authApi.logout().then(response=>
      navigate('/login', {state:{
        login:"",
        password:"",
        logedIn:false
    }})
      )
  }
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
    }, [window.location.pathname]);
    
  return (
    
    <Navbar   fixed="top" bg="dark" expand="lg">
      <Navbar.Brand href="/" style={{marginLeft:'20px'}}>
      <img
          src={logo}
          height="30"
          className="d-inline-block align-top"
          alt="Logo"
        />
      </Navbar.Brand>
      <Navbar.Toggle style={{marginRight:'20px'}} className="navbar-dark" aria-controls="navbar-nav" />
      <Navbar.Collapse id="navbar-nav">
        <Nav  className="mr-auto ">
          { isAuthenticated &&
          <NavLink className="nav-link"  to="/list" style={{color:'white', marginLeft:'15px'}}>Мои книги</NavLink>
          }
          { !isAuthenticated &&
          <>
          <NavLink className="nav-link" to="/login" style={{color:'white', marginLeft:'15px'}}>Логин</NavLink>
          <NavLink className="nav-link" to="/registration" style={{color:'white', marginLeft:'15px'}}>Регистрация</NavLink>
          </>
          }
                  {
          isAuthenticated &&
          <NavLink className="nav-link my-sm-0"  style={{color:'white', marginLeft:'15px'}} onClick={handleClick}>Выйти</NavLink>
        } 
        </Nav>
 
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Navigation;