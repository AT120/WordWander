import Navigation from "../../components/common/Navigation";
import './Groups.css'
import groupsStore from "../../store/groupsStore";
import { Provider } from 'react-redux';
import GroupContainer from "../../components/groups/GroupContainer";

export default function GroupsPage(params) {
    

    return (
        <Provider store={groupsStore}>
            <Navigation />
            <GroupContainer />
        </Provider>
    )
}