import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import BookPage from './components/books-list/bookPage';
import { BrowserRouter, Switch, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import LoginPage from './components/login/loginPage';
import PrivateWrapper from './PrivateRoute';
import { checkAuth } from './Api/api';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='login' element={<LoginPage />} />

      <Route element={<PrivateWrapper/>}>
        <Route path='list' element={<BookPage />} />
      </Route>
      
    </Routes>
  </BrowserRouter>,
  
);






