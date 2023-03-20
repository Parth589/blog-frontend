import {createContext, useEffect, useState} from "react";
import {Route, Routes} from "react-router-dom";
import Landing from "./pages/Landing.jsx";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import List from "./pages/List.jsx";
import FinishLogin from "./pages/FinishLogin.jsx";
import fetchData from "./utils/FetchData.jsx"
import Edit from "./pages/Edit.jsx";
import Notification from "./components/Notification.jsx";
import NotFound from "./pages/NotFound.jsx";
import Profile from "./pages/Profile.jsx";
import getCookie from "./utils/getCookies.jsx";
import jwtDecode from "jwt-decode";

export const Context = createContext({});

function App() {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [notification, setNotification] = useState({
        isShowing: false,
        content: ''
    })

    const [bookmarkList, setBookmarkList] = useState([]);
    const fetchBookmarks = () => {
        let data = localStorage.getItem('__bookmarks__');
        if (!data) {
            localStorage.setItem('__bookmarks__', JSON.stringify([]))
            setBookmarkList([]);
            return;
        }
        data = JSON.parse(data);
        //     validate the data object
        if (!Array.isArray(data)) {
            localStorage.setItem('__bookmarks__', JSON.stringify([]));
            setBookmarkList([]);
            return;
        }
        setBookmarkList(data);
    }
    const addBookmark = (post) => {
        setBookmarkList(prevState => prevState.push(post))
    }
    const removeBookmark = (post) => {
        setBookmarkList(prevState => prevState.filter(e => e !== post));
    }
    const toggleBookmark = (post) => {
        if (bookmarkList.indexOf(post) !== -1) {
            // the post is in bookmarkList
            return removeBookmark(post);
        } else {
            return addBookmark(post);
        }
    }
    const showNotification = (msg) => {
        setNotification({
            isShowing: true,
            content: msg
        })
    }
    const [user, setUserInfo] = useState({});

    const effect = async () => {
        const token = getCookie('__login_token')
        console.log(token);
        if (!token) {
            return;
        }
        const obj = jwtDecode(token);
        // console.log(obj)
        //     make a request to get user information
        const {success, data, msg} = await fetchData(`/api/v1/user/${obj.id}`, 'GET');
        if (success) {
            setUserInfo(data);
            // console.log(data);
            setLoggedIn(true);
        } else {
            console.error(msg);
        }
        fetchBookmarks();
    }
    useEffect(() => {
        effect();
    }, [])

    const contextValues = {
        fetchData,
        isLoggedIn,
        user,
        setUserInfo,
        showNotification,
        bookmarkList,
        toggleBookmark
    }
    return (
        <Context.Provider value={contextValues}>
            <Routes>
                <Route path={'/'} element={<Landing/>}/>
                <Route path={'/login'} element={<Login/>}/>
                <Route path={'/register'} element={<SignUp/>}/>
                <Route path={'/posts'} element={<List/>}/>
                <Route path={'/verify'} element={<FinishLogin setLoggedIn={setLoggedIn}/>}/>
                <Route path={'/edit'} element={<Edit/>}/>
                <Route path={'/user/:id'} element={<Profile/>}/>
                <Route path={'*'} element={<NotFound/>}/>
            </Routes>
            {
                notification.isShowing &&
                <Notification content={notification.content} hideMe={() => {
                    setNotification({
                        isShowing: false,
                        content: ''
                    })
                }}/>
            }
        </Context.Provider>
    )
}

export default App
