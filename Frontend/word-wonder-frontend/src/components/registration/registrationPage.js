import { Provider } from 'react-redux';
import RegistrationFields from './registrationFields';
import registrationStore from '../../store/registrationStore';
import Navigation from '../common/Navigation';
import Footer from '../common/Footer';
function RegistrationPage() {
  return (
    <div>
    <Navigation/>
    <Provider store={registrationStore}>
    <div  className="Registration">
      <div style={{ marginTop: '60px' }} className='container'>
        <RegistrationFields/>
        </div>  
    </div>
    </Provider>
    <Footer/>
    </div>
  );
}

export default RegistrationPage;