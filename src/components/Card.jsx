import {useContext} from "react";
import {Context} from "../App.jsx";
import {Link} from "react-router-dom";

const Card = ({blog, isEditable}) => {
    const {toggleBookmark, checkBookmark} = useContext(Context);
    const dateOptions = {month: 'short', day: 'numeric'};
    const isBookmarked = checkBookmark({id: blog._id});

    return (
        <div className={' p-4 md:p-6 grid  gap-4'}>
            <div>
                {/*    content*/}
                <Link to={`/user/${blog.author.id}`} className={'flex items-center gap-3 mb-4'}>
                    {/*    author details */}
                    <img src={`/api/v1/userProfile/${blog.author.id}`} alt=""
                         className={'w-7 rounded-full outline outline-2 outline-extremelightGray outline-offset-2'}
                         onError={(event) => {
                             event.target.src = '/src/assets/person-circle.svg';
                         }}/>
                    <span className={'text-lightGray'}>{blog.author.username}</span>
                </Link>
                <Link to={`/blog/${blog._id}`}>
                    <h3 className={'text-2xl'}>{blog.content.title}</h3>
                </Link>
                <p className={'hidden md:block text-lightGray my-2 text-lg'}>
                    {blog.content.brief}
                </p>
            </div>
            <div className={'justify-self-end w-fit '}>
                {/*    image*/}
                <img src={blog.thumbnail_link} alt="thumbnail"
                     className={'bg-extremelightGray w-32 md:w-44 aspect-square object-cover'}/>
            </div>
            <div className={'flex gap-4 justify-between items-center text-lightGray col-span-2'}>
                {/*    downStrip*/}
                <div className={'flex gap-4 items-center whitespace-nowrap'}>
                    <span>{new Date(blog.updatedAt).toLocaleDateString('en-us', dateOptions)}</span>
                    <span>{blog.meta.readTime} min read</span>
                    <Link to={`/posts?q=${blog.keywords[0]}`}
                          className={' rounded-full px-6 py-1 ml-4 text-sm cursor-pointer bg-extremelightGray2 shadow-sm whitespace-nowrap'}>{blog.keywords[0]}</Link>
                </div>
                <div className={'flex justify-center items-center'}>
                    {isEditable &&
                        <Link to={`/edit?id=${blog._id}`}
                              className={'rounded-full px-6 py-1 mr-4 text-sm cursor-pointer bg-darkGray text-white shadow-sm whitespace-nowrap md:px-8'}>Update
                            Post</Link>
                    }
                    {/*    bookmark button*/}
                    <button onClick={() => {
                        toggleBookmark({id: blog._id});
                    }}>
                        {isBookmarked ?
                            <img src="/src/assets/bookmark-fill.svg" alt="" className={'cursor-pointer w-6'}/>
                            :
                            <img src="/src/assets/bookmark.svg" alt="" className={'cursor-pointer w-5'}/>
                        }
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Card;