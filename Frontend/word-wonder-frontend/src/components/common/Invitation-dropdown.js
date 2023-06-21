import { useEffect } from "react";
import { useState } from "react";
import { Dropdown, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { acceptInviteThunkCreator, loadInvitationsThunkCreator } from "../../reducers/invitation-reducer";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
function InvitationDropdown() {
    const state = useSelector(state=>state.invitationPage)
    const dispatch = useDispatch()
    const invite = (id, accept) =>{
        dispatch(acceptInviteThunkCreator(id,accept))
    }
    useEffect(()=>{
        dispatch(loadInvitationsThunkCreator())
        console.log(state.invitations)
    },[])

    return (
      <Dropdown style={{display:state.invitations.length==0? "none" : "block"}}>
      <Dropdown.Toggle variant="secondary" id="dropdown-menu">
        Приглашения
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {state.invitations.length!==0 && state.invitations.map((value)=>{
            return <DropdownItem style={{color:"black", display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}  key={value.id}>{value.groupName} <div><Button onClick={()=>invite(value.id,true)} size="sm" variant="success">✓</Button><Button size="sm" variant="danger" onClick={()=>invite(value.id,false)}>✕</Button></div></DropdownItem>
        })
        }
      </Dropdown.Menu>
    </Dropdown>
    );
  };
  export default InvitationDropdown