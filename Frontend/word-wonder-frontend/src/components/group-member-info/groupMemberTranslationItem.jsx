import { Card } from "react-bootstrap";
import BookTitle from "../dictionary/bookTitle";
import { TimeSince } from "../common/AuxiliaryFunctions";








export default function GroupMemberTranslationItem(props){
console.log("GroupMemberTranslationItem")

console.log()

    return(
        <Card>
            <Card.Header>
                <div className="d-flex">
                    <BookTitle title={props.bookTitle}/>
                    <div className="align-self-center">{TimeSince(props.creationDate)}</div>
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
    )
}