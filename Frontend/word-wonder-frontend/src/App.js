
import './App.css';
import Books from './components/books-list/books';
import PaginationBar from './components/books-list/paginationBar';
import SearchElem from './components/books-list/search';
function App() {
  return (
    <div className="App">
      <div className='container'>
        <SearchElem/>
        <Books/>
        <PaginationBar/>
        </div>  
    </div>
  );
}

export default App;
