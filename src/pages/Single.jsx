import Navbar from "../components/Navbar.jsx";
import {useContext, useEffect, useState} from "react";
import {Context} from "../App.jsx";
import {Link, useParams} from "react-router-dom";
import showdown from "showdown";
import dompurify from "dompurify";
import Comments from "../components/Comments.jsx";

const Single = () => {
    const {isLoggedIn, fetchData, toggleBookmark, checkBookmark, user,showNotification} = useContext(Context);
    const {id} = useParams();

    const [errorMsg, setErrorMsg] = useState('');
    const [loading, setLoading] = useState(true);

    const [blog, setBlog] = useState({
        "content": {
            "title": "test blog",
            "post": "<p>post keyword is here</p>",
            "brief": "This is a test blog dont mind if you mind it\n"
        },
        "author": {
            "username": "xx_gamer_boy_ravi_xx",
            "id": "640420b3baee7c0a40619902"
        },
        "comments":[],
        "meta": {
            "views": 39,
            "likes": 0,
            "stargazers": [],
            "readTime": 1.3
        },
        "_id": "640457c8817160b4d3ec44ac",
        "keywords": [
            "cooking",
            "aloo",
            "shop",
            "job"
        ],
        "thumbnail_link": "https://plus.unsplash.com/premium_photo-1661763922970-e0f46e28ca9e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=715&q=80",
        "createdAt": "2023-03-05T08:50:16.600Z",
        "updatedAt": "2023-03-06T04:39:09.220Z",
        "__v": 0
    });

    const [showComments,setShowComments]=useState(false);
    const [isStarred, setStarred] = useState((isLoggedIn && blog.meta.stargazers.indexOf(user._id) !== -1));
    useEffect(() => {
        setStarred((isLoggedIn && blog.meta.stargazers.indexOf(user._id) !== -1));
    }, [blog]);
    const effect = async () => {
        const {success, data, msg} = await fetchData(`/api/v1/blog/${id}`);
        if (!success) {
            setErrorMsg(msg);
        }
        setBlog(data);
        setLoading(false);
    };
    useEffect(() => {
        effect();
    }, []);
    useEffect(()=>{
        showNotification(errorMsg);
    },[errorMsg]);
    if (loading) {
        return (
            <>
                <h1 className={'text-xl font-bold'}>Loading...</h1>
            </>
        );
    }

    const isBookmarked = checkBookmark({id: blog._id});

    const getSanitizedHTML = () => {
        const converter = new showdown.Converter();
        return dompurify.sanitize(converter.makeHtml(blog.content.post));
    };
    return (<>
        <Navbar isHomepage={false} isLoggedIn={isLoggedIn}/>
        <div className="flex flex-col justify-center px-7 py-10">
            {/* upper strip */}
            <div className=" w-full flex items-center flex-col">
                <div className="max-w-6xl w-full">
                    <div className="flex flex-col justify-between">
                        <div className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-3"><img src="/src/assets/person-circle.svg"
                                                                          alt="user"
                                                                          className="w-9"/>

                                <a href="#" className="block text-lg font-semibold">{blog.author.username}</a>
                            </div>
                            <button className={'focus:outline focus:outline-2 focus:outline-lightGray p-1 rounded'}
                                    onClick={async () => {
                                        await navigator.clipboard.writeText(location.href);
                                        console.log('text copied');
                                    }}>

                                <img src="/src/assets/link.svg" alt=""/>
                            </button>
                        </div>
                    </div>
                    <div className="flex justify-between sm:py-4   gap-4 pt-5">
                        <div className="flex items-center gap-4 text-gray-600">
                            <button
                                onClick={() => {
                                    toggleBookmark({id: blog._id});
                                }}
                                className="flex gap-2 items-center px-4 py-1  rounded-full outline outline-1 outline-extremelightGray bg-extremelightGray2">
                                <img
                                    src={`/src/assets/${isBookmarked ? 'bookmark-fill.svg' : 'bookmark.svg'}`} alt=""
                                    className="w-4"/>
                                {isBookmarked ? 'saved' : 'save'}
                            </button>
                            <span>{new Date(blog.updatedAt).toLocaleDateString('en-us', {
                                month: 'short',
                                day: 'numeric'
                            })}</span>
                            <span>{blog.meta.readTime} min read</span>

                        </div>
                        <span className="flex items-center gap-2 text-green-600">
                            {blog.meta.views} views
                        </span>
                    </div>
                </div>
            </div>
            {/* content */}
            <div className="flex flex-col items-center">
                {/* title */}
                <h2 className="font-semibold text-3xl md:text-5xl md:my-10 mt-14 mb-7 text-center">{blog.content.title}</h2>
                {/* thumbnail */}
                <img src={blog.thumbnail_link} alt=""
                     className="w-full aspect-video object-cover md:max-w-2xl mx-auto"/>
                {/* post */}
                <article
                    className="prose prose-lg prose-img:p-5 py-10 [word-spacing:3px] md:max-w-2xl leading-7 md:pt-28 break-words"
                    dangerouslySetInnerHTML={{__html: getSanitizedHTML()}}>
                </article>

                {/* extras */}
                <div className="md:max-w-2xl w-full mx-auto">
                    {/* keywords strip */}
                    <div className="flex pt-12 pb-10 gap-4 flex-wrap">
                        {
                            blog.keywords.map((keyword, index) => {
                                return (
                                    <Link key={index} to={`/posts?q=${keyword}`}
                                          className={' rounded-full px-6 py-1 text-sm cursor-pointer bg-extremelightGray2 shadow-sm whitespace-nowrap'}>{keyword}</Link>);

                            })
                        }
                    </div>

                </div>
            </div>


        </div>

        {/* additional buttons */}
        <div className="mt-5 mb-16 mx-7 relative">
            <Comments comments={blog.comments} setBlog={setBlog} showDialog={showComments} blogID={blog._id}/>

            <div
                className="bg-extremelightGray2 px-6 py-2 flex gap-8 justify-between w-fit md:w-full rounded-full md:rounded-none outline outline-1 outline-extremelightGray mx-auto">
                <div className="flex items-center gap-8 text-gray-800 text-sm ">

                    {/*    likes button */}
                    <button disabled={!isLoggedIn} onClick={async () => {
                        setStarred(prevState => !prevState);
                        const {success, meta,msg} = await fetchData(`/api/v1/auth/blog/like/${blog._id}`, 'PUT');
                        if(!success){
                            setErrorMsg(msg);
                            return;
                        }
                        console.log(meta);
                        setBlog(prevState => ({...prevState, meta}));
                    }} className={`disabled:cursor-not-allowed flex gap-2 items-center`}>
                        {!isStarred ?
                            <img src="/src/assets/clap.svg" alt="" className="w-5"/>
                            :
                            <svg className={'w-5'} width="24" height="24" viewBox="0 0 24 24" aria-label="clap">
                                <path fillRule="evenodd" clipRule="evenodd"
                                      d="M11.37.83L12 3.28l.63-2.45h-1.26zM15.42 1.84l-1.18-.39-.34 2.5 1.52-2.1zM9.76 1.45l-1.19.4 1.53 2.1-.34-2.5zM20.25 11.84l-2.5-4.4a1.42 1.42 0 0 0-.93-.64.96.96 0 0 0-.75.18c-.25.19-.4.42-.45.7l.05.05 2.35 4.13c1.62 2.95 1.1 5.78-1.52 8.4l-.46.41c1-.13 1.93-.6 2.78-1.45 2.7-2.7 2.51-5.59 1.43-7.38zM12.07 9.01c-.13-.69.08-1.3.57-1.77l-2.06-2.07a1.12 1.12 0 0 0-1.56 0c-.15.15-.22.34-.27.53L12.07 9z"></path>
                                <path fillRule="evenodd" clipRule="evenodd"
                                      d="M14.74 8.3a1.13 1.13 0 0 0-.73-.5.67.67 0 0 0-.53.13c-.15.12-.59.46-.2 1.3l1.18 2.5a.45.45 0 0 1-.23.76.44.44 0 0 1-.48-.25L7.6 6.11a.82.82 0 1 0-1.15 1.15l3.64 3.64a.45.45 0 1 1-.63.63L5.83 7.9 4.8 6.86a.82.82 0 0 0-1.33.9c.04.1.1.18.18.26l1.02 1.03 3.65 3.64a.44.44 0 0 1-.15.73.44.44 0 0 1-.48-.1L4.05 9.68a.82.82 0 0 0-1.4.57.81.81 0 0 0 .24.58l1.53 1.54 2.3 2.28a.45.45 0 0 1-.64.63L3.8 13a.81.81 0 0 0-1.39.57c0 .22.09.43.24.58l4.4 4.4c2.8 2.8 5.5 4.12 8.68.94 2.27-2.28 2.71-4.6 1.34-7.1l-2.32-4.08z"></path>
                            </svg>
                        }
                        <span className={'hidden md:block'}>{blog.meta.likes}</span>
                    </button>

                    {/* comments button */}
                    <button className="flex gap-2 relative" onClick={()=>setShowComments(prevState => !prevState)}>

                        <img src="/src/assets/comment.svg" alt=""
                             className="w-4"/>
                        <span className={'hidden md:block'}>
                            {blog.comments.length}
                        </span>
                    </button>
                </div>

                <button onClick={() => {
                    toggleBookmark({id: blog._id});
                }} className={'hidden md:block'}>
                    {
                        !isBookmarked
                        ?
                        <img src="/src/assets/bookmark.svg" alt="" className="w-4"/>
                        : <img src="/src/assets/bookmark-fill.svg" alt="" className="w-4"/>
                    }
                </button>
            </div>
        </div>


    </>);
};

export default Single;