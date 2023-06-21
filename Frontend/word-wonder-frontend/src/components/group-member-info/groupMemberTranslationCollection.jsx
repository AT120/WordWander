import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import { getMemberDictionaryThunkCreator } from "../../reducers/group-member-info-reducer";
import GroupMemberTranslationItem from "./groupMemberTranslationItem";








export default function GroupMemberTranslationCollection(){
    const state =useSelector((state)=>state.groupMemberInfoReducer);
    const dispatch = useDispatch();
    const location = useLocation()
    useEffect(() => {
		dispatch(getMemberDictionaryThunkCreator(location.state.id));
	}, []);

    
    if (
		!Array.isArray(state.translations) ||
		!state.translations.length
	) {
        console.log(state)
		return (
			<div className="d-flex  position-relative top-50 start-50 translate-middle justify-content-center">
                <div >
				<h5>Здесь пока пусто</h5>
                </div>
            </div>
		);
        }
        else{
            console.log(state)
            return(
            <div>
                <div className="card-deck">
                    {
                        state.translations.map((value)=>{return(
                            <GroupMemberTranslationItem/>
                        )})
                    }
                    

                </div>


            </div>);
        }
    
    

    
}