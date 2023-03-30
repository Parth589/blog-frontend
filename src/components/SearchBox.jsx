import searchIcon from '/src/assets/search.svg'
import {useContext, useRef} from "react";
import {Context} from "../App.jsx";

const SearchBox = ({onSearch, stretch, hideInSM}) => {
    const ref = useRef(null);
    const {isLoggedIn}=useContext(Context);
    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            onSearch(ref.current.value)
            ref.current.value = ''
            ref.current.blur()
        }}
              className={` items-center justify-between bg-extremelightGray2 ${stretch ? 'w-full' : 'w-fit'} rounded-full px-4 my-2 outline outline-2 outline-extremelightGray ${hideInSM ? 'hidden md:flex' : `flex ${isLoggedIn&&'md:hidden'}`}`}>
            <input ref={ref} type="text"
                   className={'bg-extremelightGray2 w-full py-2 focus:outline-none'}/>
            <button type={'submit'} className={'cursor-pointer'}>
                <img alt={''} src={searchIcon} className={'w-5 h-5'}/>
            </button>
        </form>
    );
};

export default SearchBox;