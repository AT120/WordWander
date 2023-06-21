
function BookTitle(props) {
    if (props.title!=null){
	return( <span className="ms-3 me-auto align-self-center">
        Книга:<strong><u> {props.title}</u></strong>
    </span>)
    }
    return(<div className="me-auto"></div>)
}

export default BookTitle