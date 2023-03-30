import {Link} from "react-router-dom";
import {useContext, useState} from "react";
import {Context} from "../App.jsx";

const CommentCard = ({elem, parent, setParent}) => {
        const dateOptions = {month: 'short', day: 'numeric'};
        const [isShowingReplies, setShowingReplies] = useState(false);
        const {fetchData} = useContext(Context);
        const [replies, setReplies] = useState([]);

        const fetchReplies = async () => {
            if (!elem.replies) setReplies([]);
            else {
                const {
                    data,
                    success,
                    msg
                } = await fetchData(`/api/v1/comments/${elem.of}?p=${elem._id}`, 'GET')
                if (!success) {
                    return console.error(msg);
                }
                setReplies(data);
            }
        }
        return (
            <div className={'p-5 py-2 flex flex-col gap-2 justify-center items-start'}>
                <div className={'flex w-full items-center gap-4 justify-between'}>
                                <span className={'text-lightGray flex gap-1 text-base'}>
                                    by
                                    <Link className={'text-darkGray'} to={`/user/${elem.by.id}`}>{elem.by.uname}
                                    </Link>
                                </span>
                    <span className={'text-lightGray text-sm'}>
                                    {new Date(elem.updatedAt).toLocaleDateString('en-us', dateOptions)}
                                </span>

                </div>
                <div className={'flex gap-3 justify-between w-full items-end'}>
                                <span className={'text-black text-xl col-span-2'}>
                                    {elem.content}
                                </span>
                    <button className={`${parent === elem._id ? 'rounded-full outline outline-2 outline-lightGray' : ''} `}
                            onClick={() => {
                                setParent(prevState => {
                                    if (!prevState) return elem._id;
                                    else return null;
                                });
                            }}><img src="/src/assets/ReplyAll.svg" alt="" className={'w-8 p-1'}/>
                    </button>
                </div>
                {elem.replies &&
                    <button className={`${isShowingReplies?'text-darkGray':'text-green'} underline underline-offset-2 `}
                            onClick={async () => {
                                await fetchReplies();
                                setShowingReplies(prevState => !prevState)
                            }}>replies
                    </button>}
                <hr className={'w-full mt-3 text-lightGray'}/>
                <ul className={`${!isShowingReplies && 'hidden'} w-full`}>
                    {replies.map(e => {
                        return (
                            <li className={'w-full'} key={e._id}>
                                <CommentCard elem={e} setParent={setParent} parent={parent}/>
                            </li>)
                    })}
                </ul>


            </div>
        );
    }
;

export default CommentCard;