import {useContext, useRef, useState} from "react";
import {Context} from "../App.jsx";

const Login = (props) => {
    const inputRef = useRef(null);
    const {baseURL} = useContext(Context);
    const [mailsent, setMailsent] = useState(false);// if mail is already sent or not
    const [msg, setMsg] = useState('');
    const submitForm = async (e) => {
        e.preventDefault();
        const mail = inputRef.current.value;
        console.log(baseURL);
        // const [data, error] = useFetch(baseURL + '/login', 'POST', {mail});
        const response = await fetch(baseURL + '/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({mail})
        })
        const data = await response.json();
        console.log(data);
        if (data.success) {
            setMailsent(true);
            setMsg(data.msg);
        } else {
            setMsg(data.msg);
        }
    }

    if (mailsent) {
        return (
            <div className={'h-screen text-center text-2xl grid place-content-center'}>
                {msg}
            </div>
        )
    }
    return (
        <div className={'h-screen'}>
            <div className="flex flex-col justify-center items-center h-full gap-14">

                <div className="absolute top-1/3 left-1/2 -translate-x-1/2">
                    <span className="text-4xl font-bold capitalize">Log in</span>
                </div>

                <form className="flex flex-col gap-5 w-fit" onSubmit={submitForm}>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="email">Email</label>
                        <input ref={inputRef} type="email"
                               className="focus:outline-green outline outline-1 outline-darkGray w-80 rounded-md px-3 py-2"/>
                    </div>

                    <button type={'submit'}
                            className=" font-semibold px-3 py-2 outline outline-2 bg-green text-white rounded-md hover:bg-slate-600">
                        Sign in
                    </button>
                    <span className="absolute bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap">
                Don't have an account?
                <a href="registration.html" className="mx-1 text-blue underline underline-offset-2">
                    create a new one
                </a>
            </span>
                </form>

            </div>
        </div>
    );
};

export default Login;