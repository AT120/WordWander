import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import logo from './favicon.ico'
function Navigation() {
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
        <Nav className="ml-auto" >
          <Nav.Link href="/list" style={{color:'white', marginLeft:'5px'}}>Мои книги</Nav.Link>
          <Nav.Link href="/login" style={{color:'white', marginLeft:'5px'}}>Логин</Nav.Link>
          <Nav.Link href="/registration" style={{color:'white', marginLeft:'5px'}}>Регистрация</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Navigation;