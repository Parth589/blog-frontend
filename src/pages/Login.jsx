import {useContext, useEffect, useState} from "react";
import {Context} from "../App.jsx";
import Input from "../components/Input.jsx";
import CheckMail from "../components/CheckMail.jsx";
import {Link} from "react-router-dom";

const Login = () => {
    const {fetchData,showNotification} = useContext(Context);

    const [mailSent, setMailSent] = useState(false);// if mail is already sent or not
    const [errorMsg, setErrorMsg] = useState('');
    const [mail, setMail] = useState('');

    useEffect(()=>{
        showNotification(errorMsg);
    },[errorMsg])
    const submitForm = async (e) => {
        e.preventDefault();
        // const [data, error] = useFetch(baseURL + '/login', 'POST', {mail});
        const data = await fetchData(`/api/v1/login`, 'POST', {mail, redirect: `${window.location.origin}/verify`});
        if (data.success) {
            setMailSent(true);
            setErrorMsg(data.msg);
        } else {
            setErrorMsg(data.msg);
        }
    }

    if (mailSent) {
        return (<CheckMail/>)
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
                        <Link to={"/register"} className="mx-1 text-blue underline underline-offset-2">
                            create a new one
                        </Link>
                    </span>
                </form>

            </div>
        </div>
    );
};

export default Login;