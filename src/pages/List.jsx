import {useState} from "react";
import SearchBox from "../components/SearchBox.jsx";
import Navbar from "../components/Navbar.jsx";

const List = () => {
    const [searchTerm, setSearchTerm] = useState('');
    return (
        <>
            <Navbar isHomepage={false} isLoggedIn={true}/>
            <div className={'flex justify-center py-5 px-10 flex-col'}>
                <SearchBox onSearch={setSearchTerm} stretch={true}/>
                {searchTerm&&
                    (
                        <h4 className={'text-2xl mt-7 text-lightGray'}>Results for: <span className={'text-black font-bold text-3xl'}>{searchTerm}</span></h4>
                    )
                }
                <hr className={'text-extremelightGray my-2'}/>
            </div>

        </>
    );
};

export default List;