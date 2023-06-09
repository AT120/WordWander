import Navigation from "../../components/common/Navigation";
import { Provider } from "react-redux";
import GroupMemberInfoStore from "../../store/group-member-infoStore";
import { useOutletContext,useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import GroupMemberInfoContainer from "./GroupMemberInfoContainer";
import Footer from "../common/Footer";


export default function GroupMemberInfo() {
	const role = useOutletContext();
    const location = useLocation()

	const navigate = useNavigate();
	if (role !== "Teacher") navigate("/groups");

	//TODO: страница для отображения некорректного id
	return (
		<div>
			<Provider store={GroupMemberInfoStore}>
				<Navigation />
				<div className="GroupMemberInfo mb-5">
					<div style={{ marginTop: "60px" }} className="container border border-3  rounded">
						<div className="ms-2 pt-2 mb-3">
							<h3> Пользователь:<strong> {location.state.name}</strong> </h3>
						</div>

						<GroupMemberInfoContainer/>
					</div>
				</div>
			</Provider>
			<Footer />
		</div>
	);
}
