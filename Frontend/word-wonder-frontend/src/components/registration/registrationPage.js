import { Provider } from 'react-redux';
import RegistrationFields from './registrationFields';
import registrationStore from '../../store/registrationStore';
function RegistrationPage() {
  return (
    <Provider store={registrationStore}>
    <div className="Registration">
      <div className='container'>
        <RegistrationFields/>
        </div>  
    </div>
    </Provider>
  );
}

export default RegistrationPage;