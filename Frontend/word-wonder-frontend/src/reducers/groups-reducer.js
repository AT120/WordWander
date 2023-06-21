import { groupsApi } from "../api/groups-api"
import { displayErrorActionCreator } from "./error-reducer"

const SET_GROUPS = 0
const SET_STUDENTS = 1
const SET_GROUP_POSSIBLE_USERS = "SET_GROUP_POSSIBLE_USERS"
const SET_USER_ROLE = 2

const initialState = {
    teacher: false,
    groups: [],
    students: {}
}
function setPossibleUsersToCurrentGroups(state, users, groupId) {
    state.groups.forEach(element => {
        if (element.id == groupId) {
            element.possibleUsers = users
            console.log("test")
            return
        }
    });
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
        case SET_GROUP_POSSIBLE_USERS:
            setPossibleUsersToCurrentGroups(newState, action.users, action.groupId)
            return newState
        case SET_USER_ROLE:
            newState.teacher = (action.role === "Teacher")
            return newState
        default:
            return newState
    }
}


function setGroupsActionCreator(groups) {
    return { type: SET_GROUPS, groups: groups }
}
export function sendInvitationThunkCreator(groupId, userId, name) {
    return async (dispatch) => {
        await groupsApi.sendInvitation(groupId, userId)
        await groupsApi.getPossibleUsers(name, groupId).then(data => dispatch(setGroupPossibleUsersActionCreator(groupId, data)))
    }
}
export function setGroupPossibleUsersActionCreator(groupId, users) {
    return { type: SET_GROUP_POSSIBLE_USERS, groupId: groupId, users: users }
}

export function setGroupPossibleUsersThunkCreator(name, groupId) {
    return async (dispatch) => {
        await groupsApi.getPossibleUsers(name, groupId).then(data => dispatch(setGroupPossibleUsersActionCreator(groupId, data)))
    }
}
function setStudentsActionCreator(groupId, students) {
    return { type: SET_STUDENTS, groupId: groupId, students: students }
}

export function setUserRoleActionCreator(role) {
    return { type: SET_USER_ROLE, role: role }
}

export function addGroupThunkCreator(groupName) {
    return async (dispatch) => {
        const result = await groupsApi.addGroup(groupName)
        if (!result)
            dispatch(displayErrorActionCreator("Не удалось создать группу"))
        else
            dispatch(loadGroupsThunkCreator())
    }
}

export function loadGroupsThunkCreator() {
    return async (dispatch, getState) => {
        const teacher = getState().groupsReducer.teacher
        
        const result = (teacher) 
            ? await groupsApi.loadTeacherGroups()
            : await groupsApi.loadUserGroups()

        if (!result)
            dispatch(displayErrorActionCreator("Не удается загрузить ваш список групп"))
        else
            dispatch(setGroupsActionCreator(result.groups))
    }
}


export function deleteGroupThunkCreator(groupId) {
    return async (dispatch) => {
        const result = await groupsApi.deleteGroup(groupId)
        if (!result)
            dispatch(displayErrorActionCreator("Не удалось удалить группу"))
        else
            dispatch(loadGroupsThunkCreator())
    }
}

export function loadStudentsThunkCreator(groupId) {
    return async (dispatch) => {
        const result = await groupsApi.loadStudents(groupId)
        if (!result)
            dispatch(displayErrorActionCreator("Не удалось удалить группу"))
        else
            dispatch(setStudentsActionCreator(groupId, result.users))
    }
}



export default groupsReducer;