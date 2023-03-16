import {createContext, useContext, useEffect, useState} from "react";
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

export const Context = createContext({});

function App() {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [notification, setNotification] = useState({
        isShowing: false,
        content: ''
    })

    const showNotification = (msg) => {
        setNotification({
            isShowing: true,
            content: msg
        })
    }
    const [user, setUserInfo] = useState({
        id: null, username: null, mail: null
    })
    const {baseURL} = useContext(Context);
    useEffect(() => {
        // const token = getCookie('__login_token')
        // console.log(token);
        // if (!token) {
        //     return;
        // }
        // const obj = jwtDecode(token);
        // console.log(obj)
        // //     make a request to get user information
        // const data = fetch(baseURL + `/api/v1/user/${obj.id}`);
        // console.log(data);
    }, [])

    const contextValues = {
        baseURL: 'http://localhost:5000',
        fetchData,
        isLoggedIn,
        user,
        setUserInfo,
        showNotification
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
