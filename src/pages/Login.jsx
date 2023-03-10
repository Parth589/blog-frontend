import {useContext, useState} from "react";
import {Context} from "../App.jsx";
import Input from "../components/Input.jsx";
import Notification from "../components/Notification.jsx";

const Login = () => {
    const {baseURL} = useContext(Context);
    const [mailSent, setMailSent] = useState(false);// if mail is already sent or not
    const [msg, setMsg] = useState('');
    const [mail, setMail] = useState('');
    const submitForm = async (e) => {
        e.preventDefault();
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
            setMailSent(true);
            setMsg(data.msg);
        } else {
            setMsg(data.msg);
        }
    }

    if (mailSent) {
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
                    <Input label={'Email'} id={'email'} type={'email'} state={mail} setState={setMail}/>
                    <Input type={'submit'} content={'Sign in'}/>
                    <span className="absolute bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap">
                Don't have an account?
                <a href="registration.html" className="mx-1 text-blue underline underline-offset-2">
                    create a new one
                </a>
            </span>
                </form>

            </div>
            {msg &&
                <Notification content={msg} hideMe={() => {
                    setMsg(null);
                }}/>}
        </div>
    );
};

export default Login;