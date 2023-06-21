import { Modal, Button, Form, Spinner} from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setAddBookParamsActionCreator, changeModalStateActionCreator, postBookThunkCreator, startLoadingActionCreator, loadBookFileThunkCreator } from "../../reducers/book-list-reducer";
function AddBook() {
    const state = useSelector(state => state.booksPage);
    const dispatch = useDispatch()
    const handleChangeWrapper = (field) => (event) => {
        switch (field) {
            case 0:
                dispatch(setAddBookParamsActionCreator(event.target.value, null, null))
                break;
            case 1:
                dispatch(setAddBookParamsActionCreator(null, event.target.value, null))
                break;
            case 2:
                dispatch(loadBookFileThunkCreator(event.target.files[0]))
                break;
        }
    }
    const handleCloseModal = () => {
        dispatch(changeModalStateActionCreator())
    }

    const handleUpload = () => {
        dispatch(startLoadingActionCreator())
        dispatch(postBookThunkCreator(state.addBook.title, state.addBook.description, state.addBook.file, state.page))
    }
    return (
        <div>
            <Button variant="primary" className="upload-button" onClick={handleCloseModal} style={{ marginBottom: '2%', zIndex: "9999" }}>
                <FaPlus className="plus-icon" />
            </Button>

            <Modal show={state.showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Загрузить файл</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>

                        <Form.Group>
                            <Form.Label>Файл</Form.Label>
                            <Form.Control type="file" onChange={handleChangeWrapper(2)}></Form.Control>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Название</Form.Label>
                            <Form.Control type="text" placeholder="Enter title" value={state.addBook.title} onChange={handleChangeWrapper(0)}></Form.Control>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Описание</Form.Label>
                            <Form.Control type="textarea" rows={3} placeholder="Enter description" value={state.addBook.description} onChange={handleChangeWrapper(1)}></Form.Control>
                        </Form.Group>



                    </Form>
                </Modal.Body>
                <Modal.Footer>

                    {state.addBook.error && <p className="text-danger">{state.addBook.error}</p>}
                    <Button variant="primary" onClick={handleUpload} disabled={state.addBook.loading}>
                        {state.addBook.loading ?
                            (
                                <Spinner animation="border" role="status" size="sm">
                                    <span className="visually-hidden">Loading...</span>
                                </Spinner>
                            ) :
                            (
                                "Upload"
                            )
                        }
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
export default AddBook