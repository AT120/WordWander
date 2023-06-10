import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Card } from "react-bootstrap";
import { changeFieldsActionCreator, loginThunkCretor } from "../../reducers/login-reducer";
function LoginFields(){
    const state = useSelector(state=>state.loginPage)
    const dispatch = useDispatch()
    const handleChangeWrapper = (field) => (event) => {
        switch(field){
            case 0:
                dispatch(changeFieldsActionCreator(event.target.value, null))
                break;
            case 1:
                dispatch(changeFieldsActionCreator(null, event.target.value))
                break;
       }}
       const handleClick = () => {
            dispatch(loginThunkCretor(state.login, state.password))
       }
    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
        <Card className=" bg-light" style={{ width: '700px', height: '300px' }}>
            <Card.Header>
                <h2 className="justify-content-center">Авторизация</h2>
            </Card.Header>
            <Card.Body>
                <Form>
                    <Form.Group >
                        <Form.Label>Логин</Form.Label>
                        <Form.Control
                        type="text"
                        value={state.login}
                        onChange={handleChangeWrapper(0)}
                        placeholder="Введите имя пользователя"
                        />
                    </Form.Group>
            
                    <Form.Group controlId="password">
                        <Form.Label>Пароль</Form.Label>
                        <Form.Control
                        type="password"
                        value={state.password}
                        onChange={handleChangeWrapper(1)}
                        placeholder="Введите пароль"
                        />
                    </Form.Group>
            
                    <Button style={{marginTop:'10px'}} variant="primary" onClick={handleClick}>
                        Войти
                    </Button>
                </Form>
            </Card.Body>
        </Card >  
        </div>      
    )
}
export default LoginFields