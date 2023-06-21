import { instance } from "./api";

async function loadBookList(studentId, page, name, sortBy) {
    try {
        const resp = await instance.get(
            `/teacher/student/${studentId}/books`,
            { params: { name: name, sortedBy: sortBy, page: page } }
        )
        if (!resp || resp.status !== 200)
            return null

        return resp.data;

    } catch {
        return null
    }
}


async function loadDictionary(studentId) {
    try {
        const resp = await instance.get(
            `teacher/student/${studentId}/dictionary`,
        )
        if (!resp || resp.status !== 200)
            return null

        return resp.data.translationDtos;

    } catch {
        return null
    }
}


async function loadBookFile(bookId) {
    try {
        const resp = await instance.get(`teacher/student/books/${bookId}/file`, { responseType: 'blob' })
        if (!resp || resp.status !== 200)
            return null
        return new File([resp.data], `book-${bookId}.fb2`) //TODO: работает и так, но лучше получать расширение с бэка
    } catch {
        return null
    }
}


const memberInfoApi = {
    loadBookList,
    loadDictionary,
    loadBookFile
};

export default memberInfoApi