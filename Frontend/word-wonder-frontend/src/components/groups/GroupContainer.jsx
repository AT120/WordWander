import { Accordion } from "react-bootstrap";
import GroupItem from "./GroupItem";
import AddGroupButton from "./AddGroupButton";
import ErrorsListener from "../common/ErrorsListener";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadTeacherGroupsThunkCreator } from "../../reducers/groups-reducer";


export default function GroupContainer() {
    const groups = useSelector(state => state.groupsReducer.groups)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadTeacherGroupsThunkCreator())
    }, [])

    return (
        <div className="d-flex justify-content-center">
            <div className="col col-lg-7" style={{ marginTop: '3.5rem' }}>

                <h2 className="d-flex justify-content-center">
                    {(groups && groups.length > 0) ? "Группы:" : 'Вы не создали ни одной группы'}
                </h2>
                <Accordion>
                    {
                        groups.map((group) => {
                            return <GroupItem id={group.id} name={group.name}/>
                        })
                    }

                </Accordion>

            </div>

            <AddGroupButton />
            <ErrorsListener />
        </div>
    )
}