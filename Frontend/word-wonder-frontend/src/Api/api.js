import axios, { AxiosResponse } from 'axios';

const baseURL='https://localhost:7112/api/books/'

const instance = axios.create({
    baseURL: baseURL
})

function getBooks(page, name, sortBy){
    return instance.get(`${page}`, {params: {name: name, sortedBy: sortBy}} )
    .then(response => {
        if(response.status ===200){
            return response.data;
        }
    })
    .catch(error => {
        console.log(error.response.data.error) //TODO: добавить обработку ошибок
    });
}

function postBook(title, description, file){
    const formData = new FormData();
    formData.append("file", file);
    return instance.post(`add?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`, formData)
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
    return instance.delete(`delete/${id}`)
    .then(response => {
        if(response.status ===200){
            console.log("test")
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