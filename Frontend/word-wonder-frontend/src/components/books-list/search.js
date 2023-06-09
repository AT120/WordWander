import { FormControl, Dropdown, DropdownButton, InputGroup } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux";
import { loadBooksThunkCreator } from "../../reducers/book-list-reducer";
import { setSearchTermActionCreator } from "../../reducers/book-list-reducer";
function SearchElem() {
    const state = useSelector(state=>state.booksPage);
    const dispatch = useDispatch();
    const handleSearch = (event)=>{
        dispatch(setSearchTermActionCreator(event.target.value))
    }
    const  handleKeyDown = (event) =>{
        if (event.key === "Enter") {
        dispatch(loadBooksThunkCreator(state.page, state.searchTerm, state.sortBy))
        }
    }
    const handleSortBy = (sortOption) =>{

        dispatch(loadBooksThunkCreator(state.page, state.searchName, sortOption))
    }
    return (
        <div style={{paddingBottom:'5px'}}>            
            <h3>YourBooks</h3>
            <InputGroup>
                <FormControl
                type="text"
                placeholder="Search..."
                value={state.searchTerm}
                onChange={handleSearch}
                onKeyDown={handleKeyDown}
                />
                <DropdownButton id="dropdown-basic-button" title="Sort By">
                    <Dropdown.Item onClick={() => handleSortBy(0)} active={state.sortBy === 0}>
                        TitleAsc
                    </Dropdown.Item>
                    <Dropdown.Item  onClick={() => handleSortBy(1)} active={state.sortBy === 1}>
                        TitleDesc
                    </Dropdown.Item>
                    <Dropdown.Item  onClick={() => handleSortBy(null)} active={state.sortBy === null}>
                        None
                    </Dropdown.Item>
                </DropdownButton>
            </InputGroup>
        </div>
      );
}
export default SearchElem