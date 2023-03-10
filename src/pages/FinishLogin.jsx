// FIXME: get this thing done ASAP
import React, {useContext, useEffect, useState} from 'react';
import {useNavigate, useSearchParams} from "react-router-dom";
import {Context} from "../App.jsx";
import jwtDecode from "jwt-decode";

const FinishLogin = (props) => {
    const navigate=useNavigate();
    const [queryParams, setQueryParams] = useSearchParams();
    // const obj=useParams();
    console.log(queryParams.get('token'));
    const [msg, setMsg] = useState('Loading...')
    const {baseURL, fetchData, setUserInfo} = useContext(Context);
    const effectHandler = async () => {
        const token = queryParams.get('token');
        console.log(token);
        if (!token) {
            setMsg('token is not passed');
            return;
        }
        // // make a request to the endpoint '/verify'
        const data = await fetchData(`/api/v1/verify?token=${token}`, 'GET');
        if (data.success) {
            setMsg('Successful Authentication');
            props.setLoggedIn(true)
            const {id} = jwtDecode(token);
        //     make api call to get the user details
            const {success,data}=await fetchData(`/api/v1/user/${id}`,'GET');
            console.log({success,data})
            if(!success){
                setMsg('something went wrong');
                return;
            }
            console.log(data);
            setUserInfo({
                id:data._id,
                username:data.username,
                mail:data.mail
            });
            navigate('/posts')
        } else {
            console.log('something went wrong')
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