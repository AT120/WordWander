import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getMemberBookThunkCreator } from "../../reducers/group-member-info-reducer";

import SearchElem from "../books-list/search";
import Books from "../books-list/books";
import PaginationBar from "../books-list/paginationBar";


export default  function GroupMemberBookCollection(){
    console.log("groupMemberBookCollection")
    const state =useSelector((state)=>state.groupMemberInfoReducer);
    const dispatch = useDispatch();
    



    const location = useLocation()

    
    
    console.log(state)



return(
<div>
<div className="App">
        <div style={{ marginTop: '60px' }} className='container'>
          <SearchElem />
          <Books/>
          <PaginationBar/>
          </div>  
      </div>
</div>
)

}

