import { Button } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";

export default function AddGroupButton() {
    return (
        <Button variant="primary" className="upload-button" style={{ marginBottom: '2%', zIndex: "9999" }}>
            <FaPlus className="plus-icon" />
        </Button>
    )
}