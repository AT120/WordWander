import './App.css';
import Books from './components/books-list/books';
import { Provider } from 'react-redux';
import store from './store/store';

function App() {
  return (
    <Provider store={store}> 
      <div className="App">
        <div className='container'>
          <Books/>
          </div>  
      </div>
    </Provider>
  );
}

export default App;
