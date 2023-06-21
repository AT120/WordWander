import Navigation from "../../components/common/Navigation";
import { Provider } from "react-redux";
import GroupMemberInfoStore from "../../store/group-member-infoStore";
import { useOutletContext,useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import GroupMemberInfoContainer from "./GroupMemberInfoContainer";
import Footer from "../common/Footer";


export default function GroupMemberInfo() {
	const role = useOutletContext();
	//redirect
	//role !teacher - redirect  -> groups
    const location = useLocation()
    console.log(`location:${location}` , location)  

	const navigate = useNavigate();
	if (role !== "Teacher") navigate("/groups");

	return (
		<div>
			<Provider store={GroupMemberInfoStore}>
				<Navigation />
				<div className="GroupMemberInfo mb-5">
					<div style={{ marginTop: "60px" }} className="container">
						<div className="ms-2 pt-2 mb-3">
							<h3> Пользователь:Имя пользователя </h3>
						</div>

						<GroupMemberInfoContainer />
					</div>
				</div>
			</Provider>
			<Footer />
		</div>
	);
}
