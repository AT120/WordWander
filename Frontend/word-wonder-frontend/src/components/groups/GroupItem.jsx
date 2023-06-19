import { Accordion, AccordionButton } from "react-bootstrap";
import AddStudentButton from "./AddStudentButton";
import DeleteGroupButton from "./DeleteGroupButton";

export default function GroupItem({ }) {

    return (

        <Accordion.Item eventKey="0">
            <Accordion.Header className="d-flex flex-row" >
                <h4 className="d-flex flex-grow-1">Группа 1</h4>
                <div className="me-5">

                    <AddStudentButton />
                    <DeleteGroupButton className='ms-2'/>
                </div>
            </Accordion.Header>
            <Accordion.Body>
                <div className="border-bottom">
                    <h6>стдент номер1</h6>
                </div>
                <div className="border-bottom">
                    <h6>стдент номер1</h6>
                </div>
                <div className="border-bottom">
                    <h6>стдент номер1</h6>
                </div>
            </Accordion.Body>
        </Accordion.Item>
    )
}