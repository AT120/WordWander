import { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas'
import TranslateApiSelector from './Settings/TranslateApiSelector';

export default function ReaderSettings() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div id="settings" >
            <button onClick={handleShow}>
                <svg className="icon" width="24" height="24">
                    <path d="M5 12.7a7 7 0 0 1 0-1.4l-1.8-2 2-3.5 2.7.5a7 7 0 0 1 1.2-.7L10 3h4l.9 2.6 1.2.7 2.7-.5 2 3.4-1.8 2a7 7 0 0 1 0 1.5l1.8 2-2 3.5-2.7-.5a7 7 0 0 1-1.2.7L14 21h-4l-.9-2.6a7 7 0 0 1-1.2-.7l-2.7.5-2-3.4 1.8-2Z" />
                    <circle cx="12" cy="12" r="3" />
                </svg>
            </button>

            <Offcanvas show={show} onHide={handleClose} placement='end'>
                <Offcanvas.Header closeButton></Offcanvas.Header>

                <Offcanvas.Body>
                    <TranslateApiSelector />
                </Offcanvas.Body>
            </Offcanvas>

        </div>
    )
}