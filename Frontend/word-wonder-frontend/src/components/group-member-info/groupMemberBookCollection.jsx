import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getMemberBookThunkCreator } from "../../reducers/group-member-info-reducer";

import SearchElem from "../books-list/search";
import Books from "../books-list/books";
import PaginationBar from "../books-list/paginationBar";
import { setStudentIdActionCreator } from "../../reducers/book-list-reducer";


export default function GroupMemberBookCollection({ studentId }) {
    const dispatch = useDispatch();
    dispatch(setStudentIdActionCreator(studentId))

    return (
        <div>
            <SearchElem />
            <Books />
            <PaginationBar />
        </div>
    )

}

