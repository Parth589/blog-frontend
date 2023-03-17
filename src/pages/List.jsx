import {useContext, useEffect, useState} from "react";
import SearchBox from "../components/SearchBox.jsx";
import Navbar from "../components/Navbar.jsx";
import {Context} from "../App.jsx";
import {useSearchParams} from "react-router-dom";

const List = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const {isLoggedIn, fetchData} = useContext(Context);
    const [searchResults, setSearchResults] = useState([]);
    const [queryParams, setQueryParams] = useSearchParams();
    useEffect(() => {
        setSearchTerm(queryParams.get('q')?.toString() || '');
    }, [])
    const effect = async () => {
        const {
            success,
            data,
            msg
        } = await fetchData(`/api/v1/blog/search?searchTerm=${searchTerm}&page=${currentPage}`, 'GET')
        if (!success) {
            console.error('something went wrong');
            console.error(msg);
        }
        console.log(data)
        setSearchResults(data);
    }
    useEffect(() => {
        effect();
    }, [searchTerm])
    return (
        <>
            <Navbar isHomepage={false} isLoggedIn={isLoggedIn}/>
            <div className={'flex items-start py-5 px-10 flex-col'}>
                <SearchBox onSearch={(searchValue) => {
                    setSearchTerm(searchValue);
                    setQueryParams({
                        q: searchValue
                    })
                }} hideInSM={true}/>
                <div className={'w-full'}>

                    {searchTerm &&
                        (
                            <>
                                <h4 className={'text-2xl mt-7 text-lightGray'}>Results for: <span
                                    className={'text-black font-bold text-3xl'}>{searchTerm}</span></h4>
                                <hr className={'text-extremelightGray my-2'}/>
                            </>
                        )
                    }
                </div>

            </div>
            <main>
                {
                    searchResults.map((e) => {
                        return <div key={e._id} className={'text-lg text-2xl'}>
                            {e.content.title}
                        </div>
                    })
                }
            </main>
        </>
    );
};

export default List;