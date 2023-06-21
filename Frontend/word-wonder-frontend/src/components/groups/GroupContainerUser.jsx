import AddGroupButton from "./AddGroupButton";
import ErrorsListener from "../common/ErrorsListener";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadGroupsThunkCreator, setUserRoleActionCreator } from "../../reducers/groups-reducer";
import GroupItemUser from "./GroupItemUser";
import { Accordion } from "react-bootstrap";


export default function GroupContainerUser() {
    const groups = useSelector(state => state.groupsReducer.groups)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setUserRoleActionCreator("ыыыыы"))
        dispatch(loadGroupsThunkCreator()) 
    }, [])

    return (
        <div className="d-flex justify-content-center">
            <div className="col col-lg-5" style={{ marginTop: '3.5rem' }}>

                <h2 className="d-flex justify-content-center">
                    {(groups && groups.length > 0) ? "Ваши группы:" : 'Вы не состоите ни в одной группе'}
                </h2>
                <div className="d-flex flex-column">
                    {
                        groups.map((group) => {
                            return <GroupItemUser id={group.id} name={group.name} />
                        })
                    }

                </div>

            </div>

            <ErrorsListener />
        </div>
    )
}