import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Card } from "react-bootstrap";
import { changeFieldsActionCreator, loginThunkCretor, stateFromLocationActionCreator } from "../../reducers/login-reducer";
import { useNavigate, NavLink, useLocation } from "react-router-dom";
import React, { useEffect } from "react";
import { bookInitialState } from "../../reducers/book-list-reducer";
function LoginFields(){
    const state = useSelector(state=>state.loginPage)
    const location = useLocation()
    const dispatch = useDispatch()
    const navigate = useNavigate();
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
       useEffect(()=>{
        if(location.state!=null){
            dispatch(stateFromLocationActionCreator(location.state))
        }
        if(state.logedIn){
        window.location.href="/list"
        }
    },[state.logedIn]);
    return (

        <div className="d-flex justify-content-center" style={{marginTop:'20%'}}>
        <Card className=" bg-light" style={{ width: '700px'}}>
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
                    {state.error && <p className="text-danger">{state.error}</p>}
                <div className='d-flex justify-content-between flex-wrap'>
                    <Button  style={{marginTop:'10px'}} variant="primary" onClick={handleClick}>
                        Войти
                    </Button>
                    <NavLink className="nav-link" style={{marginTop:'10px', color: 'blue'}} to='/registration'>Регистрация</NavLink>
                </div>
                </Form>
            </Card.Body>
        </Card >  
        </div>      
    )
}
export default LoginFields