import {useContext, useEffect, useState} from "react";
import SearchBox from "../components/SearchBox.jsx";
import Navbar from "../components/Navbar.jsx";
import {Context} from "../App.jsx";
import {useSearchParams} from "react-router-dom";
import Categories from "../components/Categories.jsx";

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
        if (searchTerm) {
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
    }
    useEffect(() => {
        effect();
    }, [searchTerm])

    useEffect(() => {
        setSearchTerm(queryParams.get('q'));
    }, [queryParams])

    return (
        <>
            <Navbar isHomepage={false} isLoggedIn={isLoggedIn}/>
            <main className={'p-10'}>


                <div className={'flex flex-col lg:flex-row gap-5'}>

                    <div className={'basis-2/3'}>
                        <div className={'flex items-start  flex-col'}>
                            <SearchBox onSearch={(searchValue) => {
                                setSearchTerm(searchValue);
                                setQueryParams({
                                    q: searchValue
                                })
                            }} hideInSM={false}/>
                            <div className={'w-full'}>

                                {searchTerm &&
                                    (
                                        <>
                                            <h4 className={'text-2xl pt-7 text-lightGray flex flex-col gap-2'}>Results for: <span
                                                className={'text-black font-bold text-3xl md:text-5xl'}>{searchTerm}</span></h4>
                                            <hr className={'text-extremelightGray my-2'}/>
                                        </>
                                    )
                                }
                            </div>

                        </div>
                        {
                            searchResults.map((e) => {
                                return <div key={e._id} className={'text-lg text-2xl'}>
                                    {e.content.title}
                                </div>
                            })
                        }
                    </div>
                    <Categories/>
                </div>
            </main>
        </>
    );
};

export default List;