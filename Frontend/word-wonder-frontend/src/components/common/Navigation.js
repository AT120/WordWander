import React from 'react';
import { Navbar, Nav} from 'react-bootstrap';
import { NavLink, useOutletContext } from 'react-router-dom';
import logo from './favicon.ico'
import { useEffect, useState } from 'react';
import { authApi, checkAuth } from '../../api/api';
import { useNavigate } from "react-router-dom";
import InvitationDropdown from './Invitation-dropdown';
import { Provider } from 'react-redux';
import invitationStore from '../../store/invitationStore';

function Navigation() {
  const [isLoading, setIsLoading] = useState(true);
  const role = useOutletContext()
  const [isAuthenticated, setIsAuthenticated] = useState(role!=undefined);
  const navigate = useNavigate();
  const handleClick = async () => {
    await authApi.logout().then(response=>
      navigate('/login', {state:{
        login:"",
        password:"",
        logedIn:false
    }})
    )
    window.location.reload();
  }
    useEffect( () => {
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
    <Provider store={invitationStore}>
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
        <Nav className='d-flex flex-lg-row flex-column flex-grow-1'>

          { isAuthenticated &&
          <>
          <NavLink className="nav-link ms-3"  to="/list" style={{color:'white'}}>Мои книги</NavLink>
          <NavLink className="nav-link ms-3"  to="/dictionary" style={{color:'white'}}>Словарь</NavLink>
          <NavLink className="nav-link ms-3"  to="/groups" style={{color:'white'}}>Группы</NavLink>
          </>
          }
          { isAuthenticated &&
          <InvitationDropdown/>
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
    </Provider>
  );
}

export default Navigation;