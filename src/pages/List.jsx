import {useContext, useEffect, useState} from "react";
import SearchBox from "../components/SearchBox.jsx";
import Navbar from "../components/Navbar.jsx";
import {Context} from "../App.jsx";
import {useSearchParams} from "react-router-dom";
import Categories from "../components/Categories.jsx";
import Card from "../components/Card.jsx";

const List = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const {isLoggedIn, fetchData} = useContext(Context);
    const [searchResults, setSearchResults] = useState([]);
    const [queryParams, setQueryParams] = useSearchParams();
    useEffect(() => {
        setSearchTerm(queryParams.get('q')?.toString() || '');
    }, [])

    const fn=async ()=>{
        if (queryParams.get('bookmarks')) {
            // get all bookmarks which matches the search term
            let bookmarks = localStorage.getItem('__bookmarks__');
            if (!bookmarks) {
                console.error('cant find bookmarks');
                localStorage.setItem('__bookmarks__', JSON.stringify([]));
                return null;
            }
            bookmarks = JSON.parse(bookmarks);
            console.log(bookmarks);
            const results = await Promise.all(bookmarks.map(async elem => {
                //     make request to find the post with elem.id
                const {success, msg, data} = await fetchData(`/api/v1/blog/${elem.id}?compact=true`, 'GET');
                if (!success) {
                    console.error(msg);
                    return;
                }
                return data;
            }));
            if (!searchTerm) {
                return setSearchResults(results);
            }
            // search from bookmarks and then set search results

        }
    }
    const effect = async () => {
        if(queryParams.get('bookmarks'))return fn();
        if (searchTerm) {
            const {
                success,
                data,
                msg
            } = await fetchData(`/api/v1/blog/search?searchTerm=${searchTerm}`, 'GET')
            if (!success) {
                console.error('something went wrong');
                console.error(msg);
            }
            setSearchResults(data);
        } else {
            const {
                success,
                data,
                msg
            } = await fetchData(`/api/v1/blogs`, 'GET')
            if (!success) {
                console.error('something went wrong');
                console.error(msg);
            }
            setSearchResults(data);
        }
    }
    useEffect(() => {
        effect();
    }, [searchTerm])

    useEffect(() => {
        if (!queryParams.get('bookmarks')){
            effect();
            setSearchTerm(queryParams.get('q')?.toString() || '');

            return
        }
        setSearchTerm(queryParams.get('q')?.toString() || '');
        fn();
    }, [queryParams])

    return (
        <>
            <Navbar isHomepage={false} isLoggedIn={isLoggedIn}/>
            <main className={'p-5 md:p-10'}>


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
                                            <h4 className={'text-2xl pt-7 text-lightGray flex flex-col gap-2'}>Results
                                                for: <span
                                                    className={'text-black font-bold text-3xl md:text-5xl tracking-wider'}>{searchTerm}</span>
                                            </h4>
                                            <hr className={'text-extremelightGray my-3'}/>
                                        </>
                                    )
                                }
                            </div>

                        </div>
                        {
                            searchResults.map((e) => {
                                return <div key={e._id}>
                                    <Card blog={e}/>
                                    <hr className={'text-extremelightGray w-full'}/>
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