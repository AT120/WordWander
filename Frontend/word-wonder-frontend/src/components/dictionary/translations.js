import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as bootstrap from "react-bootstrap";
import Cookies from "js-cookie";

import { getDictionaryThunkCreater } from "../../reducers/dictionary-reducer";
import TranslationItem from "./translationItem";

function Translations() {
	const state = useSelector((state) => state.dictionaryReducer);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getDictionaryThunkCreater());
		console.log("useEffect");
	}, []);
	console.log("tranlsations");
	console.log(state.translations);

	if (
		!Array.isArray(state.translations.translationDtos) ||
		!state.translations.translationDtos.length
	) {
		console.log(" null");
		return (
			<div>
                <div className="position-absolute top-50 start-50 translate-middle">
				<h5>Здесь пока пусто</h5>
                </div>
            </div>
		);
	} else {
		console.log("not null");
		return (
			<div>
				<div className="card-deck">
					{
						state.translations.translationDtos != null &&
							state.translations.translationDtos.map((value) => {
								return (
									<TranslationItem
										originalLanguage={value.defaultLanguage}
										originalSequence={value.defaultSequnce}
										translationLanguage={value.translatedLangauge}
										translatedSequence={value.translatedSequence}
										bookId={value.bookId}
										translationId={value.translationId}
										key={value.translationId}
										creationDate={value.created}
										bookTitle={value.bookTitle}
										favourite={value.favourite}
									/>
								);
							})

						/*
                       bookId
                       defaultLanguage
                       defaultSequnce
                       translatedLangauge
                       translatedSequence
                       translationId
                       */
					}
				</div>
			</div>
		);
	}
}

export default Translations;
