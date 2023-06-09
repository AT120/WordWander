import AddBook from './components/books-list/addBook';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Books from './components/books-list/books';
import PaginationBar from './components/books-list/paginationBar';
import SearchElem from './components/books-list/search';
function App() {
  return (
    <div className="App">
      <div className='container'>
        <SearchElem />
        <Books/>
        <PaginationBar/>
        <AddBook/>
        </div>  
    </div>
  );
}

export default App;
