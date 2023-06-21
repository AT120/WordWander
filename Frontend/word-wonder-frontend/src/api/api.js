import axios from 'axios';

export const baseURL = 'http://localhost:5194/api/'

export const instance = axios.create({
    baseURL: baseURL,
    withCredentials: true
})
function getBooks(page, name, sortBy) {
    return instance.get(`books/${page}`, { params: { name: name, sortedBy: sortBy } })
        .then(response => {
            if (response.status === 200) {
                return response.data;
            }
        })
        .catch(error => {
            //TODO: добавить обработку ошибок
        });
}

function postBook(title, description, file) {
    const formData = new FormData();
    formData.append("file", file);
    return instance.post(`books/add?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`, formData)
        .then(response => {
            if (response.status === 200) {

                return response;
            }
        })
        .catch(error => {
            console.log(error.response.data)
            return error.response.data
        });
}
function deleteBook(id) {
    return instance.delete(`books/delete/${id}`)
        .then(response => {
            if (response.status === 200) {
                return response
            }
        })
        .catch(error => {
            return error.response.data //TODO: добавить обработку ошибок
        });
}

async function loadBook(id) {
    try {

        const resp = await instance.get(`books/${id}/file`, { responseType: 'blob' })
        if (!resp || resp.status !== 200)
            return null 
        return new File([resp.data], `book-${id}.fb2`) //TODO: работает и так, но лучше получать расширение с бэка
    } catch {
        return null
    }
}

async function sendProgress(bookId, fraction) {
    try {
        await instance.put(`books/${bookId}/progress`, { percentReaded: fraction * 100 }).catch()
    } catch {

    }
}

async function loadReaderParameters(bookId) {
    try {
        const resp = await instance.get(`books/${bookId}/parameters`)
        if (!resp || resp.status !== 200) {
            return null
        }
        return resp.data
    } catch {
        return null
    }
}

async function sendReaderParameters(bookId, params) {
    try {
        const resp = await instance.put(`books/${bookId}/parameters`, params);
        if (!resp || resp.status !== 200) {
            console.log('Cant sync reader params')
        }
    } catch {
        console.log('Cant sync reader params')
    }
}


export const bookApi = {
    getBooks: getBooks,
    deleteBook: deleteBook,
    postBook: postBook,
    loadBook: loadBook,
    sendProgress: sendProgress,
    loadReaderParameters: loadReaderParameters,
    sendReaderParameters: sendReaderParameters,
}

function login(login, password) {

    const formData = new FormData();
    formData.append('userName', login)
    formData.append('password', password)
    return instance.post('auth/login',
        {
            userName: login,
            password: password
        }
    ).then(response => {
        if (response.status === 200) {
            return response;
        }
    })
        .catch(error => {
            return error.response.data
        });
}

function register(login, password,role){
    return instance.post('auth/register',    
        {
            userName: login,
            password : password,
            role: role? 1: 0
        } 
).then(response => {
        if(response.status ===200){
            return response;
        }
    })
        .catch(error => {
            return error.response.data
        });
}


function logout() {

    const formData = new FormData();
    return instance.post('auth/logout',)
        .then(response => {
            if (response.status === 200) {
                return response;
            }
        })
        .catch(error => {
            return error
        });
}
export const authApi = {
    login: login,
    register: register,
    logout: logout

}

function checkLogin() {
    return instance.get(`auth/authorized`)
        .then(response => {
            if (response.status === 200) {
                return response.data;
            }
        })
        .catch(error => {
            console.log(error.response.data.error)
        });
}
export const checkAuth = {
    checkLogin: checkLogin
}


//Dict

async function loadBookDictionary(bookId) {
    try {
        const resp = await instance.get(`dictionary/books/${bookId}`);
        if (resp.status !== 200)
            return null

        return resp.data
    } catch {
        return null
    }
}


function getDictionary() {
    return instance.get('dictionary')
        .then(response => {
            if (response.status === 200) {
                console.log("dictionaryGet")
                return response.data;
            }
        })
        .catch(error => {
            return null
        });
}
function deleteTranslation(translationId) {
    return instance.delete(`dictionary/delete/${translationId}`)
        .then(response => {
            if (response && response.status === 200) {
                return response;
            }
        })
        .catch(() => null)
}

async function saveTranslation(data) {
    try {
        const resp = await instance.post(`dictionary/save`, data);
        if (resp.status !== 200)
            return null
        return resp.data
    } catch {
        return null
    }
}


function changeFavouriteStatus(tranlsationId){
    console.log("changingFavouriteStatus")
    return instance.put(`dictionary/favorite/${tranlsationId}`)
    .then(response=>{
        if(response.status===200){
            return response;
        }
    })
    .catch(error => {
        console.log(error.response.data.error) 
    });
}

export const dictApi = {
    saveTranslation: saveTranslation,
    getDictionary: getDictionary,
    deleteTranslation: deleteTranslation,
    loadBookDictionary: loadBookDictionary,
    changeFavouriteStatus:changeFavouriteStatus
}

function getInvitations(){
    return instance.get('users/invitations').then(response=>{
        if(response.status===200){
            return response.data;
        }
    })
    .catch(error => {
        return []
    });
}
function acceptInvite(id, accept){
    return instance.post(`users/invitation/${id}/${accept}`).then(response=>{
        if(response.status===200){
            return response;
        }
    })
    .catch(error => {
        console.log(error.response.data.error) 
    });
}

export const invitationsApi={
    getInvitations: getInvitations,
    acceptInvite: acceptInvite
}