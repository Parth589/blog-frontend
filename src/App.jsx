import Login from "./pages/Login.jsx";
import {createContext, useState} from "react";

export const Context = createContext({});

function App() {
    const [isLoggedIn, setLoggedIn] = useState(false);
    return (
        <div className="App">
            <Context.Provider value={{baseURL: 'http://localhost:5000'}}>

                {/*<Landing/>*/}
                <Login />
                {/*<Single/>*/}
            </Context.Provider>
        </div>
    )
}

export default App
