import { useState } from "react";
import { Button, CloseButton, Form, FormGroup } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addGroupThunkCreator } from "../../reducers/groups-reducer";

export default function AddGroupButton() {
    const [hidden, hide] = useState(true);
    const dispatch = useDispatch()

    function createNewGroup(event) {
        event.preventDefault()
        const groupName = event.target[1].value
        hide(true)
        dispatch(addGroupThunkCreator(groupName))
    }

    return (
        <div>
            <Form 
                className={"add-new-name border rounded p-3 " + ((hidden) ? 'visually-hidden' : '')}
                onSubmit={createNewGroup} 
            >
                <Form.Group>
                    <div className="d-flex flex-row">
                        <Form.Label>Название</Form.Label>
                        <CloseButton 
                            className="ms-auto" 
                            onClick={() => hide(true)}
                        />
                    </div>
                    <div className="d-flex flex-column">
                        <Form.Control name="group-name" required></Form.Control>
                        <Button type="submit" className="mt-3">
                            Создать
                        </Button>
                    </div>
                </Form.Group>
            </Form>

            <Button 
                variant="primary" 
                className="upload-button" 
                style={{ marginBottom: '2%', zIndex: "9999" }}
                onClick={() => hide(false)}
            >
                <FaPlus className="plus-icon" />
            </Button>
        </div>

    )
}