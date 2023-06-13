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

            return response.status;
        }
    })
    .catch(error => {
        return error.status
    });
}
function deleteBook(id){
    return instance.delete(`books/delete/${id}`)
    .then(response => {
        if(response.status ===200){
            return response;
        }
    })
    .catch(error => {
        console.log(error.response) //TODO: добавить обработку ошибок
    });
}
export const bookApi = {
    getBooks : getBooks,
    deleteBook : deleteBook,
    postBook : postBook
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


