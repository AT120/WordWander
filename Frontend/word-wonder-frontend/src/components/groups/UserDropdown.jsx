
import { useState } from "react";
import { Button, Form, FormControl, ListGroup} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { sendInvitationThunkCreator, setGroupPossibleUsersThunkCreator } from "../../reducers/groups-reducer";

function UsersDropdown(props) {
    const state = useSelector(state => state.groupsReducer)
    const dispatch = useDispatch()
    const [possibleUsers, setPossibleUsers] = useState([]);
    const [currentName, setCurrentName] = useState("")
    const handleSearch = async  (event) =>{
       await dispatch(setGroupPossibleUsersThunkCreator(event.target.value,props.groupId))
       setCurrentName(event.target.value)
       state.groups.forEach(element => {

            if(element.id==props.groupId && element.possibleUsers!=null){
               
                setPossibleUsers(element.possibleUsers)
            }
        })
    }
    const handleClick =  (id) => async (event) =>{
        event.stopPropagation()
        await dispatch(sendInvitationThunkCreator(props.groupId, id, currentName))
         state.groups.forEach(element => {

            if(element.id==props.groupId && element.possibleUsers!=null){
               
                setPossibleUsers(element.possibleUsers)
            }
        })
    }
    const handleClick2 = (event)=>{
        event.stopPropagation()
    }
    return (
        <div>

            <Form>
                <FormControl type="text" placeholder="Введите имя" onClick={handleClick2} onChange={handleSearch} />
            </Form>
            
            <ListGroup>
                {
                 possibleUsers.map((value, index)=>(<ListGroup.Item style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}} key={index}>{value.userName} <Button onClick={handleClick(value.id)} variant="success" size="sm">Пригласить</Button></ListGroup.Item>))
                }
            </ListGroup>

        </div>
    );
  };
  export default UsersDropdown

