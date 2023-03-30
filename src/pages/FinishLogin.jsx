import React, {useContext, useEffect, useState} from 'react';
import {useNavigate, useSearchParams} from "react-router-dom";
import {Context} from "../App.jsx";

const FinishLogin = () => {
    const navigate = useNavigate();
    const [queryParams] = useSearchParams();
    // const obj=useParams();
    const [msg, setMsg] = useState('Loading...')
    const {fetchData, verifyUserByCookies} = useContext(Context);
    const effectHandler = async () => {
        const token = queryParams.get('token');
        if (!token) {
            setMsg('token is not passed');
            return;
        }
        // // make a request to the endpoint '/verify'
        const data = await fetchData(`/api/v1/verify?token=${token}`, 'GET');
        if (data.success) {
            setMsg('Successful Authentication');
            verifyUserByCookies();
            navigate('/posts')
        } else {
            console.error('something went wrong')
            setMsg('Something went wrong');
        }
    }
    useEffect(() => {
        effectHandler();
    },[]);
    return (
        <div>
            {msg}
        </div>
    );
};

export default FinishLogin;