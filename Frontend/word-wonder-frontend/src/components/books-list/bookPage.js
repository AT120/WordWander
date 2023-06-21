import AddBook from './addBook';
import './BookPage.css';
import Books from './books';
import PaginationBar from './paginationBar';
import SearchElem from './search';
import { Provider } from 'react-redux';
import listStore from '../../store/listStore';
import Navigation from '../common/Navigation';
import Footer from '../common/Footer';

function BookPage() {
  return (
    <div>
      <Navigation/>
      <Provider  store={listStore}>
      <div className="App" style={{marginBottom:'40px'}}>
        <div style={{ marginTop: '60px' }} className='container'>
          <h3>Ваши книги</h3>
          <SearchElem />
          <Books/>
          <PaginationBar/>
          <AddBook/>
          </div>  
      </div>
      </Provider>
      <Footer/>
    </div>
  );
}

export default BookPage;
