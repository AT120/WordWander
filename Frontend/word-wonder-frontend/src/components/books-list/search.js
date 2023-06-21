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
        dispatch(loadBooksThunkCreator(1, state.searchTerm, state.sortBy))
        }
    }
    const handleSortBy = (sortOption) =>{

        dispatch(loadBooksThunkCreator(state.page, state.searchName, sortOption))
    }
    return (
        <div style={{paddingBottom:'5px'}}>            
            <InputGroup>
                <FormControl
                type="text"
                placeholder="Поиск..."
                value={state.searchTerm}
                onChange={handleSearch}
                onKeyDown={handleKeyDown}
                />
                <DropdownButton id="dropdown-basic-button" title="Сортировать">
                    <Dropdown.Item onClick={() => handleSortBy(0)} active={state.sortBy === 0}>
                        Название↑
                    </Dropdown.Item>
                    <Dropdown.Item  onClick={() => handleSortBy(1)} active={state.sortBy === 1}>
                        Название↓
                    </Dropdown.Item>
                    <Dropdown.Item  onClick={() => handleSortBy(null)} active={state.sortBy === null}>
                        Время↓
                    </Dropdown.Item>
                </DropdownButton>
            </InputGroup>
        </div>
      );
}
export default SearchElem