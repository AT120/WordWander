import { groupsApi } from "../api/groups-api"
import { displayErrorActionCreator } from "./error-reducer"

const SET_GROUPS = 0;
const SET_STUDENTS = 1;


const initialState = {
    groups: [],
    students: {}
}

const groupsReducer = (state = initialState, action) => {
    let newState = { ...state }
    switch (action.type) {
        case SET_GROUPS:
            newState.groups = action.groups
            return newState
        case SET_STUDENTS:
            newState.students[action.groupId] = action.students
            return newState
        default:
            return newState
    }
}


function setGroupsActionCreator(groups) {
    return { type: SET_GROUPS, groups: groups }
}

function setStudentsActionCreator(groupId, students) {
    return { type: SET_STUDENTS, groupId: groupId, students: students }
}

export function addGroupThunkCreator(groupName) {
    return async (dispatch) => {
        const result = await groupsApi.addGroup(groupName)
        if (!result)
            dispatch(displayErrorActionCreator("Не удалось создать группу"))

        dispatch(loadTeacherGroupsThunkCreator())
    }
}

export function loadTeacherGroupsThunkCreator() {
    return async (dispatch) => {
        const result = await groupsApi.loadTeacherGroups()
        if (!result)
            dispatch(displayErrorActionCreator("Не удается загрузить ваш список групп"))
        dispatch(setGroupsActionCreator(result.groups))
    }
}


export function deleteGroupThunkCreator(groupId) {
    return async (dispatch) => {
        const result = await groupsApi.deleteGroup(groupId)
        if (!result)
            dispatch(displayErrorActionCreator("Не удалось удалить группу"))

        dispatch(loadTeacherGroupsThunkCreator())
    }
}

export function laodStudentsThunkCreator(groupId) {
    return async (dispatch) => {
        const result = await groupsApi.loadStudents(groupId)
        if (!result)
            dispatch(displayErrorActionCreator("Не удалось удалить группу"))

        dispatch(setStudentsActionCreator(groupId, result.users))
    }
}



export default groupsReducer;