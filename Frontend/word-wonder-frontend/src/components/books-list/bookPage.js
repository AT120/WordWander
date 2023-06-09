import AddBook from './addBook';
import './BookPage.css';
import Books from './books';
import PaginationBar from './paginationBar';
import SearchElem from './search';
import { Provider } from 'react-redux';
import listStore from '../../store/listStore';
function BookPage() {
  return (
    <Provider store={listStore}>
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

export default BookPage;
