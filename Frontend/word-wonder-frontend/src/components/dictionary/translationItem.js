import { Card } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { deleteTranslationThunkCreator } from "../../reducers/dictionary-reducer";
import FavouriteStar from "./FavouriteStar";
import BookTitle from "./bookTitle";



function TranslationItem(props) {
	const dispatch = useDispatch();

	const deleteTranslation = () => {
		console.log("deleting translation with id: " + props.translationId);
		dispatch(deleteTranslationThunkCreator(props.translationId));
	};

	const timeSince = () => {
		var seconds = Math.floor(
			(new Date() - new Date(props.creationDate)) / 1000
		);
		console.log("timesince");
		var interval = seconds / 31536000;

		if (interval > 1) {
			console.log(Math.floor(interval) + " years");
			return Math.floor(interval) + " years ago";
		}
		interval = seconds / 2592000;
		if (interval > 1) {
			console.log(Math.floor(interval) + " months");
			return Math.floor(interval) + " months ago";
		}
		interval = seconds / 86400;
		if (interval > 1) {
			console.log(Math.floor(interval) + " days");
			return Math.floor(interval) + " days ago";
		}
		interval = seconds / 3600;
		if (interval > 1) {
			console.log(Math.floor(interval) + " hours");
			return Math.floor(interval) + " hours ago";
		}
		interval = seconds / 60;
		if (interval > 1) {
			console.log(Math.floor(interval) + " minutes ago");
			return Math.floor(interval) + " minutes ago";
		}
		console.log(Math.floor(seconds) + " seconds ago");
		return Math.floor(seconds) + " seconds ago";
	};

	return (
		<Card>
			<Card.Header>
				<div className="d-flex">
					<FavouriteStar favourite={props.favourite} translationId={props.translationId}/>
					<BookTitle title={props.bookTitle}/>
					<div className="align-self-center">{timeSince()}</div>
					<button
						className="btn btn-sm btn-outline-secondary border-0 me-1"
						onClick={deleteTranslation}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							fill="currentColor"
							className="bi bi-trash3"
							viewBox="0 0 16 16"
						>
							<path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
						</svg>
					</button>
				</div>
			</Card.Header>
			<Card.Body>
				<div className="row justify-content-around">
					<div className="col-5">
						<span>
							Исходный язык <strong>{props.originalLanguage}</strong>
						</span>
						<textarea className="form-control mt-1" defaultValue={props.originalSequence} style={{height:35}} disabled/>
					</div>
					<div className="vr px-0 col-2" />
					<div className="col-5">
						<span>
							Язык перевода <strong>{props.translationLanguage}</strong>
						</span>
						<textarea className="form-control mt-1" defaultValue={props.translatedSequence} style={{height:35}} disabled/>
					</div>
				</div>
			</Card.Body>
		</Card>
	);
}

export default TranslationItem;
