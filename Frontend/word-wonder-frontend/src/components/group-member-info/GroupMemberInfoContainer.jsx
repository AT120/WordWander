import { useLocation } from "react-router-dom";
import GroupMemberBookCollection from "./groupMemberBookCollection";
import GroupMemberTranslationCollection from "./groupMemberTranslationCollection";


export default function GroupMemberInfoContainer() {
	const location = useLocation();
	console.log(`location2: `, location);
	return (
		<div className="row justify-content-around" style={{minHeight:500}}>
			<div className="col-6 border-end border-top border-1 rounded-1">
                <h4 className="ms-2 mt-2">Книги</h4>
				<GroupMemberBookCollection />
			</div>
			<div className="col-6 border-start border-top border-1 rounded-1">
				<h4 className="ms-2 mt-2">Словарь</h4>
				<GroupMemberTranslationCollection />
			</div>
		</div>
	);
}
