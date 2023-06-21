//import API

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
		case GET_MEMBER_DICTIONARY:
			newState.books = action.books;
			return newState;
		case GET_MEMBER_BOOKS:
			newState.translations = action.translations;
			return newState;
		default:
			return newState;
	}
};

export function getMemberDictionaryActionCreator(translations) {
	return { type: GET_MEMBER_DICTIONARY, translations: translations };
}

export function getMemberBookActionCreator(books) {
	return { type: GET_MEMBER_BOOKS, books: books };
}



//Thunks

export default groupMemberInfoReducer;

