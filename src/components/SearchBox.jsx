import searchIcon from '/src/assets/search.svg'
import {useRef} from "react";

const SearchBox = ({onSearch, hideInSM, stretch}) => {
    const ref = useRef(null);
    return (
        <div
            className={` items-center justify-between bg-extremelightGray2 ${stretch ? 'w-full' : 'w-fit'} rounded-full px-4 outline outline-2 outline-extremelightGray ${hideInSM ? 'hidden md:flex' : 'flex md:hidden'}`}>
            <input ref={ref} type="text"
                   className={'bg-extremelightGray2 w-full py-2 focus:outline-none'}/>
            <button onClick={() => {
                onSearch(ref.current.value)
            }} className={'cursor-pointer'}>
                <img src={searchIcon} className={'w-5 h-5'}/>
            </button>
        </div>
    );
};

export default SearchBox;