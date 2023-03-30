import {createContext, useEffect, useState} from "react";
import {Route, Routes} from "react-router-dom";
import Landing from "./pages/Landing.jsx";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import List from "./pages/List.jsx";
import FinishLogin from "./pages/FinishLogin.jsx";
import fetchData from "./utils/FetchData.jsx"
import getCookie from "./utils/getCookies.jsx";
import jwtDecode from "jwt-decode";
import Edit from "./pages/Edit.jsx";
import Profile from "./pages/Profile.jsx";
import Single from "./pages/Single.jsx";
import About from "./pages/About.jsx";
import NotFound from "./pages/NotFound.jsx";
import Notification from "./components/Notification.jsx";

export const Context = createContext({});

function App() {
    const [isLoggedIn, setLoggedIn] = useState(false);

    const [popup,setPopup]=useState('');
    const [bookmarkList, setBookmarkList] = useState(null);
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
        console.log('adding bookmark', post)
        setBookmarkList(prevState => {
            return [...prevState, {id: post.id}]
        })
    }
    const removeBookmark = (post) => {
        console.log('removing bookmark', post)
        setBookmarkList(prevState => prevState.filter(e => e.id !== post.id));
    }


    const checkBookmark = (post) => {
        if (bookmarkList !== null)
            for (let i = 0; i < bookmarkList.length; i++) {
                if (bookmarkList[i].id === post.id) {
                    return true;
                }
            }
        return false
    }
    const toggleBookmark = (post) => {
        // return: isBookmarked
        if (checkBookmark(post)) {
            // the post is in bookmarkList
            removeBookmark(post);
            return false;
        } else {
            addBookmark(post);
            return true;
        }
    }
    const [user, setUserInfo] = useState({});


    const verifyUserByCookies = async () => {
        const token = getCookie('__login_token')
        if (!token) {
            setLoggedIn(false);
            setUserInfo({});
            return;
        }
        const obj = jwtDecode(token);
        //     make a request to get user information
        const {success, data, msg} = await fetchData(`/api/v1/user/${obj.id}`, 'GET');
        if (success) {
            setUserInfo(data);
            setLoggedIn(true);
        } else {
            console.error(msg);
        }
    }
    const effect = () => {
        verifyUserByCookies();
        fetchBookmarks();
    }
    useEffect(() => {
        effect();
    }, [])
    useEffect(() => {
        if (bookmarkList === null) {
            return;
        }
        localStorage.setItem('__bookmarks__', JSON.stringify(bookmarkList));
    }, [bookmarkList])
    const contextValues = {
        fetchData,
        isLoggedIn,
        user,
        setUserInfo,
        bookmarkList,
        toggleBookmark,
        checkBookmark,
        verifyUserByCookies,
        showNotification:setPopup
    }
    return (
        <Context.Provider value={contextValues}>
            <Routes>
                <Route path={'/'} element={isLoggedIn ? <List/> : <Landing/>}/>
                <Route path={'/login'} element={<Login/>}/>
                <Route path={'/register'} element={<SignUp/>}/>
                <Route path={'/posts'} element={<List/>}/>
                <Route path={'/verify'}
                       element={<FinishLogin verifyUserByCookies={verifyUserByCookies}/>}/>
                <Route path={'/user/:id'} element={<Profile/>}/>
                <Route path={'/blog/:id'} element={<Single/>}/>
                <Route path={'/about'} element={<About/>}/>

                <Route path={'/edit'} element={<Edit/>}/>
                <Route path={'*'} element={<NotFound/>}/>
            </Routes>
            <Notification content={popup} />
        </Context.Provider>
    )
}

export default App
