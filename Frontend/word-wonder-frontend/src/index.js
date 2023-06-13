import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import BookPage from './components/books-list/bookPage';
import 'bootstrap/dist/css/bootstrap.min.css'
import LoginPage from './components/login/loginPage';
import PrivateWrapper from './PrivateRoute';
import RegistrationPage from './components/registration/registrationPage';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Reader from './pages/ReaderPage';
import DocumentMeta from 'react-document-meta';

const root = ReactDOM.createRoot(document.getElementById('root'));
const meta = {
  meta: {
    name: {
      'color-scheme': 'light dark'
    }
  }
}

root.render(
  <DocumentMeta {...meta}>
    <BrowserRouter>
      <Routes>
        <Route path='login' element={<LoginPage />} />
        <Route path='registration' element={<RegistrationPage />} />
        <Route element={<PrivateWrapper />}>
          <Route path='list' element={<BookPage />} />
        </Route>
        <Route path="reader" element={<Reader />} />
      </Routes>
    </BrowserRouter>
  </DocumentMeta>
)
