import Navigation from "../../components/common/Navigation";
import { Accordion } from "react-bootstrap";
import GroupItem from "../../components/groups/GroupItem";
import './Groups.css'
import AddGroupButton from "../../components/groups/AddGroupButton";

export default function GroupsPage(params) {

    return (
        <div>
            <Navigation />
            <div className="d-flex justify-content-center">
                <div className="col col-lg-7" style={{ marginTop: '3.5rem' }}>

                    <h2 className="d-flex justify-content-center">Группы:</h2>
                    <Accordion>
                        <GroupItem />

                    </Accordion>

                </div>

                <AddGroupButton />

            </div>
        </div>
    )
}