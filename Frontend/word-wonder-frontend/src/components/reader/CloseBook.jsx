import { CloseButton } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function CloseBook() {
    const navigate = useNavigate()
    function clickHandler() {
        navigate('/list')
    }

    return (
        <CloseButton onClick={clickHandler} id="close-book"/>
    )
}