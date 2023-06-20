import AddBook from './addBook';
import './BookPage.css';
import Books from './books';
import PaginationBar from './paginationBar';
import SearchElem from './search';
import { Provider } from 'react-redux';
import listStore from '../../store/listStore';
import Navigation from '../common/Navigation';
import Footer from '../common/Footer';
import { useOutletContext } from 'react-router-dom';
function BookPage() {
  return (
    <div>
      <Navigation/>
      <Provider  store={listStore}>
      <div className="App">
        <div style={{ marginTop: '60px' }} className='container'>
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
