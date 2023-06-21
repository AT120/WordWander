import { Accordion } from "react-bootstrap";
import GroupItemTeacher from "./GroupItemTeacher";
import AddGroupButton from "./AddGroupButton";
import ErrorsListener from "../common/ErrorsListener";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadGroupsThunkCreator, setUserRoleActionCreator } from "../../reducers/groups-reducer";


export default function GroupContainerTeacher() {
    const groups = useSelector(state => state.groupsReducer.groups)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setUserRoleActionCreator("Teacher"))
        dispatch(loadGroupsThunkCreator())
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
                            return <GroupItemTeacher 
                                style={{ 
                                    color: "black", 
                                    display: 'flex', 
                                    justifyContent: 'space-between', 
                                    alignItems: 'center'
                                }}
                                id={group.id}
                                name={group.name}
                                key={group.id}
                            />
                        })
                    }

                </Accordion>

            </div>

            <AddGroupButton />
            <ErrorsListener />
        </div>
    )
}