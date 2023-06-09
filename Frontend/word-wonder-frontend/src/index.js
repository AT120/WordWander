import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import BookPage from './components/books-list/bookPage';
import 'bootstrap/dist/css/bootstrap.min.css'
import LoginPage from './components/login/loginPage';
import PrivateWrapper from './PrivateRoute';
import RegistrationPage from './components/registration/registrationPage';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Reader from './pages/reader/ReaderPage';
import Dictionary from './components/dictionary/dictionary';
import GroupsPage from './pages/groups/GroupsPage';
import GroupMemberInfo from './components/group-member-info/groupMemberInfo';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <Routes >
      <Route element={<PrivateWrapper needAuth={false}/>}>
        <Route path='/' element={<Navigate to='/login' />} />
        <Route path='login' element={<LoginPage />} />
        <Route path='registration' element={<RegistrationPage />} />
      </Route>
      <Route element={<PrivateWrapper needAuth={true}/>}>
        <Route path='list' element={<BookPage/>} />
        <Route path='dictionary' element={<Dictionary />} />
        <Route path='member-info' element={<GroupMemberInfo />} />
        <Route path="groups" element={<GroupsPage />} />
      </Route>
      <Route path="reader" element={<Reader />} />
    </Routes>
  </BrowserRouter>
)
