import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import BookPage from './components/books-list/bookPage';
import { BrowserRouter, Switch, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import LoginPage from './components/login/loginPage';
import PrivateWrapper from './PrivateRoute';
import { checkAuth } from './Api/api';
import RegistrationPage from './components/registration/registrationPage';
import Navigation from './components/common/Navigation';
import Footer from './components/common/Footer';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <Navigation />
    <div style={{ marginTop: '60px' }}>
    <Routes>
      <Route  path='login' element={<LoginPage />} />
      <Route path='registration' element={<RegistrationPage />} />
      <Route element={<PrivateWrapper/>}>
        <Route path='list' element={<BookPage />} />
      </Route>
    </Routes>
    </div>
    <Footer/>
  </BrowserRouter>,
  
);






