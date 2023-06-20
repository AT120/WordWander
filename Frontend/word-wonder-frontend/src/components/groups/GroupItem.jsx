import { Accordion, AccordionButton } from "react-bootstrap";
import AddStudentButton from "./AddStudentButton";
import DeleteGroupButton from "./DeleteGroupButton";
import { useDispatch, useSelector } from "react-redux";
import { laodStudentsThunkCreator as loadStudentsThunkCreator } from "../../reducers/groups-reducer";

export default function GroupItem({ name, id }) {
    const students = useSelector(state => state.groupsReducer.students?.[id])
    const dispatch = useDispatch()
    function loadStudents() {
        if (!students)
            dispatch(loadStudentsThunkCreator(id))
    }

    return (

        <Accordion.Item eventKey={id}>
            <Accordion.Header className="d-flex flex-row" >
                <h4 className="d-flex flex-grow-1">{name}</h4>
                <div className="me-5">

                    <AddStudentButton />
                    <DeleteGroupButton className='ms-2' groupId={id} />
                </div>
            </Accordion.Header>
            <Accordion.Body onEntering={loadStudents}>
                {
                    (!students) ? 'Загрузка...' :
                    (students.length == 0) ? 'В этой группе никого нет' :
                        students.map((student) => {
                            return (
                                <div className="border-bottom">
                                    <h6>{student.userName}</h6>
                                </div>
                            )
                        })

                }
            </Accordion.Body>
        </Accordion.Item>
    )
}