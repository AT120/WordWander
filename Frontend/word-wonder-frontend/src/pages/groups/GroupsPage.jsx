import Navigation from "../../components/common/Navigation";
import './Groups.css'
import groupsStore from "../../store/groupsStore";
import { Provider } from 'react-redux';
import GroupContainer from "../../components/groups/GroupContainer";
import { useOutletContext } from "react-router-dom";

export default function GroupsPage(params) {
    const role = useOutletContext()
    console.log(role)
    return (
        <Provider store={groupsStore}>
            <Navigation />
            <GroupContainer />
        </Provider>
    )
}