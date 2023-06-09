import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import BookPage from './components/books-list/bookPage';
import { BrowserRouter, Switch, Route, Routes } from 'react-router-dom';
import store from './store/listStore';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
    <Route path='list' element={<BookPage />} />
    </Routes>
  </BrowserRouter>,
);






