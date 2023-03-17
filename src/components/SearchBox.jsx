import searchIcon from '/src/assets/search.svg'
import {useEffect, useRef} from "react";
import {useSearchParams} from "react-router-dom";

const SearchBox = ({onSearch, stretch}) => {
    const ref = useRef(null);
    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            onSearch(ref.current.value)
            ref.current.value=''
            ref.current.blur()
        }}
              className={` items-center justify-between bg-extremelightGray2 ${stretch ? 'w-full' : 'w-fit'} rounded-full px-4 outline outline-2 outline-extremelightGray flex`}>
            <input ref={ref} type="text"
                   className={'bg-extremelightGray2 w-full py-2 focus:outline-none'}/>
            <button type={'submit'} className={'cursor-pointer'}>
                <img src={searchIcon} className={'w-5 h-5'}/>
            </button>
        </form>
    );
};

export default SearchBox;