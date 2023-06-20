import { Accordion } from "react-bootstrap";
import DeleteGroupButton from "./DeleteGroupButton";


export default function GroupItemUser({ name, id }) {

    return (
        <div className="d-flex flex-row border p-3 mt-3" key={id}>
            <h4 className="d-flex flex-grow-1">{name}</h4>

            <div className="me-5">
                <DeleteGroupButton className='ms-2' groupId={id} />
            </div>
        </div>
    )
}