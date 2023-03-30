import {useContext} from "react";
import {Context} from "../App.jsx";

const Notification = ({content = 'Nothing is impossible'}) => {
    const {showNotification}=useContext(Context);
    if(!content)return<></>
    return (
        <div id="notification"
             className="fixed bottom-0 w-full bg-lightGray flex justify-between px-10 py-6 text-xl text-white">
            <span> {content}</span>
            <button onClick={()=>{
                showNotification('');
            }}>cancel</button>
        </div>
    );
};

export default Notification;