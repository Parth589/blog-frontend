import {useContext, useState} from "react";
import CommentCard from "./CommentCard.jsx";
import {Context} from "../App.jsx";

const Comments = ({comments, showDialog,blogID,setBlog}) => {
    const [parent, setParent] = useState(null);
    const [comment, setComment] = useState('')
    const {fetchData}=useContext(Context);
    const addComment=async ()=>{
        const {success,data,msg}=await fetchData(`/api/v1/auth/blog/comment/create/${blogID}`,'POST',{
            content:comment,
            parent
        });
        if(!success){
            return console.error('custom error',msg);
        }
        console.log(data)
        setBlog(prevState=>{
            prevState.comments.push(data);
            return prevState;
        });
    }
    return (
        <div
            className={`${!showDialog ? 'hidden' : ''} ` + 'max-w-3xl absolute flex flex-col w-full max-h-96 h-fit bg-extremelightGray bottom-full -translate-y-5 rounded-xl overflow-hidden'}>
            <ul className={'h-full overflow-y-scroll scrollbar-hide pt-4'}>
                {
                    comments.map(elem => {
                        return (
                            <li key={elem._id}>
                                <CommentCard elem={elem} parent={parent} setParent={setParent} />
                            </li>
                        )
                    })
                }
            </ul>
            <div className={'flex justify-center px-5 my-4 '}>
                <form
                    className={'flex px-4 py-2 rounded w-full focus-within:outline-green outline outline-lightGray outline-1 bg-white'}>
                    <input required={true} type="text" value={comment}
                           className={'w-full focus:border-none focus:outline-none'}
                           onChange={(e) => setComment(e.target.value)} placeholder={'write a comment'}/>
                    <button type={'submit'} onClick={async (event) => {
                        event.preventDefault();
                        await addComment();
                        setComment('');
                    }}>
                        <img src="/src/assets/PlusCircleFill.svg" alt="" className={'w-6 bg-white'}/>
                    </button>
                </form>
            </div>
        </div>
    );
}
    ;

    export default Comments;