import SearchBox from "./SearchBox.jsx";
import {useContext} from "react";
import {Link, useNavigate} from "react-router-dom";
import {Context} from "../App.jsx";

const Navbar = ({isLoggedIn, isHomepage}) => {
    const navigate = useNavigate();
    const {fetchData, verifyUserByCookies, user} = useContext(Context)
    if (isHomepage || !isLoggedIn) {
        return (
            <nav
                className={`z-50 w-full flex flex-nowrap justify-between ${isHomepage ? 'bg-yellow' : 'bg-white'} px-5 md:px-7 py-3 border-b border-b-lightGray`}>
                <Link to={'/'} className="flex items-center gap-3 md:gap-6">

                    <img src="/src/assets/logo.svg" className=" w-10 md:w-12 aspect-square" alt={'The Quill'}/>
                    <span className="font-serif font-bold text-2xl md:text-3xl whitespace-nowrap">The Quill</span>
                </Link>
                <div className="flex gap-7 items-center">
                    <ul className="flex gap-5 items-center hidden md:flex">
                        <li>
                            <Link to={'/about'} className="whitespace-nowrap">Our story</Link>
                        </li>
                        <li>
                            <Link to={'/edit?new=true'} className="whitespace-nowrap">Write</Link>
                        </li>
                        <li>
                            <Link to={'/login'} className="whitespace-nowrap">Sign In</Link>
                        </li>
                    </ul>
                    <Link to={'/register'}
                       className="bg-green text-white px-7 py-2 rounded-full hover:bg-darkGray whitespace-nowrap">Get
                        started</Link>
                </div>
            </nav>
        );
    }
    if (isLoggedIn) {
        return (
            <nav
                className=" z-50 w-full flex flex-nowrap justify-between bg-white px-5 md:px-7 py-3 border-b  border-extremelightGray">
                <div className="flex items-center gap-6">
                    <Link to={'/'} className="flex items-center gap-3 md:gap-6">

                        <img src="/src/assets/logo.svg" className=" w-10 md:w-12 aspect-square" alt={'The Quill'}/>

                    </Link>
                    <div>
                        <SearchBox onSearch={(value) => {
                            navigate(`/posts?q=${value}`)
                        }} hideInSM={true}/>
                    </div>
                </div>
                <div className="flex gap-10 items-center">
                    <Link to="/edit?new=true" className=" gap-2 hidden md:flex">
                        <img src="/src/assets/write.svg" alt=""/>
                        <span>Write</span>
                    </Link>
                    <div className="relative group">

                        <div className="flex items-center gap-2">
                            <img src="/src/assets/person-circle.svg" alt="" className="w-8 aspect-square fill-blue"/>
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd"
                                      d="M3.07994 4.11999C3.00291 4.06222 2.90763 4.03417 2.81159 4.041C2.71554 4.04782 2.62518 4.08906 2.5571 4.15715C2.48901 4.22523 2.44777 4.31559 2.44095 4.41164C2.43412 4.50768 2.46217 4.60296 2.51994 4.67999L5.99994 8.16799L9.47994 4.67999C9.52579 4.64561 9.56371 4.60177 9.59114 4.55145C9.61857 4.50114 9.63487 4.44551 9.63894 4.38835C9.643 4.33118 9.63473 4.27381 9.61469 4.22012C9.59465 4.16643 9.56331 4.11767 9.52278 4.07715C9.48226 4.03663 9.4335 4.00528 9.37981 3.98524C9.32612 3.9652 9.26875 3.95694 9.21159 3.961C9.15442 3.96506 9.0988 3.98136 9.04848 4.00879C8.99816 4.03622 8.95433 4.07414 8.91994 4.11999L5.99994 7.03199L3.07994 4.11999Z"
                                      fill="black"/>
                            </svg>

                        </div>
                        {/* drop down*/}
                        <div className="absolute z-20 outline outline-1 outline-extremelightGray bg-white px-7 py-5 right-0 top-full hidden group-hover:block">
                            <ul className="text-lg flex flex-col gap-2 w-32 pb-5">
                                <li>
                                    <Link to={`/user/${user._id}`}>profile</Link>
                                    <hr className="text-extremelightGray mt-1"/>
                                </li>
                                <li>
                                    <Link to={'/posts?bookmarks=true'}>bookmarks</Link>
                                    <hr className="text-extremelightGray mt-1"/>
                                </li>

                                <li>
                                    <Link to="/edit?new=true">write</Link>
                                    <hr className="text-extremelightGray mt-1"/>
                                </li>

                                <li className="text-red">
                                    <span onClick={async () => {
                                        // call the function logout
                                        await fetchData('/api/v1/logout', 'GET');
                                        // document.cookie='';
                                        verifyUserByCookies();
                                        console.log('logout');
                                        navigate('/');
                                    }} className={'cursor-pointer'}>log out</span>
                                    <hr className="text-extremelightGray mt-1"/>
                                </li>

                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        )
    }
};

export default Navbar;