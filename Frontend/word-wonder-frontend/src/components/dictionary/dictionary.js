import React from "react";
import { Provider } from "react-redux";
import Translations from "./translations";
import Navigation from "../common/Navigation";
import Footer from "../common/Footer";
import storeDictionary from "../../store/dictionaryStore";

function Dictionary() {

	return (
		<div>
			<Navigation />
			<Provider store={storeDictionary}>
				<div className="Dictionary">
					<div style={{ marginTop: "60px" }} className="container">
						<div className="ms-2 pt-2 mb-3">
                        <h3><svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								fill="currentColor"
								className="bi bi-bookmark"
								viewBox="0 0 16 16"
							>
								<path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z" />
							</svg>
							Сохраненное </h3>
						</div>

						<Translations />
					</div>
				</div>
			</Provider>
			<Footer />
		</div>
	);
}

export default Dictionary;
