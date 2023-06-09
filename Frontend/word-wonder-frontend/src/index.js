import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Reader from './pages/ReaderPage';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <Provider store={store}>
    // <App />
  // </Provider>,
  <BrowserRouter>
    <Routes>
      <Route index element={<App />} />
      <Route path="reader" element={<Reader />} />
    </Routes>
  </BrowserRouter>
);


