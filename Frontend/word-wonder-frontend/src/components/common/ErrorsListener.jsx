import { Alert, CloseButton } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { hideErrorActionCreator } from "../../reducers/error-reducer";

export default function ErrorsListener() {
    const error = useSelector(state => state.errorReducer.error)
    const dispatch = useDispatch()

    function closeHandler() {
        dispatch(hideErrorActionCreator())    
    }

    if (!error.show)
        return

    return (
        <Alert
            style={{
                position: 'fixed',
                bottom: '20px',
                left: '20px',
            }}
            className="error-alert"
            variant="danger"
        >
            <Alert.Heading className="d-flex align-content-center">
                Произошла ошибка!
                <CloseButton
                    className="ms-3"
                    onClick={closeHandler}
                    style={{ height: '13px', width: '13px' }}
                />
            </Alert.Heading>
            <p>
                {error.msg}
            </p>
        </Alert>
    )
}