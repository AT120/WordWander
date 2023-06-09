import { Accordion, AccordionButton, Button } from "react-bootstrap";
import AddStudentButton from "./AddStudentButton";
import DeleteGroupButton from "./DeleteGroupButton";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { deleteUserFromGroupThunkCreator, loadStudentsThunkCreator as loadStudentsThunkCreator } from "../../reducers/groups-reducer";
import UsersDropdown from "./UserDropdown";
import { useNavigate } from 'react-router-dom';


export default function GroupItemTeacher({ name, id }) {
    const students = useSelector(state => state.groupsReducer.students?.[id])
    const [addingIsOpen, setAddingIsOpen] = useState(false);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    function loadStudents() {
        if (!students)
            dispatch(loadStudentsThunkCreator(id))
    }

    function goToStudent(id, name) {
        navigate("/member-info", { state:{id: id, name: name} })
    }

    const handleClick = async (userId, groupId) =>{
       await dispatch(deleteUserFromGroupThunkCreator(userId,groupId))
    }
    return (

        <Accordion.Item eventKey={id} key={id}>
            <Accordion.Header className="d-flex flex-row" >
                <h4 className="d-flex flex-grow-1">{name}</h4>

                <div className="me-2">
                    {addingIsOpen && <UsersDropdown groupId={id} />}
                </div>

                <div className="me-5">

                    <AddStudentButton addingIsOpen={addingIsOpen} setAddingIsOpen={setAddingIsOpen} />
                    <DeleteGroupButton className='ms-2' groupId={id} />
                </div>
            </Accordion.Header>
            <Accordion.Body onEntering={loadStudents}>
                {
                    (!students) ? 'Загрузка...' :
                    (students.length == 0) ? 'В этой группе никого нет' :
                        students.map((student) => {
                            return (
                                <div className="d-flex justify-content-between mt-2">
                                <a 
                                    className="border-bottom" 
                                    onClick={() => goToStudent(student.id, student.userName)} 
                                    style={{cursor: "pointer"}}
                                >
                                    <h5>{student.userName}</h5>    
                                </a>
                                <Button variant="danger" size="sm"  onClick={()=>handleClick(student.id, id)}>Исключить</Button>
                                </div>
                            )
                        })

                }
            </Accordion.Body>
        </Accordion.Item>
    )
}