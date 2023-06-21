import Navigation from "../../components/common/Navigation";
import './Groups.css'
import groupsStore from "../../store/groupsStore";
import { Provider } from 'react-redux';
import GroupContainerTeacher from "../../components/groups/GroupContainerTeacher";
import { useOutletContext } from "react-router-dom";
import GroupContainerUser from "../../components/groups/GroupContainerUser";

export default function GroupsPage(params) {
    const role = useOutletContext()
    return (
        <Provider store={groupsStore}>
            <Navigation />
            {
                (role === "Teacher") 
                    ? <GroupContainerTeacher />
                    : <GroupContainerUser />
            }
            
        </Provider>
    )
}