import { instance } from "./api";

async function addGroup(groupName) {
    try {
        const resp = await instance.post(
            '/teacher/groups',
            {name: groupName}
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

export const groupsApi = {
    addGroup,
    loadTeacherGroups,
    deleteGroup,
    loadStudents,
}