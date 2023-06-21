//import API
import memberInfoApi  from "../api/member-info-api";
import { act } from "react-dom/test-utils";


const GET_MEMBER_DICTIONARY = "GET_MEMBER_DICTIONARY";
const GET_MEMBER_BOOKS = "GET_MEMBER_BOOKS";

let initialState = {
	translations: [],
	books: [],
	searchTerm: "",
	searchName: "",
	sortBy: null,
};

const groupMemberInfoReducer = (state = initialState, action) => {
	let newState = { ...state };

	switch (action.type) {
		case GET_MEMBER_BOOKS:
			newState.books = action.books;
			return newState;
		case GET_MEMBER_DICTIONARY:
			newState.translations = action.translations;
			return newState;
		default:
			return newState;
	}
};

export function getMemberDictionaryActionCreator(translations) {
	// console.log(translations)
	return { type: GET_MEMBER_DICTIONARY, translations: translations };
}

export function getMemberBookActionCreator(books) {
	return { type: GET_MEMBER_BOOKS, books: books };
}

//TODO: Actions for search params update

export function getMemberDictionaryThunkCreator(studentId) {
	return async (dispatch)=>{
	await memberInfoApi.loadDictionary(studentId).then(data=>{
		// console.log(data)
		dispatch(getMemberDictionaryActionCreator(data))
	})
	}
}

export function getMemberBookThunkCreator() {
	// return async (dispatch) =>{
	// 	await 
	// }
}






//Thunks

export default groupMemberInfoReducer;

