import { instance } from "./api";

async function loadBookList(studentId, name, sortBy) {
    try {
        const resp = await instance.get(
            `/teacher/student/${studentId}/books`,
            { name: name, sortedBy: sortBy }
        )
        if (!resp || resp.status !== 200)
            return null
        
        return resp.data.books;

    } catch {
        return null
    }
}


async function loadDictionary(studentId) {
    try {
        console.log(`load Dictionary ${studentId}`)
        const resp =await instance.get(
            `teacher/student/${studentId}/dictionary`,
        )
        if (!resp || resp.status !== 200)
            return null
        
        return resp.data.translationDtos;

    } catch {
        return null
    }
}


async function loadBookFile(id) {
    try {

        const resp = await instance.get(`teacher/student/books/${id}/file`, { responseType: 'blob' })
        if (!resp || resp.status !== 200)
            return null 
        return new File([resp.data], `book-${id}.fb2`) //TODO: работает и так, но лучше получать расширение с бэка
    } catch {
        return null
    }
}


export const memberInfoApi = {
    loadBookList,
    loadDictionary,
    loadBookFile
};