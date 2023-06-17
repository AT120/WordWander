import axios, { AxiosResponse } from 'axios';
import Cookies from 'js-cookie';

export const baseURL='http://localhost:8080/api/'

const instance = axios.create({
    baseURL: baseURL,
    withCredentials : true
})
function getBooks(page, name, sortBy){
    return instance.get(`books/${page}`, {params: {name: name, sortedBy: sortBy}} )
    .then(response => {
        if(response.status ===200){
            return response.data;
        }
    })
    .catch(error => {
//TODO: добавить обработку ошибок
    });
}

function postBook(title, description, file){
    const formData = new FormData();
    formData.append("file", file);
    return instance.post(`books/add?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`, formData)
    .then(response => {
        if(response.status ===200){

            return response;
        }
    })
    .catch(error => {
        console.log(error.response.data)
        return error.response.data
    });
}
function deleteBook(id){
    return instance.delete(`books/delete/${id}`)
    .then(response => {
        if(response.status ===200){
            return response
        }
    })
    .catch(error => {
        return error.response.data //TODO: добавить обработку ошибок
    });
}

async function loadBook(id) {
    const resp = await instance.get(`books/${id}/file`, {responseType:'blob'})
        // .catch(error => null) //TODO: добавить обработку ошибок
    if (!resp || resp.status !== 200)
        return null //TODO: добавить обработку ошибок
    // return resp.data
    return new File([resp.data], `book-${id}.fb2`, {type: 'application/x-fictionbook'}) //TODO:
}

async function setBookLanguage(id, sourceLanguage, targetLanguage) {
    // Обработки ошибок не будет.
    const resp = await instance.put(`books/${id}/languages`, {
        sourceLangCode: sourceLanguage,
        targetLangCode: targetLanguage
    }).catch()
}

async function sendProgress(bookId, fraction) {
    try {
        await instance.put(`books/${bookId}/progress`, {percentReaded: fraction * 100}).catch()
    } catch { 
        
    }
}

async function loadReaderParameters(bookId) {
    try {
        const resp = await instance.get(`books/${bookId}/parameters`)
        if (!resp || resp.status !== 200) {
            console.log('Cant load reader parameters. The default ones will be used')
            return null
        }
        return resp.data
    } catch {
        console.log('Cant load reader parameters. The default ones will be used')
        return null
    }
}


export const bookApi = {
    getBooks : getBooks,
    deleteBook : deleteBook,
    postBook : postBook,
    loadBook : loadBook,
    sendProgress: sendProgress,
    setBookLanguage: setBookLanguage,
    loadReaderParameters: loadReaderParameters,
}

function login(login, password){

    const formData = new FormData();
    formData.append('userName', login)
    formData.append('password', password)
    return instance.post('auth/login',    
        {
            userName: login,
            password : password
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

function register(login, password){

    const formData = new FormData();
    formData.append('userName', login)
    formData.append('password', password)
    return instance.post('auth/register',    
        {
            userName: login,
            password : password
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


function logout(){

    const formData = new FormData();
    return instance.post('auth/logout',)
    .then(response => {
        if(response.status ===200){
            return response;
        }
    })
    .catch(error => {
        return error
    });
}
export const authApi = {
    login : login,
    register : register,
    logout : logout
    
}

function checkLogin(){
    return instance.get(`auth/authorized` )
    .then(response => {
        if(response.status ===200){
            return response.data;
        }
    })
    .catch(error => {
        console.log(error.response.data.error) 
    });
}
export const checkAuth = {
    checkLogin : checkLogin   
}


