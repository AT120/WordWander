import { instance } from "./api";

async function addGroup(groupName) {
    try {
        const resp = await instance.post(
            '/teacher/groups',
            { name: groupName }
        )

        if (resp.status !== 200)
            return false

        return true
    } catch {
        return false
    }
}

async function loadTeacherGroups() {
    try {
        const resp = await instance.get('/teacher/groups?all=true')
        if (resp.status !== 200)
            return null

        return resp.data;
    } catch {
        return null
    }
}

async function loadUserGroups() {
    try {
        const resp = await instance.get('/users/groups')
        if (resp.status !== 200)
            return null

        return resp.data;
    } catch {
        return null
    }
}

async function deleteGroup(groupId) {
    try {
        const resp = await instance.delete(`/teacher/groups/${groupId}`)
        if (resp.status !== 200)
            return false

        return true;
    } catch {
        return false
    }
}

async function loadStudents(groupId) {
    try {
        const resp = await instance.get(`/teacher/groups/${groupId}/students`)
        if (resp.status !== 200)
            return false

        return resp.data;
    } catch {
        return false
    }
}
async function getPossibleUsers(name, groupId) {
    return instance.get(`teacher/get/${name}/${groupId}`).then(response => {
        if (response.status === 200) {
            return response.data;
        }
    })
        .catch(error => {
            //TODO: добавить обработку ошибок
        });
}
async function sendInvitation(groupId, userId) {
    return instance.post(`teacher/invitations/${groupId}/${userId}`).then(response => {
        if (response.status === 200) {
            return response;
        }
    })
        .catch(error => {

        });
}
async function deleteUserFromGroup(groupId, userId) {
    return instance.delete(`teacher/groups/${groupId}/delete/${userId}`).then(response => {
        if (response.status === 200) {
            return response;
        }
    })
        .catch(error => {

        });
}

async function exitGroup(groupId) {
    try {
        const resp = await instance.delete(`users/groups/${groupId}`)
        if (resp.status !== 200)
            return false

        return true;
    } catch {
        return false
    }
}

export const groupsApi = {
    addGroup,
    loadTeacherGroups,
    deleteGroup,
    loadStudents,
    getPossibleUsers,
    sendInvitation,
    loadUserGroups,
    deleteUserFromGroup,
    exitGroup
    
}