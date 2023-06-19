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
    window.location.reload();
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
        <Nav className='d-flex flex-md-row flex-column flex-grow-1'>
          { isAuthenticated &&
          <NavLink className="nav-link ms-3"  to="/list" style={{color:'white'}}>Мои книги</NavLink>
          }
          { !isAuthenticated &&
          <>
          <NavLink className="nav-link ms-3" to="/login" style={{color:'white'}}>Логин</NavLink>
          <NavLink className="nav-link ms-3" to="/registration" style={{color:'white'}}>Регистрация</NavLink>
          </>
          }
                  {
          isAuthenticated &&
          <NavLink className="nav-link ms-3 ms-lg-auto me-lg-3"  style={{color:'white'}} onClick={handleClick}>Выйти</NavLink>
        } 
        </Nav>
 
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Navigation;