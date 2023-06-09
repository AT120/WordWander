import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Card } from "react-bootstrap";
function LoginFields(){
    const state = useSelector(state=>state.loginPage)
    const dispatch = useDispatch()
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
                        value="test"
                        onChange={console.log("test")}
                        placeholder="Введите имя пользователя"
                        />
                    </Form.Group>
            
                    <Form.Group controlId="password">
                        <Form.Label>Пароль</Form.Label>
                        <Form.Control
                        type="password"
                        value="test"
                        onChange={console.log("test")}
                        placeholder="Введите пароль"
                        />
                    </Form.Group>
            
                    <Button style={{marginTop:'10px'}} variant="primary" onClick={console.log("test")}>
                        Войти
                    </Button>
                </Form>
            </Card.Body>
        </Card >  
        </div>      
    )
}
export default LoginFields