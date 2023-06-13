import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Card } from "react-bootstrap";
import { changeFieldsActionCreator, registerThunkCretor } from "../../reducers/registration-reducer";
import { useNavigate, NavLink  } from "react-router-dom";
import React, { useEffect } from "react";
import { bookInitialState } from "../../reducers/book-list-reducer";
function RegistrationFields(){
    const state = useSelector(state=>state.registrationPage)
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
            dispatch(registerThunkCretor(state.login, state.password))           
       }
       useEffect(()=>{
        if(state.logedIn){
        navigate("/list",{state:{bookInitialState}})
        }
    },[state.logedIn]);
    return (
        <div className="d-flex justify-content-center vh-100" style={{marginTop:'20%'}}>
        <Card className=" bg-light" style={{ width: '700px', height: '300px' }}>
            <Card.Header>
                <h2 className="justify-content-center">Регистрация</h2>
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
                    <div className='d-flex justify-content-between'>
                    <Button  style={{marginTop:'10px'}} variant="primary" onClick={handleClick}>
                        Зарегистрироваться 
                    </Button>
                    <NavLink className="nav-link" style={{marginTop:'10px', color: 'blue'}} to='/login'>Log In</NavLink>
                </div>
                </Form>
            </Card.Body>
        </Card >  
        </div>      
    )
}
export default RegistrationFields