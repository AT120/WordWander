import { Provider } from 'react-redux';
import loginStore from '../../store/loginStore';
import LoginFields from './loginFields';
import "./LoginPage.css"
import Navigation from '../common/Navigation';
import Footer from '../common/Footer';
function LoginPage() {
  return (
    <div>
      <Navigation/>
      <Provider store={loginStore}>
      <div className="Login">
        <div style={{ marginTop: '60px' }} className='container'>
          <LoginFields/>
          </div>  
      </div>
      </Provider>
      <Footer/>
    </div>
  );
}

export default LoginPage;