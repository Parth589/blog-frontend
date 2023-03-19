import React, {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {Context} from "../App.jsx";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import Card from "../components/Card.jsx";

const Profile = () => {
    const {id} = useParams();
    const [error, setError] = useState('');
    const {isLoggedIn, fetchData, user} = useContext(Context);
    const [userData, setUserData] = useState({})
    const [userPosts, setUserPosts] = useState([]);
    const [isOwnProfile, setOwnProfile] = useState(false);
    const effect = async () => {
        const {success, data, msg} = await fetchData(`/api/v1/user/${id}`);
        if (!success) {
            setError(msg);
            return;
        }
        setUserData(data);
        //     check if the user which is logged in matches the user in the id param
        if (isLoggedIn && (user.id === userData._id)) {
            setOwnProfile(true);
        }
    }
    useEffect(() => {
        effect();
    }, [])
    const effect2 = async () => {
        if (!userData.username) {
            return;
        }
        //     get posts from the user
        const {
            success,
            data,
            msg
        } = await fetchData(`/api/v1/blog/search/?searchTerm=${userData.username}&searchField=author`);
        if (!success) {
            setError(msg);
            return;
        }
        //     render posts
        setUserPosts(data);
    }
    useEffect(() => {
        effect2();
    }, [userData])
    return (
        <>
            <Navbar isHomepage={false} isLoggedIn={isLoggedIn}/>
            <main className=" p-5 items-center flex-col px-7">
                {error ? <span className={'text-red text-xl font-bold'}>{error}</span> :
                    <>
                        <div className="flex justify-between p-5 pb-0">
                            <div className="hidden lg:block font-semibold text-5xl py-12 px-5">{userData.username}</div>
                            <div className={'px-5'}>

                                <div className="flex flex-col ">
                                    <img src="/src/assets/profile1.svg" alt="user"
                                         className="w-20 aspect-square"/>
                                    <span className="block text-lg font-semibold mt-4">{userData.username}</span>

                                    <span
                                        className="text-lightGray text-sm">{userData.mail}</span>

                                    <a href={`mailto:${userData.mail}`}
                                       className=" flex w-fit items-center gap-4 px-4 py-2 rounded-full mr-2 my-4 bg-green  text-white text-sm ">
                                        <img
                                            src="/src/assets/envelope.svg" alt="" className="invert"/> E-mail
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="flex ">
                            <div className="lg:px-7">
                                <div>
                                    <div className="pb-12">
                                        <div className="pt-12 ">
                                            <div className="flex gap-4 border-b-2 border-extremelightGray pb-3">
                                                <img src="/src/assets/post.svg" alt="" className="w-4"/>
                                                <span>Posts on The Quill</span>
                                            </div>
                                        </div>
                                        {/* cards are here */}
                                        {userPosts.map(e => {
                                            return (
                                                <div key={e._id}>
                                                    <Card title={e.content.title}/>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                }
            </main>
            <Footer desktop={false}/>
        </>

    );
};

export default Profile;