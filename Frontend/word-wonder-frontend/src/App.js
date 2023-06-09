import AddBook from './components/books-list/addBook';
import './App.css';
import Books from './components/books-list/books';
import PaginationBar from './components/books-list/paginationBar';
import SearchElem from './components/books-list/search';
import { Provider } from 'react-redux';
import store from './store/store';
function App() {
  return (
    <Provider store={store}>
    <div className="App">
      <div className='container'>
        <SearchElem />
        <Books/>
        <PaginationBar/>
        <AddBook/>
        </div>  
    </div>
    </Provider>
  );
}

export default App;
