import React, {useContext, useState} from 'react';
import Input from "../components/Input.jsx";
import {Context} from "../App.jsx";
import {Link} from "react-router-dom";

const SignUp = () => {
    const {baseURL, showNotification} = useContext(Context);
    const [username, setUsername] = useState('')
    const [mail, setMail] = useState('');
    const [completedSignup, setCompleteSignup] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(baseURL + '/api/v1/register', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({mail, username})
        })
        const data = await response.json();
        console.log(data);
        if (data.success) {
            setErrorMsg('')
            setCompleteSignup(true);
        } else {
            setErrorMsg(data.msg);
        }
    }

    if (completedSignup) {
        return (
            <main className={'h-screen grid place-content-center text-center text-2xl '}>
                <span>
                Registration has been completed.
                    <Link to={"/login"} className={'text-blue '}>Login</Link>
                </span>
            </main>
        );
    }
    return (
        <main className={'h-screen'}>
            <div className="flex flex-col justify-center items-center h-full gap-5">
                <div className="mb-10">
                    <span className="text-4xl font-bold capitalize">Sign up</span>
                </div>

                <form className="flex flex-col gap-5 w-fit" onSubmit={handleSubmit}>
                    <Input id={'username'} label={'username'} state={username} setState={setUsername}/>
                    <Input id={'email'} label={'Email'} state={mail} setState={setMail}/>

                    <Input type={'submit'} content={'Sign up'}/>
                </form>
                <span className="text-center absolute bottom-10 left-1/2 -translate-x-1/2">Already have an account?
                <Link to={'/login'} className="text-blue underline underline-offset-2">
                    sign in
                </Link>
            </span>
            </div>
            {errorMsg && showNotification(errorMsg)}
        </main>
    );
};

export default SignUp;