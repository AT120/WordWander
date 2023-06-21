
function BookTitle(props) {
    if (props.title!=null){
	return( <span className={`me-auto align-self-center ${props.className}`}  >
        Книга: <strong><u>{props.title}</u></strong>
    </span>)
    }
    return(<div className="me-auto"></div>)
}

export default BookTitle