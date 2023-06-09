import { Provider } from 'react-redux';
import loginStore from '../../store/loginStore';
import LoginFields from './loginFields';
import "./LoginPage.css"
function LoginPage() {
  return (
    <Provider store={loginStore}>
    <div className="Login">
      <div className='container'>
        <LoginFields/>
        </div>  
    </div>
    </Provider>
  );
}

export default LoginPage;